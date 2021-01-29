import { Component, OnInit } from '@angular/core';
import { RemoteService } from 'src/providers/remote.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-cadastra-salgado',
  templateUrl: './cadastra-salgado.component.html',
  styleUrls: ['./cadastra-salgado.component.scss']
})
export class CadastraSalgadoComponent implements OnInit {

  breakpoint: number;
  public dadosSalgado = {
    nome: '',
    sabor: '',
    tamanho: '',
    tipo: '',
    preco: ''
  }

  constructor(private remote: RemoteService,) { }

  ngOnInit() {
    this.breakpoint = (window.innerWidth <= 600) ? 1 : 1;
  }
  
  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 600) ? 1 : 1;
  }
  alert(text){
    Swal.fire({
      title: text,
      width: 400,
      //text: text,
      /* icon: 'warning', */
      /* showCancelButton: true, */
      confirmButtonText: 'ok',
      /* cancelButtonText: 'No, let me think' */
    })
  }
  cadastrar(){
    let url = 'http://localhost:5000/api/v1/salgado/inserirSalgado';
    this.remote.acessor(url, this.dadosSalgado).then((res: any) =>{
      if(res.auth == true){
        this.dadosSalgado.nome = '';
        this.dadosSalgado.sabor = '';
        this.dadosSalgado.tamanho = '';
        this.dadosSalgado.tipo = '';
        this.dadosSalgado.preco = '';
        this.alert(res.message);

      }else{
        this.alert(res.message);
      }
    })
  }
}
