import { ClienteContaResponse, ICliente } from "./cliente";

export interface IConta {
    id:string;
    agencia: string;
    numero: string;
    saldo: number;
    cliente: ICliente ;
}

export interface IContaCreatedResponse {
  id?:string;
  agencia: string;
  numero: string;
  saldo: number;
  cliente: ClienteContaResponse ;
}
