import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RemoteService } from 'src/providers/remote.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Usuario } from '../../Classes/Usuario';

@Component({
  selector: 'app-lista-salgado-cliente',
  templateUrl: './lista-salgado-cliente.component.html',
  styleUrls: ['./lista-salgado-cliente.component.scss']
})
export class ListaSalgadoClienteComponent implements OnInit {
  breakpoint: number;
  salgados: any;
  carrinho = [];
  formCompra = false;
  formaPagamento = [];
  formaEntrega   = [];
  //email = Usuario.EMAIL;
  //valorTotal: number = 0;

  public dadosPedido = {
    email: Usuario.EMAIL,
    valorTotal: 0,
    formaPagamento: '',
    salgadosPedido: [],
    formaEntrega: ''
  }
  endereco: boolean;
  mensagem: string;
  liberado: any;
  message;

  constructor(private remote: RemoteService, private router: Router) { }

  ngOnInit() {
    this.breakpoint = (window.innerWidth <= 600) ? 1 : 1;

    let url = Usuario.URL+'salgado/listarSalgadoCliente';
    this.remote.acessor(url, '').then((res: any) =>{
      for (let item in res.resp) {
        res.resp[item].quantidade = 0;
      }
      if(res.auth == true &&  res.resp && !res.message){  
        this.salgados = res.resp;
        
/*         this.dataSource = new MatTableDataSource(res.resp);
        this.dataSource.paginator = this.paginator; */
      }else{
        this.message = res.message;
      }
      console.log('resposta', res);
    })
  }
  
  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 600) ? 1 : 1;
  }

  async adicionarItem(id){        
      let existe = false;
      for (let item in this.salgados) {
        if(await this.salgados[item].id == id){
          existe = true;
        }
      }
      if(existe == true){
        for (let item in this.salgados) {
          if(await this.salgados[item].id == id){
            if(!this.salgados[item].quantidade){
              this.salgados[item].quantidade = 1
              if(this.dadosPedido.valorTotal == 0){
                this.dadosPedido.valorTotal = this.salgados[item].preco;
              }else{
                this.dadosPedido.valorTotal = this.dadosPedido.valorTotal + this.salgados[item].preco;
              }
            }else{
              this.salgados[item].quantidade++;
              this.dadosPedido.valorTotal = this.dadosPedido.valorTotal + this.salgados[item].preco;
            }
          }
        } 
      }
    
    
    console.log(this.salgados);
    console.log('valor total',this.dadosPedido.valorTotal);
    
  }


  async removerItem(id){
    var i;
    for (i = 0; i < this.salgados.length; i++) {
      if(this.salgados[i].id === id){
        if(this.salgados[i].quantidade > 0){
          this.salgados[i].quantidade--;
          this.dadosPedido.valorTotal = this.dadosPedido.valorTotal - this.salgados[i].preco;
        }
      } 
    }
    console.log(this.salgados);
    console.log('valor total',this.dadosPedido.valorTotal);
  }
  fazerPedido(){
    let carrinho = false;
    for (let item in this.salgados) {
      if(this.salgados[item].quantidade != 0){
        carrinho = true;
      }
    }
    if(carrinho == true){
      Swal.fire({
        title: 'Finalizar pedido!',
        width: 400,
        text: 'Deseja continuar para o caixa? Você pode ainda escolher mais produtos!',
        showCancelButton: true, 
        confirmButtonText: 'ir para o caixa',
        cancelButtonText: 'escolher mais produtos'
      }).then((result) => {  
        if (result.value) {  
          this.formCompra = true;
          let url = Usuario.URL+'formaPagamento/listarFormaPagamento';
          this.remote.acessor(url, '').then((res: any) =>{
            this.formaPagamento = res.resp;
            console.log('resposta', this.formaPagamento);
          })
          let urlFormaEntrega = Usuario.URL+'formaEntrega/listarFormaEntrega';
          this.remote.acessor(urlFormaEntrega, '').then((res: any) =>{
            this.formaEntrega = res.resp;
            console.log('resposta entrega', this.formaEntrega);
          })
          let dadosUser = {
            email: Usuario.EMAIL,
            tipo:'0'
          };
          let urlEndereco = Usuario.URL+'endereco/buscarEndereco';
          this.remote.acessor(urlEndereco, dadosUser).then((res: any) =>{
            console.log('endereco', res);
            if(res.auth == false){
              this.endereco = false;
              this.mensagem = res.message; 
            }
          });
        }  
      })
    }else{
      this.alert('Seu carrinho está vazio, adicione itens para continuar!');
    }
  }
  escolheFormaPagamento(formaPagamento){
    this.dadosPedido.formaPagamento = formaPagamento;
  }
  escolheFormaEntrega(formaEntrega){
    this.dadosPedido.formaEntrega = formaEntrega;
    if(formaEntrega != 2 && this.endereco == false){
      this.liberado = false;
    }else{
      this.liberado = true;
    }
    console.log('liberado', this.liberado);
    
    console.log('forma entrega escolhido', this.dadosPedido.formaEntrega);
  }
   async FinalizarPedido(){
    let i;
    for (i = 0; i < await this.salgados.length; i++) {
      
      if(await this.salgados[i].quantidade != 0){
        let objetoSalgado =  { 
          salgado: this.salgados[i].id,
          quantidade: this.salgados[i].quantidade 
         };
         await this.dadosPedido.salgadosPedido.push(objetoSalgado)
      }
    }
    console.log('salgados pedidos', this.dadosPedido);
    let url = Usuario.URL+'encomendaInformacao/inserirEncomendaInformacao';
    this.remote.acessor(url, this.dadosPedido).then((res: any) =>{
      console.log('resposta', res);
      if(res.auth == true){
        this.alert(res.message);
        this.router.navigate(['/dashboard']);
        //this.dadosPedido.salgadosPedido = [];
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
