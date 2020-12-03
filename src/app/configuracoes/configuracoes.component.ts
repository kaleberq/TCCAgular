import { Component, OnInit } from '@angular/core';
import { RemoteService } from 'src/providers/remote.service';
import { Usuario } from '../../Classes/Usuario';
import Swal from 'sweetalert2/dist/sweetalert2.js';

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
  public senhaAntiga;

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
    if(this.dadosCadastro.senhaAntiga !== this.senhaAntiga){
      this.alert('Senha antiga incorreta')
      return false;
    }
    else if(this.dadosCadastro.senha == this.senhaAntiga){
      this.alert('As senha nova não pode ser igual a antiga')
      return false;
    }
    else if(this.dadosCadastro.senhaAntiga.length < 8 || this.dadosCadastro.senha.length < 8){
      this.alert('As senha tem que ter 8 caracteres ou mais')
      return false;
    }else if(this.dadosCadastro.senhaAntiga == this.dadosCadastro.senha){
      this.alert('As senhas nova não pode ser igual a senha antiga!')
      return false;
    }else{
      let url = 'http://localhost:5000/api/v1/user/editarDadosUsuario';
      this.remote.acessor(url, this.dadosCadastro).then((res: any) =>{
        console.log('resposta pagina', res);
        
        if(res.auth == true){
          console.log('resposta', res);
          this.ngOnInit();
          this.senhaAntiga = '';
          this.dadosCadastro.senhaAntiga = '';
          this.dadosCadastro.senha = '';
          this.alert('Usuário editado com sucesso!')
          //this.alert(res.message);
        }else{
          console.log('resposta', res);
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
    console.log('endereco');
    
  }
}
