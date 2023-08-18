import { Component } from '@angular/core';
import jugadores from 'src/assets/json/jugadores.json'

@Component({
  selector: 'app-plantel',
  templateUrl: './plantel.component.html',
  styleUrls: ['./plantel.component.css']
})
export class PlantelComponent {

  jugadores: any = [];

  constructor() {}

  ngOnInit() {
    this.jugadores = jugadores.jugadores;
  }
}
