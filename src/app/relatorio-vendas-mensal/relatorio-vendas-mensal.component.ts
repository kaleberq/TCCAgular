import { Component, OnInit } from '@angular/core';
import { Chart } from 'node_modules/chart.js'
import { Usuario } from 'src/Classes/Usuario';
import { RemoteService } from 'src/providers/remote.service';

@Component({
  selector: 'app-relatorio-vendas-mensal',
  templateUrl: './relatorio-vendas-mensal.component.html',
  styleUrls: ['./relatorio-vendas-mensal.component.scss']
})
export class RelatorioVendasMensalComponent implements OnInit {

  constructor(private remote: RemoteService) { }

  public respostaData = {
    aceitas: '',
    recusadas: '',
    feitas: '',
    entregues: '',
    totalVendidos: ''
  };

  async ngOnInit(){
    const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
      "Julho", "Augosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];

    const d = new Date();

    let obj = {
      mes: d.getMonth()+1,
      ano: d.getFullYear()
    }
    let url = Usuario.URL+'encomendaInformacao/buscarEncomendaInformacaoRelatorio';

    await this.remote.acessor(url, obj).then((res: any) =>{
      if(res.auth == true &&  res.resp && !res.message){  
        this.respostaData.aceitas = res.resp.aceitas.quantidadeEncomendasAceitas;
        this.respostaData.recusadas = res.resp.recusadas.quantidadeEncomendasRecusadas;
        this.respostaData.feitas = res.resp.feitas.quantidadeEncomendasFeitas;
        this.respostaData.entregues = res.resp.entregues.quantidadeEncomendasEntregues;
        this.respostaData.totalVendidos = res.resp.totalSalgadosVendidos;
        console.log(res.resp);
        
      }else{
        
      }
    })

    var myChart = new Chart("myChart", {
      type: 'bar',
      data: {
        labels: ['Aceitas', 'Recusadas', 'Feitas', 'Entregues', 'Total salgados vendidos'],
        datasets: [{
          label: 'Grafico de encomendas do mês de ' +  monthNames[d.getMonth()],
          data: [this.respostaData.aceitas, this.respostaData.recusadas, this.respostaData.feitas, this.respostaData.entregues, this.respostaData.totalVendidos],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }
}
