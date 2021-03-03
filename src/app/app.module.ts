import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CadastroComponent } from './cadastro/cadastro.component';
import { MatCardModule } from '@angular/material/card';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ShowHidePasswordModule } from 'ngx-show-hide-password';
import { FormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { NgxMaskModule, IConfig } from 'ngx-mask'
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfiguracoesComponent } from './configuracoes/configuracoes.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatMenuModule } from '@angular/material/menu';

import { CommonModule } from '@angular/common';
import { CadastraSalgadoComponent } from './cadastra-salgado/cadastra-salgado.component'; 
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
import { ListarSalgadoComponent } from './listar-salgado/listar-salgado.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ListaSalgadoClienteComponent } from './lista-salgado-cliente/lista-salgado-cliente.component';
import { MatListModule } from '@angular/material/list';
import { MeusPedidosComponent } from './meus-pedidos/meus-pedidos.component';
import { NovosPedidosComponent } from './novos-pedidos/novos-pedidos.component';
import { PedidosParaFazerComponent } from './pedidos-para-fazer/pedidos-para-fazer.component';
import { PedidosFinalizadosComponent } from './pedidos-finalizados/pedidos-finalizados.component';
import { PedidosAprovadosClienteComponent } from './pedidos-aprovados-cliente/pedidos-aprovados-cliente.component';
import { PedidosFinalizadosClienteComponent } from './pedidos-finalizados-cliente/pedidos-finalizados-cliente.component';
import { RelatorioVendasMensalComponent } from './relatorio-vendas-mensal/relatorio-vendas-mensal.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CadastroComponent,
    DashboardComponent,
    ConfiguracoesComponent,
    CadastraSalgadoComponent,
    ListarSalgadoComponent,
    ListaSalgadoClienteComponent,
    MeusPedidosComponent,
    NovosPedidosComponent,
    PedidosParaFazerComponent,
    PedidosFinalizadosComponent,
    PedidosAprovadosClienteComponent,
    PedidosFinalizadosClienteComponent,
    RelatorioVendasMensalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatIconModule,
    ShowHidePasswordModule,
    FormsModule,
    MatGridListModule,
    NgxMaskModule.forRoot(),
    HttpClientModule,
    MatExpansionModule,
    CommonModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatMenuModule,
    SocialLoginModule,
    MatTableModule,
    MatPaginatorModule,
    MatListModule
  ],
  providers: [ 
    {
      provide: ErrorStateMatcher,
      useClass: ShowOnDirtyErrorStateMatcher,
    },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '1098782377685-3k0h8i8n34pct3hpf11ecb6i309a77q8.apps.googleusercontent.com'
            )
          }
        ]
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
