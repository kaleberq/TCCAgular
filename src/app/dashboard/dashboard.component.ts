import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../../Classes/Usuario';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router) { 
    Usuario.TOKEN = localStorage.getItem('token');
    Usuario.EMAIL = localStorage.getItem('email');
  }

  ngOnInit(): void {

  }
  ngOnDestroy() {

    
  }
  pagina(){
    this.router.navigate(['/pedidos']);
  }

}
