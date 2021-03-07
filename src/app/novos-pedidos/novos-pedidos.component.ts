import { Component, OnInit } from '@angular/core';
import { RemoteService } from 'src/providers/remote.service';
import { Usuario } from 'src/Classes/Usuario';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-novos-pedidos',
  templateUrl: './novos-pedidos.component.html',
  styleUrls: ['./novos-pedidos.component.scss']
})
export class NovosPedidosComponent implements OnInit {

  breakpoint: number;
  message:any;
  novosPedidos = [];
  salgados:any;
  alerta:boolean;

  constructor(private remote: RemoteService) { }

  ngOnInit(): void {
    this.breakpoint = (window.innerWidth <= 600) ? 1 : 1;
    let obj = {
      encomendaAndamento: 0
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
  aceitarRecusarPedido(idEncomenda, andamento, email){
    let obj = {
      idEncomenda: idEncomenda,
      encomendaAndamento: andamento,
      email: email
    }
    if(andamento == 2){
      Swal.fire({
        /* title: text, */
        width: 400,
        text: 'Deseja realmente recusar este pedido?',
        /* icon: 'warning', */
        showCancelButton: true,
        confirmButtonText: 'sim',
        cancelButtonText: 'não'
      }).then((result) => {  
        if (result.value) {  
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
      })
    }else{
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
