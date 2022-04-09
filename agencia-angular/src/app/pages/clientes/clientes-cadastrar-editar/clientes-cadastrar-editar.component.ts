import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ICliente } from 'src/app/interfaces/cliente';
import { ClientesService } from 'src/app/services/clientes.service';

@Component({
  selector: 'app-clientes-cadastrar-editar',
  templateUrl: './clientes-cadastrar-editar.component.html',
  styleUrls: ['./clientes-cadastrar-editar.component.css']
})
export class ClientesCadastrarEditarComponent implements OnInit {

  formCliente: FormGroup = new FormGroup({
    id: new FormControl(null),
    nome: new FormControl('', Validators.required),
    cpf: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    observacoes: new FormControl(''),
    ativo: new FormControl(true)
  });

  constructor(private clientesService: ClientesService) { }

  ngOnInit(): void {
  }

  enviar(){
    const cliente: ICliente = this.formCliente.value;
    this.clientesService.cadastrar(cliente).subscribe(result => {
      console.log(result)
    });
  }

}
