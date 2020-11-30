import { Component, OnInit } from '@angular/core';
import { RemoteService } from 'src/providers/remote.service';
import { Usuario } from '../../Classes/Usuario';

@Component({
  selector: 'app-configuracoes',
  templateUrl: './configuracoes.component.html',
  styleUrls: ['./configuracoes.component.scss']
})
export class ConfiguracoesComponent implements OnInit {
  public url = 'http://localhost:5000/api/v1/user/buscarDadosUsuario';
  breakpoint: number;
  dadosCadastro = {
    email: Usuario.EMAIL
  }

  constructor(private remote: RemoteService) { 
    this.remote.buscar(this.url, this.dadosCadastro).then((res: any) =>{
      if(res.auth == true){
        console.log('retorno', res);
        
      }else{
        console.log('erro');
        
      }
      
    });
  }


  ngOnInit() {
    this.breakpoint = (window.innerWidth <= 600) ? 1 : 2;
  }
  
  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 600) ? 1 : 2;
  }
}
