import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ISaqueDeposito } from 'src/app/interfaces/deposito-saque';
import { ContasService } from 'src/app/services/contas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-deposito',
  templateUrl: './deposito.component.html',
  styleUrls: ['./deposito.component.css']
})
export class DepositoComponent implements OnInit {

  formValue: FormGroup = new FormGroup({
    agencia: new FormControl('', Validators.required),
    numeroConta: new FormControl('', Validators.required),
    valor: new FormControl('', Validators.required),
  });
  constructor(
    private contaService: ContasService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  deposito() {
    const deposito: ISaqueDeposito = this.formValue.value;
    this.contaService.deposito(deposito).subscribe((result => {
      Swal.fire('Sucesso!', 'Depósito concluído!', 'success')
      this.router.navigate(['/contas']);
    }), error => {
      console.error(error);
    });
  }
}
