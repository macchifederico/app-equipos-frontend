import { Component } from '@angular/core';
import {CdkDragDrop, moveItemInArray, CdkDrag, transferArrayItem} from  '@angular/cdk/drag-drop';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-grafico',
  templateUrl: './grafico.component.html',
  styleUrls: ['./grafico.component.css']
})
export class GraficoComponent {
  
  unJugador: any;
  dosJugador: any;
  jugadores: any = [];


  constructor(private router: Router, private ds: DataService) {
  }
  
  ngOnInit(){
    this.obtenerJugadoresPorUsuario();
  }

  radarChartLabels: string[] = [ 'Tiro', 'Remate', 'Defensa', 'Velocidad', 'Gambeta', 'Tecnica', 'Rusticidad', 'Temperamento' ];

  radarChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      r: {
        min: 0,
        max: 100
      }
    }
  };

  radarChartData: ChartData<'radar'> = {
    labels: this.radarChartLabels,
    datasets: [
      // { data: [ this.unJugador.habilidades.tiro, this.unJugador.habilidades.remate, 
      //           this.unJugador.habilidades.defensa, this.unJugador.habilidades.velocidad, 
      //           this.unJugador.habilidades.gambeta,
      //           this.unJugador.habilidades.tecnica, this.unJugador.habilidades.rusticidad,
      //           this.unJugador.habilidades.temperamento ], label: this.unJugador.nombre },
     
    ],
    
  };

  radarChartType: ChartType = 'radar';

  chartClicked({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }

  chartHovered({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }

  obtenerJugadoresPorUsuario(){
    const id_usuario = 1; //provisorio
    this.ds.getAllPlayersByUserId(id_usuario).subscribe({
      next: (data: any) => {
        this.jugadores = data.players;
        console.log(data.players)      
      },
      error: (error: any) => {
      }
    })
  }

}
