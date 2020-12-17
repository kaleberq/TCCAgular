import { Component, OnInit } from '@angular/core';
import { RemoteService } from 'src/providers/remote.service';
import { Usuario } from '../../Classes/Usuario';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-configuracoes',
  templateUrl: './configuracoes.component.html',
  styleUrls: ['./configuracoes.component.scss']
})
export class ConfiguracoesComponent implements OnInit {
  public breakpoint: number;
  public dadosCadastro = {
    email: Usuario.EMAIL,
    primeiro_nome: '',
    sobrenome: '',
    cpf: '',
    senhaAntiga: '',
    senha:'',
    celular:'',
    telefone: '',
    tipo:'0'
  };
  public dadosEndereco = {
    email: Usuario.EMAIL,
    rua: '',
    numero: '',
    complemento: '',
    cep: '',
    cidade:'',
    bairro: ''
  };
  public senhaAntiga;
  public mensagem;
  public cadastro = 0;
  public dadosBusca = 0;
  constructor(private remote: RemoteService) { 

  }


  ngOnInit() {
    this.breakpoint = (window.innerWidth <= 600) ? 1 : 2;
    let url = 'http://localhost:5000/api/v1/user/buscarDadosUsuario';
    this.remote.acessor(url, this.dadosCadastro).then((res: any) =>{
      if(res.auth == true){
        let dados = res.resp;
        this.dadosCadastro.primeiro_nome = dados.primeiro_nome;
        this.dadosCadastro.cpf = dados.cpf;
        this.dadosCadastro.sobrenome = dados.sobrenome;
        this.dadosCadastro.telefone = dados.telefone;
        this.dadosCadastro.celular = dados.celular;
        this.senhaAntiga = dados.senha;

      }else{
        this.alert('Sua sessão caiu, faça login novamente!')
      }
    });
  }
  
  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 600) ? 1 : 2;
  }

  EditarCadastro(){





    if((!this.dadosCadastro.senhaAntiga && this.dadosCadastro.senha) || (this.dadosCadastro.senhaAntiga && !this.dadosCadastro.senha)){
      if(!this.dadosCadastro.senhaAntiga){
        this.alert('Digite sua senha antiga para alterá-la')
      }else{
        this.alert('Digite sua senha nova para alterá-la')
      }
      return false;
    }
    else if((this.dadosCadastro.senhaAntiga !== this.senhaAntiga) && (this.dadosCadastro.senhaAntiga !== '' && this.senhaAntiga !== '')){
      this.alert('Senha antiga incorreta')
      return false;
    }
    else if(this.dadosCadastro.senha == this.senhaAntiga){
      this.alert('As senha nova não pode ser igual a antiga')
      return false;
    }
    else if((this.dadosCadastro.senhaAntiga.length < 8 || this.dadosCadastro.senha.length < 8) && (this.dadosCadastro.senhaAntiga !== '' && this.senhaAntiga !== '')){
      this.alert('As senha tem que ter 8 caracteres ou mais')
      return false;
    }else if((this.dadosCadastro.senhaAntiga == this.dadosCadastro.senha) && (this.dadosCadastro.senhaAntiga !== '' && this.senhaAntiga !== '')){
      this.alert('As senhas nova não pode ser igual a senha antiga!')
      return false;
    }else{      
      let url = 'http://localhost:5000/api/v1/user/editarDadosUsuario';
      this.remote.acessor(url, this.dadosCadastro).then((res: any) =>{
        if(res.auth == true){
          this.ngOnInit();
          this.senhaAntiga = '';
          this.dadosCadastro.senhaAntiga = '';
          this.dadosCadastro.senha = '';
          this.alert('Usuário editado com sucesso!')
          //this.alert(res.message);
        }else{

          //this.alert(res.message);
        }
      });
    }
  }
  alert(text){
    Swal.fire({
      /* title: text, */
      width: 400,
      text: text,
      /* icon: 'warning', */
      /* showCancelButton: true, */
      confirmButtonText: 'ok',
      /* cancelButtonText: 'No, let me think' */
    })
  }
  buscaEndereco(){
    let url = 'http://localhost:5000/api/v1/endereco/buscarEndereco';
    this.remote.acessor(url, this.dadosCadastro).then((res: any) =>{
      if(res.message){
        this.mensagem = res.message;
        this.dadosBusca = 0;
      }else{
        this.dadosBusca = 1;
        this.mensagem = '';
        let dados = res.resp;
        this.dadosEndereco.rua = dados.rua;
        this.dadosEndereco.numero = dados.numero;
        this.dadosEndereco.complemento = dados.complemento;
        this.dadosEndereco.cep = dados.cep;
        this.dadosEndereco.cidade = dados.cidade;
      }
    });
  }
  mostraFormCadastro(){
    this.cadastro = 1;
    this.dadosEndereco.rua = '';
    this.dadosEndereco.numero = '';
    this.dadosEndereco.complemento = '';
    this.dadosEndereco.cep = '';
    this.dadosEndereco.cidade = '';
  }
  cadastrar(){    
    let url = 'http://localhost:5000/api/v1/endereco/inserirEndereco';
    this.remote.acessor(url, this.dadosEndereco).then( async (res: any) =>{
      if(res.auth == true){
         this.alert(res.message);
        this.cadastro = 0;
        this.buscaEndereco();
      }else{
        this.alert(res.message);
      }
    });
  }
  editarEndereco(){    
    let url = 'http://localhost:5000/api/v1/endereco/editarEndereco';
    this.remote.acessor(url, this.dadosEndereco).then( async (res: any) =>{
      if(res.auth == true){
         this.alert(res.message);
        this.cadastro = 0;
        this.buscaEndereco();
      }else{
        this.alert(res.message);
      }
    });
  }
  excluirEndereco(){
    Swal.fire({
      /* title: text, */
      width: 400,
      text: 'Deseja realmente excluir este endereço?',
      /* icon: 'warning', */
      showCancelButton: true,
      confirmButtonText: 'sim',
      cancelButtonText: 'não'
    }).then((result) => {  
      if (result.value) {  
        let url = 'http://localhost:5000/api/v1/endereco/excluirEndereco';
        this.remote.acessor(url, this.dadosEndereco).then( async (res: any) =>{
          if(res.auth == true){
            this.alert(res.message);
            this.cadastro = 0;
            this.buscaEndereco();
          }else{
            this.alert(res.message);
          }
        });
      }  
    })
  }
  buscaCep(){
    let url = "https://viacep.com.br/ws/"+this.dadosEndereco.cep+"/json/";
    this.remote.buscaCep(url).then( async (res: any) =>{
      if(res){
        this.dadosEndereco.rua = res.logradouro;
        this.dadosEndereco.cidade = res.localidade;
        this.dadosEndereco.bairro = res.bairro;
      }else{
        this.dadosEndereco.rua = '';
        this.dadosEndereco.cidade = '';
        this.dadosEndereco.bairro = '';
        this.alert('CEP invalido!');
      }
    })
  }
}
