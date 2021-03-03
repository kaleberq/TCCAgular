import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RemoteService } from 'src/providers/remote.service';
import { Usuario } from '../../Classes/Usuario';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public usuario = Usuario;
  breakpoint: number;
  public novosPedidos = 0;
  public pedidosAceitos = 0;
  public pedidosFinalizados = 0;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private remote: RemoteService) { 
    if(! localStorage.getItem('email')){
      this.activatedRoute.queryParams.subscribe(params => {
        let date = params;
        console.log('dsffdssd',date); // Print the parameter to the console. 
    });
      
    }
    Usuario.TOKEN = localStorage.getItem('token');
    Usuario.EMAIL = localStorage.getItem('email');
    Usuario.TIPO = localStorage.getItem('tipo');
    console.log('usuario tipo', Usuario.TIPO);
    
  }
  async ngOnInit() {
    this.breakpoint = (window.innerWidth <= 600) ? 1 : 4;
    if(Usuario.TIPO == 1){
      let obj = {
        encomendaAndamento: 0
      }
      let url = Usuario.URL+'encomendaInformacao/buscarEncomendaInformacaoSituacao';
      await this.remote.acessor(url, obj).then(async (res: any) =>{
        if(res.auth == true){   
          this.novosPedidos = res.resp.length;
        }
      })
      let obj2 = {
        encomendaAndamento: 1,
      }
      await this.remote.acessor(url, obj2).then(async (res: any) =>{
        if(res.auth == true){   
          this.pedidosAceitos = res.resp.length;
        }
      })
      let obj3 = {
        encomendaAndamento: 3,
      }
      await this.remote.acessor(url, obj3).then(async (res: any) =>{
        console.log('res', res);
        
        if(res.auth == true){   
          this.pedidosFinalizados = res.resp.length;
        }
      })
    }else{
      let obj = {
        encomendaAndamento: 0,
        email: Usuario.EMAIL
      }
      let url = Usuario.URL+'encomendaInformacao/buscarEncomendaInformacaoSituacao';
      await this.remote.acessor(url, obj).then(async (res: any) =>{
        if(res.auth == true){   
          this.novosPedidos = res.resp.length;
        }
      })
      let obj2 = {
        encomendaAndamento: 1,
        email: Usuario.EMAIL
      }
      await this.remote.acessor(url, obj2).then(async (res: any) =>{
        if(res.auth == true){   
          this.pedidosAceitos = res.resp.length;
        }
      })
      let obj3 = {
        encomendaAndamento: 3,
        email: Usuario.EMAIL
      }
      await this.remote.acessor(url, obj3).then(async (res: any) =>{
        console.log('res', res);
        
        if(res.auth == true){   
          this.pedidosFinalizados = res.resp.length;
        }
      })
    }
  }
  
  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 600) ? 1 : 4;
  }
  ngOnDestroy() {

    
  }
  pagina(pagina){
    this.router.navigate(['/'+pagina]);
  }

}
