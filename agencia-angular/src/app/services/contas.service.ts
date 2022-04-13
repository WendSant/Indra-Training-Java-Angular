import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IDepositoSaque } from '../interfaces/deposito-saque';
import { ITransferencia } from '../interfaces/transferencia';
@Injectable({
  providedIn: 'root'
})
export class ContasService {

  api = environment.api;

  endpoint = 'contas';
  constructor(private http: HttpClient) { }

  listarTodasContas(){
    return this.http.get(`${this.api}/${this.endpoint}/`)
  }

  saque(saqueDeposito: IDepositoSaque) {
    return this.http.put<IDepositoSaque>(`${this.api}/${this.endpoint}/saque`, saqueDeposito);
  }
  deposito(deposito: IDepositoSaque) {
    return this.http.put<IDepositoSaque>(`${this.api}/${this.endpoint}/deposito`, deposito)
  }
  transferencia(transferencia: ITransferencia) {
    return this.http.put(`${this.api}/${this.endpoint}/transferencia`, transferencia);
  }

}
