import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ISaqueDeposito } from '../interfaces/deposito-saque';
@Injectable({
  providedIn: 'root'
})
export class ContasService {
  endpointDeposito = "deposito/";

  api = environment.api;

  endpoint = 'contas';
  constructor(private http: HttpClient) { }

  listarTodasContas(){
    return this.http.get(`${this.api}/${this.endpoint}/`)
  }

  sacar(saqueDeposito: ISaqueDeposito) {
    return this.http.post<ISaqueDeposito>(`${this.api}/${this.endpoint}/sacar`, saqueDeposito);
  }
  deposito(deposito: ISaqueDeposito) {
    return this.http.put<ISaqueDeposito>(`${this.api}/${this.endpoint}/deposito`, deposito)
  }

}
