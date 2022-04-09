import { Component, OnInit } from '@angular/core';
import { ClientesService } from 'src/app/services/clientes.service';
import { Pipe, PipeTransform } from '@angular/core';
import { ICliente } from 'src/app/interfaces/cliente';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  constructor(private clienteService: ClientesService) { }
  clientes: ICliente[] = [];
  ngOnInit(): void {
    this.listarTodos();
  }

  listarTodos(){
    this.clienteService.listarTodosClientes().subscribe((result: ICliente[]) => {
      this.clientes = result;
    });
  }

  confirmar(id: number){
    Swal.fire({ title: 'Você tem certeza?', text: "Você não pode reverter isto", icon: 'warning', showCancelButton: true, confirmButtonColor: '#3085d6', cancelButtonColor: '#d33',cancelButtonText:"Cancelar", confirmButtonText: 'Sim, remova!' }).then((result) => { if (result.isConfirmed) { this.clienteService.remover(id).subscribe(result =>{
      Swal.fire( 'Removido!', 'Cliente deletado com sucesso', 'success');
      this.listarTodos();
    }, error => {
      console.error(error);
    });  } })

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
          console.log('x');
        return valorFormatado;
    }
}
