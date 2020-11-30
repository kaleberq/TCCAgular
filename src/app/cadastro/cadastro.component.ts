import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RemoteService } from 'src/providers/remote.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {

  public dadosCadastro = {
    primeiro_nome: '',
    sobrenome: '',
    cpf: '',
    email: '',
    senha: '',
    passwordConfirm:'',
    celular:'',
    telefone: '',
    tipo:'0'

  }
  public url = 'http://localhost:5000/api/v1/user/cadastroUsuario';
  breakpoint: number;
  constructor(private remote: RemoteService, private router: Router) { 
    
  }
  //https://www.npmjs.com/package/ngx-mask

  cadastrar(){
    console.log('dadosCadastro', this.dadosCadastro);
    
  }

  ngOnInit() {
    this.breakpoint = (window.innerWidth <= 600) ? 1 : 2;
  }
  
  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 600) ? 1 : 2;
  }

  validarCadastro(){
    console.log('this.dadosCadastro',this.dadosCadastro);
  
    if (this.dadosCadastro.cpf == null) {
      this.alert('Cpf invalido!');
      return false;
    }
    if (this.dadosCadastro.cpf.length != 11) {
      this.alert('Cpf invalido!');
      return false;
    }
    if ((this.dadosCadastro.cpf == '00000000000') || (this.dadosCadastro.cpf == '11111111111') || (this.dadosCadastro.cpf == '22222222222') || (this.dadosCadastro.cpf == '33333333333') || (this.dadosCadastro.cpf == '44444444444') || (this.dadosCadastro.cpf == '55555555555') || (this.dadosCadastro.cpf == '66666666666') || (this.dadosCadastro.cpf == '77777777777') || (this.dadosCadastro.cpf == '88888888888') || (this.dadosCadastro.cpf == '99999999999')) {
      this.alert('Cpf invalido!');
      return false;
    }
    let numero: number = 0;
    let caracter: string = '';
    let numeros: string = '0123456789';
    let j: number = 10;
    let somatorio: number = 0;
    let resto: number = 0;
    let digito1: number = 0;
    let digito2: number = 0;
    let cpfAux: string = '';
    cpfAux = this.dadosCadastro.cpf.substring(0, 9);
    for (let i: number = 0; i < 9; i++) {
        caracter = cpfAux.charAt(i);
        if (numeros.search(caracter) == -1) {
          this.alert('Cpf invalido!');
          return false;
        }
        numero = Number(caracter);
        somatorio = somatorio + (numero * j);
        j--;
    }
    resto = somatorio % 11;
    digito1 = 11 - resto;
    if (digito1 > 9) {
        digito1 = 0;
    }
    j = 11;
    somatorio = 0;
    cpfAux = cpfAux + digito1;
    for (let i: number = 0; i < 10; i++) {
        caracter = cpfAux.charAt(i);
        numero = Number(caracter);
        somatorio = somatorio + (numero * j);
        j--;
    }
    resto = somatorio % 11;
    digito2 = 11 - resto;
    if (digito2 > 9) {
        digito2 = 0;
    }
    cpfAux = cpfAux + digito2;
    if (this.dadosCadastro.cpf != cpfAux) {
      this.alert('Cpf invalido!');
      return false;
    }

    let usuario = this.dadosCadastro.email.substring(0, this.dadosCadastro.email.indexOf("@"));
    let dominio = this.dadosCadastro.email.substring(this.dadosCadastro.email.indexOf("@")+ 1, this.dadosCadastro.email.length);
    let com = dominio.substring(dominio.indexOf("com"), dominio.length);

    if ((usuario.length >=1) &&
        (dominio.length >=3) &&
        (usuario.search("@")==-1) &&
        (dominio.search("@")==-1) &&
        (usuario.search(" ")==-1) &&
        (dominio.search(" ")==-1) &&
        (dominio.search(".")!=-1) &&
        (dominio.indexOf(".") >=1)&&
        (dominio.lastIndexOf(".") < dominio.length - 1)&&
        (com == 'com')) {
    }
    else{
      this.alert('Email invalido!')
      return false;
    }

    if(this.dadosCadastro.telefone){
      if(this.dadosCadastro.telefone.length < 10){
        this.alert('Telefone invalido!')
        return false;
      }
    }
    if(this.dadosCadastro.celular){
      if(this.dadosCadastro.celular.length < 11){
        this.alert('Celular invalido!')
        return false;
      }
    }

    if(this.dadosCadastro.senha.length < 8){
      this.alert('As senha tem que ter 8 caracteres ou mais')
      return false;
    }
    if(this.dadosCadastro.senha != this.dadosCadastro.passwordConfirm){
      this.alert('As senhas não correspondem!')
      return false;
    }
    console.log('foi',this.dadosCadastro);
    this.remote.insert(this.url, this.dadosCadastro).then((res: any) =>{
      if(res.auth == true){
        this.alert(res.message);
        this.router.navigate([''])
      }else{
        this.alert(res.message);
      }
      
    });


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
