import { Component, OnInit } from '@angular/core';
import { ContasService } from 'src/app/services/contas.service';

@Component({
  selector: 'app-contas',
  templateUrl: './contas.component.html',
  styleUrls: ['./contas.component.css']
})
export class ContasComponent implements OnInit {

  constructor(private contasService: ContasService) { }
  contas: any[] = [];
  ngOnInit(): void {
    this.listarContas();
  }

  listarContas(){
    this.contasService.listarTodasContas().subscribe((result: any) => {
      this.contas = result;
      console.log('x');
      console.log(this.contas);
    });
  }

}
