import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../../Classes/Usuario';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public usuario = Usuario;
  breakpoint: number;

  constructor(private router: Router) { 
    Usuario.TOKEN = localStorage.getItem('token');
    Usuario.EMAIL = localStorage.getItem('email');
    Usuario.TIPO = localStorage.getItem('tipo');
    console.log('usuario tipo', Usuario.TIPO);
    
  }
  ngOnInit() {
    this.breakpoint = (window.innerWidth <= 600) ? 1 : 4;
  }
  
  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 600) ? 1 : 4;
  }
  ngOnDestroy() {

    
  }
  pagina(){
    this.router.navigate(['/pedidos']);
  }

}
