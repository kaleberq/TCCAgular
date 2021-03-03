import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastraSalgadoComponent } from './cadastra-salgado/cadastra-salgado.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { ConfiguracoesComponent } from './configuracoes/configuracoes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListaSalgadoClienteComponent } from './lista-salgado-cliente/lista-salgado-cliente.component';
import { ListarSalgadoComponent } from './listar-salgado/listar-salgado.component';
import { LoginComponent } from './login/login.component'
import { MeusPedidosComponent } from './meus-pedidos/meus-pedidos.component';
import { NovosPedidosComponent } from './novos-pedidos/novos-pedidos.component';
import { PedidosAprovadosClienteComponent } from './pedidos-aprovados-cliente/pedidos-aprovados-cliente.component';
import { PedidosFinalizadosClienteComponent } from './pedidos-finalizados-cliente/pedidos-finalizados-cliente.component';
import { PedidosFinalizadosComponent } from './pedidos-finalizados/pedidos-finalizados.component';
import { PedidosParaFazerComponent } from './pedidos-para-fazer/pedidos-para-fazer.component';
import { RelatorioVendasMensalComponent } from './relatorio-vendas-mensal/relatorio-vendas-mensal.component';

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
  {
    path: 'lista-salgado-cliente',
    component: ListaSalgadoClienteComponent
  },
  {
    path: 'meus-pedidos',
    component: MeusPedidosComponent
  },
  {
    path: 'novos-pedidos',
    component: NovosPedidosComponent
  },
  {
    path: 'pedidos-para-fazer',
    component: PedidosParaFazerComponent
  },
  {
    path: 'pedidos-finalizados',
    component: PedidosFinalizadosComponent
  },
  {
    path: 'pedidos-aprovados-cliente',
    component: PedidosAprovadosClienteComponent
  },
  {
    path: 'pedidos-finalizados-cliente',
    component: PedidosFinalizadosClienteComponent
  },
  {
    path: 'relatorio-vendas-mensal',
    component: RelatorioVendasMensalComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
