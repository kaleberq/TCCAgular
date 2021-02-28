import { Component, OnInit } from '@angular/core';
import { RemoteService } from 'src/providers/remote.service';
import { Usuario } from 'src/Classes/Usuario';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-pedidos-para-fazer',
  templateUrl: './pedidos-para-fazer.component.html',
  styleUrls: ['./pedidos-para-fazer.component.scss']
})
export class PedidosParaFazerComponent implements OnInit {

  breakpoint: number;
  message:any;
  novosPedidos = [];
  salgados:any;
  alerta:boolean;

  constructor(private remote: RemoteService) { }

  ngOnInit(): void {
    this.breakpoint = (window.innerWidth <= 600) ? 1 : 1;
    let obj = {
      encomendaAndamento: 1
    }
    let url = Usuario.URL+'encomendaInformacao/buscarEncomendaInformacaoSituacao';

    this.remote.acessor(url, obj).then((res: any) =>{
      console.log('resposta', res);
      if(res.auth == true &&  res.resp && !res.message){  
        this.novosPedidos = res.resp;
        if(this.novosPedidos.length == 0){
          this.alerta = false;
        }
        console.log(this.novosPedidos);
        
      }else{
        this.message = res.message;
        console.log(this.message);
      }
    })
  }
  buscaListaSalgadosPedido(idEncomenda){
    let obj = {
      idEncomenda: idEncomenda
    }

    let url = Usuario.URL+'encomendaInformacao/buscarSalgadosEncomenda';
    this.remote.acessor(url, obj).then((res: any) =>{
      console.log('resposta', res);
      if(res.auth == true &&  res.resp && !res.message){  
        this.salgados = res.resp;
        console.log(this.salgados);
      }else{
        
        
      }
    })
  }
  finalizarPedido(idEncomenda, andamento, email){
    let obj = {
      idEncomenda: idEncomenda,
      encomendaAndamento: andamento,
      email: email
    }

    let url = Usuario.URL+'encomendaInformacao/updateAndamentoEncomenda';
    this.remote.acessor(url, obj).then((res: any) =>{
      if(res.auth == true && res.message){  
        this.alert(res.message);
        this.ngOnInit();
      }else{
        this.alert(res.message);
      }
    })
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
}
