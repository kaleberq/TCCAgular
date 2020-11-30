import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RemoteService {

  public httpOptions = {
    headers: new HttpHeaders({ 
      'Access-Control-Allow-Origin':'*',
    })
  };

  constructor(private httpClient: HttpClient) { 
    

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
  async buscar(url, body){
    let httpOptions = {
      headers: new HttpHeaders({ 
        'Access-Control-Allow-Origin':'*',
        'x-access-token': localStorage.getItem('token')
      })
    };
    /* const res = await this.httpClient.get(url, body, httpOptions).toPromise();
    return res; */
  }

}
