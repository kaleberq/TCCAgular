import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../Classes/Usuario';
import { RemoteService } from 'src/providers/remote.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pastelaria';
  usuario = Usuario;
  constructor(private router: Router, private remote: RemoteService){
    Usuario.TOKEN = localStorage.getItem('token');
    Usuario.EMAIL = localStorage.getItem('email');
  }
  ngOnInit(){
    //this.router.navigate(['/login']);
  }
  sair(){
    let url = 'http://localhost:5000/api/v1/user/logout';
    let dadosLogout = {
      blackList: Usuario.TOKEN,
      email: Usuario.EMAIL
    }
    //chamo o metodo aqui
    this.remote.insert(url, dadosLogout).then((res: any) =>{
      if(res.auth == true){
        Usuario.TOKEN = '';
        Usuario.EMAIL = ''
        localStorage.clear();
        this.router.navigate(['']);
      }
      console.log('resposta',res);
    });
    
    
  }
  configuracoes(){
    this.router.navigate(['/configuracoes']);
  }
  paginaCadastro(){
    this.router.navigate(['/cadastro']);
  }
}
