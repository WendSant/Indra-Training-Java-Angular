import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesCadastrarEditarComponent } from './pages/clientes/clientes-cadastrar-editar/clientes-cadastrar-editar.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { DepositoComponent } from './pages/contas/caixa/deposito/deposito.component';
import { SaqueComponent } from './pages/contas/caixa/saque/saque.component';
import { ContasComponent } from './pages/contas/contas.component';
import { IndexComponent } from './pages/index/index.component';


const routes: Routes = [
  {
    path: '', component: IndexComponent
  },
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
  },
  {
    path: 'caixa/saque', component: SaqueComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
