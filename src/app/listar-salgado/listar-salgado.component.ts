import { Component, OnInit, ViewChild } from '@angular/core';
import { RemoteService } from 'src/providers/remote.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';


@Component({
  selector: 'app-listar-salgado',
  templateUrl: './listar-salgado.component.html',
  styleUrls: ['./listar-salgado.component.scss']
})

export class ListarSalgadoComponent implements OnInit {

  breakpoint: number;
  listaSalgados = [];

  displayedColumns: string[] = ['Nome', 'Sabor', 'Tamanho', 'Tipo', 'Preço', 'Disponibilidade','Editar', 'Excluir'];
  dataSource;
  message;
  abrirForm = 0;

  public dadosSalgadoform = {
    id: '',
    nome: '',
    sabor: '',
    tamanho: '',
    tipo: '',
    preco: '',
    disponibilidade: ''
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private remote: RemoteService) { }

  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 600) ? 1 : 1;
  }

  ngOnInit(): void {
    this.breakpoint = (window.innerWidth <= 600) ? 1 : 1;
    this.buscaSalgados();
  }
  buscaSalgados(){
    let url = 'http://localhost:5000/api/v1/salgado/listarSalgado';
    this.remote.acessor(url, '').then((res: any) =>{
      console.log('resposta', res);
      if(res.auth == true &&  res.resp && !res.message){   
        this.dataSource = new MatTableDataSource(res.resp);
        this.dataSource.paginator = this.paginator;
      }else{
        this.message = res.message;
      }
    })
  }
  abrirFormEditarSalgado(id){
    let salgado = {
      id: id,
    };
    let url = 'http://localhost:5000/api/v1/salgado/buscarSalgado';
    this.remote.acessor(url, salgado).then(async (res: any) =>{
      let dados = res.resp;
      if(res.resp){
        this.dadosSalgadoform.id      = await dados.id;
        this.dadosSalgadoform.nome    = await dados.nome;
        this.dadosSalgadoform.sabor   = await dados.sabor;
        this.dadosSalgadoform.tipo    = await dados.tipo.toString();
        this.dadosSalgadoform.preco   = await dados.preco;
        this.dadosSalgadoform.tamanho = await dados.tamanho.toString();
        this.dadosSalgadoform.disponibilidade = await dados.disponibilidade.toString();

        this.abrirForm = 1;
      }
    })
  }
  editarSalgado(){
    let url = 'http://localhost:5000/api/v1/salgado/editarSalgado';
    this.remote.acessor(url, this.dadosSalgadoform).then( async (res: any) =>{
      if(res.auth == true){
         this.alert(res.message);
         this.buscaSalgados();
      }else{
        this.alert(res.message);
      }
      this.abrirForm = 0;
      this.dadosSalgadoform.id      = '';
      this.dadosSalgadoform.nome    = '';
      this.dadosSalgadoform.sabor   = '';
      this.dadosSalgadoform.tipo    = '';
      this.dadosSalgadoform.preco   = '';
      this.dadosSalgadoform.tamanho = '';
      this.dadosSalgadoform.disponibilidade = '';
    });
  }
  excluirSalgado(id){
    let salgado = {
      id: id,
    };
    Swal.fire({
      /* title: text, */
      width: 400,
      text: 'Deseja realmente excluir este salgado?',
      /* icon: 'warning', */
      showCancelButton: true,
      confirmButtonText: 'sim',
      cancelButtonText: 'não'
    }).then((result) => {  
      if (result.value) {  
        let url = 'http://localhost:5000/api/v1/salgado/excluirSalgado';
        this.remote.acessor(url, salgado).then(async (res: any) =>{
          if(res.auth == true){   
            this.alert(res.message);
            this.buscaSalgados();
          }
        })
      }  
    })
  }
  alert(text){
    Swal.fire({
      /* title: text, */
      width: 400,
      text: text,
      /* icon: 'warning', */
      /* showCancelButton: true, */
      confirmButtonText: 'ok',
      /* cancelButtonText: 'No, let me think' */
    })
  }
}

