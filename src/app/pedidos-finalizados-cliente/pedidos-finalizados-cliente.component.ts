import { Component, OnInit } from '@angular/core';
import { RemoteService } from 'src/providers/remote.service';
import { Usuario } from 'src/Classes/Usuario';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-pedidos-finalizados-cliente',
  templateUrl: './pedidos-finalizados-cliente.component.html',
  styleUrls: ['./pedidos-finalizados-cliente.component.scss']
})
export class PedidosFinalizadosClienteComponent implements OnInit {

  breakpoint: number;
  message:any;
  novosPedidos = [];
  salgados:any;
  alerta:boolean;

  constructor(private remote: RemoteService) { }

  ngOnInit(): void {
    this.breakpoint = (window.innerWidth <= 600) ? 1 : 1;
    let obj = {
      encomendaAndamento: 3,
      email: Usuario.EMAIL
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
