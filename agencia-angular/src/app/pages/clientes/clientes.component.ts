import { Component, OnInit } from '@angular/core';
import { ClientesService } from 'src/app/services/clientes.service';
import { Pipe, PipeTransform } from '@angular/core';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  constructor(private clienteService: ClientesService) { }
  clientes: any[] = [];
  ngOnInit(): void {
    this.listarTodos();
  }

  listarTodos(){
    this.clienteService.listarTodosClientes().subscribe((result: any) => {
      this.clientes = result;
    });
  }
}
@Pipe({ name: 'cpf' })
export class CpfPipe implements PipeTransform {
    transform(value: string|number): string {
        let valorFormatado = value + '';

        valorFormatado = valorFormatado
            .padStart(11, '0')                  // item 1
            .substr(0, 11)                      // item 2
            .replace(/[^0-9]/, '')              // item 3
            .replace(                           // item 4
                /(\d{3})(\d{3})(\d{3})(\d{2})/,
                '$1.$2.$3-$4'
            );

        return valorFormatado;
    }
}