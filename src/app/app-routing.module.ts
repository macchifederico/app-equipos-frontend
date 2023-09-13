import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EquiposComponent } from './components/equipos/equipos.component';
import { PlantelComponent } from './components/plantel/plantel.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { TarjetaComponent } from './components/tarjeta/tarjeta.component';
import { CrearJugadorComponent } from './components/crear-jugador/crear-jugador.component';

const routes: Routes = [
  {path:'', redirectTo: 'principal', pathMatch: 'full'},
  {path: 'principal', component: PrincipalComponent},
  {path: 'equipos', component: EquiposComponent},
  {path: 'plantel', component: PlantelComponent},
  {path: 'jugadores', component: TarjetaComponent},
  {path: 'crear_jugador', component: CrearJugadorComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
