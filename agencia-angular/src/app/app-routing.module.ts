import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesCadastrarEditarComponent } from './pages/clientes/clientes-cadastrar-editar/clientes-cadastrar-editar.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { DepositoComponent } from './pages/contas/caixa/deposito/deposito.component';
import { ContasComponent } from './pages/contas/contas.component';


const routes: Routes = [
  {
    path: 'clientes', component: ClientesComponent
  },
  {
    path: 'contas', component: ContasComponent
  },
  {
    path: 'clientes/cadastrar', component: ClientesCadastrarEditarComponent
  },
  {
    path: 'clientes/editar/:id', component: ClientesCadastrarEditarComponent
  },
  {
    path: 'caixa/deposito', component: DepositoComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
