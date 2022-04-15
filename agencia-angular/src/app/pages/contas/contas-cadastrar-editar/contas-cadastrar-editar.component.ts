import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ICliente } from 'src/app/interfaces/cliente';

import { IConta, IContaCreatedResponse } from 'src/app/interfaces/conta';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { ContasService } from 'src/app/services/contas.service';
import { ClientesService } from 'src/app/services/clientes.service';

@Component({
  selector: 'app-contas-cadastrar-editar',
  templateUrl: './contas-cadastrar-editar.component.html',
  styleUrls: ['./contas-cadastrar-editar.component.css']
})
export class ContasCadastrarEditarComponent implements OnInit {

  cliente: any;
  hasCliente: boolean = false;
  hasConta: boolean = false;
  idCliente: string = '';

  // emptyContas: IConta={
  //   id:0,
  //   agencia: '',
  //   numero: '',
  //   saldo: 0,
  //   cliente: this.cliente
  // }

  formConta: FormGroup = this.preencheFormGroup();
  formCliente: FormGroup = this.preencheFormCliente();
  formCriarConta: FormGroup = this.preencheCriarConta();

  constructor(private contasService: ContasService, private clientesService: ClientesService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.formCliente
    const id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    if (id){
      this.contasService.buscarPorId(id).subscribe((result: IConta)=>{
        this.formConta = this.preencheFormGroup();
      }, error => {
        console.error(error);
      });
    }
  }

  buscarClienteCpf(){
    return this.clientesService.buscarClienteCpf(this.formConta.get('cpf')?.value).subscribe((res) => {
      this.cliente = res;
      if (this.cliente){
        this.hasCliente = true;
      }
      this.preencheFormCliente(res);
      this.formCliente.disabled;
      this.idCliente = this.cliente.id;
      console.log(this.idCliente);
    });
  }

  limpar(){
    this.formConta.reset();
    this.hasCliente = false;
    this.hasConta = false;
  }

  exibirCriarConta(){
    if (this.hasConta){
      this.hasConta = false;
      return
    }
    this.hasConta = true
  }

  preencheFormGroup(){
    return this.formConta= new FormGroup({
      cpf: new FormControl(null)
    })
  }

  preencheFormCliente(cliente?: any){
    return this.formCliente = new FormGroup({
      nome: new FormControl({value: this.cliente?.nome, disabled: true}),
      email: new FormControl({value: this.cliente?.email, disabled: true}),
      id: new FormControl({value: this.cliente?.id, disabled: true}),
    })
  }

  preencheCriarConta(){
    return this.formCriarConta = new FormGroup({
      agencia: new FormControl(null, Validators.required),
      numeroConta: new FormControl(null, Validators.required),
      saldo: new FormControl(null, Validators.required),
      idCliente: new FormControl(this.idCliente, Validators.required)
    })
  }

  montarPayLoad(form: FormGroup):IContaCreatedResponse{
    const cliente = {
      id: this.idCliente
    }
    const conta = {
      agencia: this.formCriarConta.get('agencia')?.value,
      numero: this.formCriarConta.get('numeroConta')?.value,
      saldo: this.formCriarConta.get('saldo')?.value,
      cliente: cliente
    }
    return conta;
  }

  enviar(){
    const conta = this.montarPayLoad(this.formCriarConta.value);
    this.contasService.cadastrarEditar(conta).subscribe(result => {
      Swal.fire('Sucesso!!', `${this.estaEditando() ? 'Editado' : 'Cadastrado'} com sucesso!`, 'success' );
      this.router.navigate(['/contas']);
    });
  }

  estaEditando(){
    return !!this.formConta.get("id")?.value;
  }


}
