import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cadastra-salgado',
  templateUrl: './cadastra-salgado.component.html',
  styleUrls: ['./cadastra-salgado.component.scss']
})
export class CadastraSalgadoComponent implements OnInit {

  breakpoint: number;

  constructor() { }

  ngOnInit() {
    this.breakpoint = (window.innerWidth <= 600) ? 1 : 2;
  }
  
  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 600) ? 1 : 2;
  }

  cadastrar(){
    
  }
}
