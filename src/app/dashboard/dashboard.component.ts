import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from '../../Classes/Usuario';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public usuario = Usuario;
  breakpoint: number;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) { 
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
  ngOnInit() {
    this.breakpoint = (window.innerWidth <= 600) ? 1 : 4;
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
