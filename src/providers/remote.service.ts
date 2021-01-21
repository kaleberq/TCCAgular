import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../Classes/Usuario';

@Injectable({
  providedIn: 'root'
})
export class RemoteService {

  public httpOptions = {
    headers: new HttpHeaders({ 
      'Access-Control-Allow-Origin':'*',
    })
  };

  constructor(private httpClient: HttpClient, private router: Router,) { 
    

  }
  requisicao(url){
    this.httpClient.get(url, this.httpOptions).subscribe(resp => {
      console.log('resp',resp);
  
    });
  }
  async insert(url, body){
    const res = await this.httpClient.post(url, body, this.httpOptions).toPromise();
    return res;
  }
  async acessor(url, body){
    let httpOptions = {
      headers: new HttpHeaders({ 
        'Access-Control-Allow-Origin':'*',
        'x-access-token': localStorage.getItem('token')
      })
    };
/*     const res = await this.httpClient.post(url, body, httpOptions).toPromise();
    console.log('resposta servidor', res);
    
    return res; */
     let resposta: any;
     await this.httpClient.post(url, body, httpOptions).toPromise().then((resp) => {    
      resposta = resp;
     }).catch((err)=>{
      console.log('erro', err.status);
      if(err.status == 401){
        Usuario.TOKEN = '';
        Usuario.EMAIL = ''
        localStorage.clear();
        this.router.navigate(['']);
        resposta = {
          auth: false
        }
      }
     }); 
     return resposta;
  }
  async buscaCep(url){
     let resposta: any;
     await this.httpClient.get(url).toPromise().then((resp) => {    
      resposta = resp;
     }).catch((err)=>{
     }); 
     return resposta;
  }
  async loginAuth(url){
    let resposta: any;
    await this.httpClient.get(url).toPromise().then((resp) => {    
     resposta = resp;
    }).catch((err)=>{
    }); 
    return resposta;
 }
}
