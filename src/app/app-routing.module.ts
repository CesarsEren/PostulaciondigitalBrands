import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { EmpleadosComponent } from "./views/empleados/empleados.component";
import { InicioComponent } from "./views/inicio/inicio.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "/inicio",
    pathMatch: "full",
  },
  {
    path: "inicio",
    component: InicioComponent,
  },
  {
    path: "empleados",
    component: EmpleadosComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
