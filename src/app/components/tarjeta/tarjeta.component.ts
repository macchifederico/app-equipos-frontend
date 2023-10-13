import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import jugadores from 'src/assets/json/jugadores.json'



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

  constructor(private ds: DataService) {}

  ngOnInit() {
    // this.jugadores = jugadores.jugadores 
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
}
