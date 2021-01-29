import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastraSalgadoComponent } from './cadastra-salgado/cadastra-salgado.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { ConfiguracoesComponent } from './configuracoes/configuracoes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListarSalgadoComponent } from './listar-salgado/listar-salgado.component';
import { LoginComponent } from './login/login.component'
import { PedidosComponent } from './pedidos/pedidos.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'cadastro',
    component: CadastroComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'pedidos',
    component: PedidosComponent
  },
  {
    path: 'configuracoes',
    component: ConfiguracoesComponent
  },
  {
    path: 'cadastra-salgado',
    component: CadastraSalgadoComponent
  },
  {
    path: 'listar-salgado',
    component: ListarSalgadoComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
