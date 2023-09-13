import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-plantel',
  templateUrl: './plantel.component.html',
  styleUrls: ['./plantel.component.css']
})
export class PlantelComponent {

  // @Input() dataEquipos: any;
  jugadores: any = [];
  teamOne : any = [];
  teamTwo : any = [];
  jugadoresSeleccionados: any = [];  
  seleccionados: any = [];

  constructor(private router: Router, private ds: DataService) {
  }

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

  seleccionarJugadores(jugador: any){
    if(this.jugadoresSeleccionados.includes(jugador)){
      let indice = this.jugadoresSeleccionados.indexOf(jugador);
      this.jugadoresSeleccionados.splice(indice, 1);
    }else{
      this.jugadoresSeleccionados.push(jugador);
    }
    return this.jugadoresSeleccionados;      
  }
  

  getTeams(){    
    this.teamOne = [...this.jugadoresSeleccionados].sort(() => Math.random() > 0.5 ? 1 : -1).slice(0,this.jugadoresSeleccionados.length/2);
    this.teamTwo = this.jugadoresSeleccionados.filter((jugador: any) => !this.teamOne.includes(jugador)); 
    console.log("plantel", this.teamOne, this.teamTwo);
    
    this.ds.updatePlayersTeamsId(this.teamOne, this.teamTwo).subscribe({
      next: (data: any) => {
      }
    })

    this.router.navigate(['/equipos']);
  }
}
