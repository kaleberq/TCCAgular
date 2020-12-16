import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { RemoteService } from 'src/providers/remote.service';
import { Usuario } from '../../Classes/Usuario';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  public dadosLogin= {
    email: 'kalebemisael@gmail.com',
    senha: 'porcoaranha132'
  }
  public url = 'http://localhost:5000/api/v1/user/login';
  constructor(private router: Router, private remote: RemoteService) { 
    
  }

  ngOnInit(): void {
    if(Usuario.TOKEN){
      this.router.navigate(['/dashboard']);
    }
  }
  validarLogin(){
    //console.log('this.dadosLogin',this.dadosLogin);
    
    if(this.dadosLogin.email == ''){
      this.alert('O campo email não pode estar vazio!');
      return false;
    }else if(this.dadosLogin.senha == ''){
      this.alert('O campo senha não pode estar vazio!');
      return false;
    }  
    let usuario = this.dadosLogin.email.substring(0, this.dadosLogin.email.indexOf("@"));
    let dominio = this.dadosLogin.email.substring(this.dadosLogin.email.indexOf("@")+ 1, this.dadosLogin.email.length);
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


        //chamo o metodo aqui
        this.remote.insert(this.url, this.dadosLogin).then((res: any) =>{
          if(res.auth == true){
            localStorage.setItem ('token', res.token);
            localStorage.setItem ('email', this.dadosLogin.email);
            localStorage.setItem ('tipo', res.tipo);
            this.router.navigate(['/dashboard'])
          }else{
            this.alert(res.message);
          }
          
        });
    }
    else{
      this.alert('Email invalido!',)
    }
  }
  alert(text){
    Swal.fire({
      title: 'Erro ao fazer o login',
      width: 400,
      text: text,
      /* icon: 'warning', */
      /* showCancelButton: true, */
      confirmButtonText: 'Tentar novamente',
      /* cancelButtonText: 'No, let me think' */
    })
  }
  routeCreateUser(){
    this.router.navigate(['/cadastro'])
  }


}
