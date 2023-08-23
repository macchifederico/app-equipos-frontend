import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-equipos',
  templateUrl: './equipos.component.html',
  styleUrls: ['./equipos.component.css']
})
export class EquiposComponent {

  equipos: any = [];
  constructor(private router: Router, private rutaActiva: ActivatedRoute){

  }

  ngOnInit(){

  }

}
