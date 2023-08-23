import { Component } from '@angular/core';
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

  constructor() {}

  ngOnInit() {
    this.jugadores = jugadores.jugadores    
  }
  
}
