import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Jugador } from '../../models/Jugador';

@Component({
  selector: 'app-tarjetas',
  templateUrl: './tarjeta.component.html',
  styleUrls: ['./tarjeta.component.css']
})
export class TarjetaComponent implements OnInit {

  jugadores: Jugador[] = [];
  radarChartDataArray: ChartData<'radar'>[] = [];

  radarChartData: ChartData<'radar'> = {
    labels: [],
    datasets: []
  };

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

  chartClicked({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }

  chartHovered({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }


  constructor(private router: Router, private ds: DataService, private location: Location) {}

  ngOnInit() {
    this.obtenerJugadoresPorUsuario();
  }

  obtenerJugadoresPorUsuario(){
    const id_usuario = 1; //provisorio
    this.ds.getAllPlayersByUserId(id_usuario).subscribe({
      next: (data: any) => {
        this.jugadores = data.players;
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
      },
      error: (error: any) => {
        console.error('Error al obtener jugadores:', error);
      }
    })
  }

  // Métodos helper simples
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

  goBack(): void {
    this.location.back();
  }

}
