import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IConta, IContaBuscaCpf } from 'src/app/interfaces/conta';
import { ContasService } from 'src/app/services/contas.service';

@Component({
  selector: 'app-lista-contas-cpf',
  templateUrl: './lista-contas-cpf.component.html',
  styleUrls: ['./lista-contas-cpf.component.css']
})
export class ListaContasCpfComponent implements OnInit {

  constructor(private contasService: ContasService, private router: Router, private activatedRoute: ActivatedRoute) { }
  contas: IConta[] = [];
  contasTeste: any;
  ngOnInit(): void {
    const cpf = this.activatedRoute.snapshot.paramMap.get('cpf');
    if(cpf){
      this.listarContasCpf(cpf);
    }
  }

  listarContasCpf(cpf:string){
    this.contasService.buscarContaPorCpf(cpf).subscribe((result: any) => {
      this.contas = result;
    });
  }

}
