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

  displayedColumns: string[] = ['Nome', 'tamanho', 'tipo', 'preco', 'editar', 'excluir'];
  dataSource;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private remote: RemoteService) { }

  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 600) ? 1 : 1;
  }

  ngOnInit(): void {
    this.breakpoint = (window.innerWidth <= 600) ? 1 : 1;

    let url = 'http://localhost:5000/api/v1/salgado/listarSalgado';
    this.remote.acessor(url, '').then((res: any) =>{
      console.log('resposta', res);
      if(res.auth == true &&  res.resp){   
        this.dataSource = new MatTableDataSource(res.resp);
        this.dataSource.paginator = this.paginator;
      }
    })
  }
}

