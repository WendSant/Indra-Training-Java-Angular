import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ClientesComponent, CpfPipe } from './pages/clientes/clientes.component';
import { ContasComponent } from './pages/contas/contas.component';
import { HttpClientModule } from '@angular/common/http';
import { ClientesCadastrarEditarComponent } from './pages/clientes/clientes-cadastrar-editar/clientes-cadastrar-editar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ClientesComponent,
    ContasComponent,
    CpfPipe,
    ClientesCadastrarEditarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
