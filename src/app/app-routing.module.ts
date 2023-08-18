import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EquiposComponent } from './components/equipos/equipos.component';
import { PlantelComponent } from './components/plantel/plantel.component';
import { TarjetaComponent } from './components/tarjeta/tarjeta.component';

const routes: Routes = [
  {path:'', redirectTo: 'equipos', pathMatch: 'full'},
  {path: 'equipos', component: EquiposComponent},
  {path: 'plantel', component: PlantelComponent},
  {path: 'jugadores', component: TarjetaComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
