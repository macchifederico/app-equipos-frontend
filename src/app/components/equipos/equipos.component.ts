import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { DataService } from 'src/app/services/data.service';
import { Jugador } from '../../models/Jugador';

@Component({
  selector: 'app-equipos',
  templateUrl: './equipos.component.html',
  styleUrls: ['./equipos.component.css']
})
export class EquiposComponent implements OnInit {

  teamOne: Jugador[] = [];
  teamTwo: Jugador[] = []; 
  nombre: string = '';

  constructor(private router: Router, private ds: DataService, private location: Location) {}

  ngOnInit() {
    this.getTeams();
  }

  getTeams() {
    // Intentar obtener equipos del localStorage primero
    const localTeamOne = localStorage.getItem('teamOne');
    const localTeamTwo = localStorage.getItem('teamTwo');

    if (localTeamOne && localTeamTwo) {
      this.teamOne = JSON.parse(localTeamOne);
      this.teamTwo = JSON.parse(localTeamTwo);
    } else {
      // Fallback: intentar obtener del backend
      const userId = 1;
      this.ds.getTeamsByUserId(userId).subscribe({
        next: (res: any) => {
          this.teamOne = res.teams?.teamOne || [];
          this.teamTwo = res.teams?.teamTwo || [];        
        },
        error: (error: any) => {
          console.warn('No se pudieron cargar equipos del backend:', error);
          this.teamOne = [];
          this.teamTwo = [];
        }
      });
    }
  }

  // Helper methods
  getPlayerName(jugador: Jugador): string {
    if (jugador.nombre && jugador.apodo) {
      return `${jugador.nombre} "${jugador.apodo}"`;
    }
    return jugador.nombre || jugador.apodo || 'Jugador';
  }

  getPositionsText(jugador: Jugador): string {
    const pos1 = jugador.posicion1 || '';
    const pos2 = jugador.posicion2 || '';

    if (pos1 && pos2 && pos1 !== pos2) {
      return `${pos1} / ${pos2}`;
    }
    return pos1 || pos2 || 'Sin posición';
  }

  calculateAverage(jugador: Jugador): number {
    const skills = [
      jugador.tiro || 1,
      jugador.remate || 1,
      jugador.defensa || 1,
      jugador.velocidad || 1,
      jugador.gambeta || 1,
      jugador.tecnica || 1,
      jugador.rusticidad || 1,
      jugador.temperamento || 1
    ];

    const sum = skills.reduce((acc, skill) => acc + skill, 0);
    return Math.round((sum / skills.length) * 10) / 10;
  }

  // Calculate team average
  getTeamAverage(team: Jugador[]): number {
    if (team.length === 0) return 0;
    
    const totalAverage = team.reduce((sum, jugador) => sum + this.calculateAverage(jugador), 0);
    return Math.round((totalAverage / team.length) * 10) / 10;
  }

  // Check if teams are balanced
  areTeamsBalanced(): boolean {
    return Math.abs(this.teamOne.length - this.teamTwo.length) <= 1;
  }

  // Get balance status text
  getBalanceStatus(): string {
    return this.areTeamsBalanced() ? 'Equilibrado' : 'Desequilibrado';
  }

  // Navigation
  goBack(): void {
    this.location.back();
  }

  // Generate new teams
  regenerateTeams(): void {
    this.router.navigate(['/plantel']);
  }

  // Clear teams
  clearTeams(): void {
    localStorage.removeItem('teamOne');
    localStorage.removeItem('teamTwo');
    this.teamOne = [];
    this.teamTwo = [];
  }
}
