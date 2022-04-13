import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ITransferencia } from 'src/app/interfaces/transferencia';
import { ContasService } from 'src/app/services/contas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-transferencia',
  templateUrl: './transferencia.component.html',
  styleUrls: ['./transferencia.component.css']
})
export class TransferenciaComponent implements OnInit {
  formTransfe: FormGroup = new FormGroup({
    agenciaOrigem: new FormControl('', Validators.required),
    agenciaDestino: new FormControl('', Validators.required),
    numeroContaOrigem: new FormControl('', Validators.required),
    numeroContaDestino: new FormControl('', Validators.required),
    valor: new FormControl('', Validators.required)
  });
  constructor(    private transferenciaService: ContasService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  transferir() {
    const transferencia: ITransferencia = this.formTransfe.value;
    this.transferenciaService.transferencia(transferencia).subscribe(result => {
      Swal.fire("Tudo certo!", 'Transferência realizada com sucesso!', 'success');
      this.router.navigate(['/contas']);
    }, error => {
      Swal.fire('Digitou algo errado?', 'Aconteceu um erro na sua transferência', 'error');
      console.error(error);
    });
  }

}
