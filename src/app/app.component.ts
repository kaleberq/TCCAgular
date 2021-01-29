import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../Classes/Usuario';
import { RemoteService } from 'src/providers/remote.service';
import { SocialAuthService } from 'angularx-social-login';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title = 'pastelaria';
  public usuario = Usuario;
  public menu;

  constructor(private router: Router, private remote: RemoteService,
    private authService: SocialAuthService){
    Usuario.TOKEN = localStorage.getItem('token');
    Usuario.EMAIL = localStorage.getItem('email');
    Usuario.TIPO = localStorage.getItem('tipo');
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
        this.signOut();
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
  signOut(): void {
    this.authService.signOut();
  }
}
