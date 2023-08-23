import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { DataService } from 'src/app/services/data.service';


@Component({
  selector: 'app-equipos',
  templateUrl: './equipos.component.html',
  styleUrls: ['./equipos.component.css']
})
export class EquiposComponent {

  teamOne: any = [];
  teamTwo: any = []; 
  nombre: string = '';

  constructor(private router: Router, private rutaActiva: ActivatedRoute, private ds: DataService){

  }

  ngOnInit(){
    this.ds.enviaEquipos.subscribe(data => {              
      this.teamOne = data.equipo1;      
      this.teamTwo = data.equipo2;
    });
    
  }

}
