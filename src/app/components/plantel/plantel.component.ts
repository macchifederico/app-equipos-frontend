import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { DataService } from 'src/app/services/data.service';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { Jugador } from '../../models/Jugador';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-plantel',
  templateUrl: './plantel.component.html',
  styleUrls: ['./plantel.component.css']
})
export class PlantelComponent implements OnInit {

  // Tab management
  activeTab: 'list' | 'cards' = 'list';

  // Players data
  jugadores: Jugador[] = [];
  jugadoresSeleccionados: any = [];
  teamOne: any = [];
  teamTwo: any = [];
  jugadorABorrar: any = null;

  // Charts data (from tarjeta component)
  radarChartDataArray: ChartData<'radar'>[] = [];
  radarChartLabels: string[] = ['Tiro', 'Remate', 'Defensa', 'Velocidad', 'Gambeta', 'Técnica', 'Rusticidad', 'Temperamento'];

  radarChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      r: {
        min: 0,
        max: 5,
        ticks: {
          display: true,
          stepSize: 1,
          color: '#6b7280',
          font: {
            size: 10
          }
        },
        grid: {
          color: '#e5e7eb'
        },
        angleLines: {
          color: '#e5e7eb'
        },
        pointLabels: {
          color: '#374151',
          font: {
            size: 11,
            weight: '500'
          }
        }
      }
    }
  };

  radarChartType: ChartType = 'radar';

  constructor(private router: Router, private ds: DataService, private location: Location) {}

  ngOnInit() {
    this.obtenerJugadoresPorUsuario();
  }

  // Tab management
  setActiveTab(tab: 'list' | 'cards') {
    this.activeTab = tab;
  }

  // Data fetching
  obtenerJugadoresPorUsuario() {
    const id_usuario = 1; // provisorio
    this.ds.getAllPlayersByUserId(id_usuario).subscribe({
      next: (data: any) => {
        this.jugadores = data.players;
        this.generateRadarChartData();
      },
      error: (error: any) => {
        console.error('Error al obtener jugadores:', error);
      }
    })
  }

  // Generate chart data for cards view
  generateRadarChartData() {
    this.radarChartDataArray = this.jugadores.map((jugador: Jugador) => {
      return {
        labels: this.radarChartLabels,
        datasets: [{
          data: [
            jugador.tiro || 1,
            jugador.remate || 1,
            jugador.defensa || 1,
            jugador.velocidad || 1,
            jugador.gambeta || 1,
            jugador.tecnica || 1,
            jugador.rusticidad || 1,
            jugador.temperamento || 1
          ],
          label: jugador.nombre || 'Jugador',
          backgroundColor: 'rgba(99, 102, 241, 0.1)',
          borderColor: 'rgba(99, 102, 241, 0.8)',
          borderWidth: 2,
          pointBackgroundColor: 'rgba(99, 102, 241, 1)',
          pointBorderColor: '#ffffff',
          pointBorderWidth: 2,
          pointRadius: 4
        }]
      };
    });
  }

  // Player selection for teams
  seleccionarJugadores(jugador: any) {
    if (this.jugadoresSeleccionados.includes(jugador)) {
      let indice = this.jugadoresSeleccionados.indexOf(jugador);
      this.jugadoresSeleccionados.splice(indice, 1);
    } else {
      this.jugadoresSeleccionados.push(jugador);
    }
    return this.jugadoresSeleccionados;
  }

  // Generate teams
  getTeams() {
    if (this.jugadoresSeleccionados.length < 2) {
      Swal.fire({
        title: 'Selección insuficiente',
        text: 'Debes seleccionar al menos 2 jugadores para generar equipos',
        icon: 'warning',
        showConfirmButton: true,
        confirmButtonText: 'Entendido'
      });
      return;
    }

    // Generar equipos localmente
    const shuffled = [...this.jugadoresSeleccionados].sort(() => Math.random() - 0.5);
    const midpoint = Math.ceil(shuffled.length / 2);
    
    this.teamOne = shuffled.slice(0, midpoint);
    this.teamTwo = shuffled.slice(midpoint);

    // Guardar en localStorage para la vista de equipos (solución temporal)
    localStorage.setItem('teamOne', JSON.stringify(this.teamOne));
    localStorage.setItem('teamTwo', JSON.stringify(this.teamTwo));

    // Mostrar confirmación
    Swal.fire({
      title: '¡Equipos generados!',
      text: `Equipo 1: ${this.teamOne.length} jugadores | Equipo 2: ${this.teamTwo.length} jugadores`,
      icon: 'success',
      showConfirmButton: true,
      confirmButtonText: 'Ver equipos'
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/equipos']);
      }
    });

    // Intentar actualizar en el backend (opcional - no bloqueante)
    this.ds.updatePlayersTeamsId(this.teamOne, this.teamTwo).subscribe({
      next: (data: any) => {
        console.log('Equipos actualizados en backend:', data);
      },
      error: (error: any) => {
        console.warn('No se pudieron actualizar los equipos en el backend:', error);
      }
    });
  }

  // Delete player
  borrarJugador(jugador: any) {
    this.jugadorABorrar = jugador;
    const id_usuario = this.jugadorABorrar.id_usuario;
    const id_jugador = this.jugadorABorrar.id;

    this.ds.deletePlayer(id_jugador, id_usuario).subscribe({
      next: (data: any) => {
        if (data.data.status == 'OK')
          Swal.fire({
            title: '',
            text: 'Jugador borrado!!',
            icon: 'success',
            showConfirmButton: false,
            timer: 2000
          }).then(() => {
            location.reload();
          })
      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }

  // Helper methods (from tarjeta component)
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

  // Navigation
  goBack(): void {
    this.location.back();
  }

  // Chart events (from tarjeta component)
  chartClicked({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }

  chartHovered({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }
}
