import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { Router } from '@angular/router';



@Component({
  selector: 'app-tarjetas',
  templateUrl: './tarjeta.component.html',
  styleUrls: ['./tarjeta.component.css']
})
export class TarjetaComponent {

  jugadores: any = [];
  promedio: any;
  mejorHabilidad: any;
  peorHabilidad: any;
  unJugador: any;

  constructor(private router: Router, private ds: DataService) {}

  ngOnInit() {
    this.obtenerJugadoresPorUsuario();    
  }
  
  obtenerJugadoresPorUsuario(){
    const id_usuario = 1; //provisorio
    this.ds.getAllPlayersByUserId(id_usuario).subscribe({
      next: (data: any) => {      
        this.jugadores = data.players;     
      },
      error: (error: any) => {
      }
    })
  }

  //Grafico

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
    datasets: this.jugadores.forEach((element: any) => {      
      const data = {data: [element.tiro, element.remate, element.defensa, element.velocidad, element.gambeta, 
             element.tecnica, element.rusticidad, element.temperamento], label: element.nombre}
      return data; 
    })
    // [
    //   { data: [ this.unJugador.habilidades.tiro, this.unJugador.habilidades.remate, 
    //             this.unJugador.habilidades.defensa, this.unJugador.habilidades.velocidad, 
    //             this.unJugador.habilidades.gambeta,
    //             this.unJugador.habilidades.tecnica, this.unJugador.habilidades.rusticidad,
    //             this.unJugador.habilidades.temperamento ], label: this.unJugador.nombre },
    // ],
    
  };

  radarChartType: ChartType = 'radar';

  chartClicked({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }

  chartHovered({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }

  
}
