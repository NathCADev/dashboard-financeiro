import { Component } from '@angular/core'; 
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatOptionModule } from '@angular/material/core'; 
import { NgChartsModule } from 'ng2-charts';
import { Chart, PieController, ArcElement, Tooltip, Legend } from 'chart.js';
import type { ChartOptions } from 'chart.js';

Chart.register(PieController, ArcElement, Tooltip, Legend); 

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    FormsModule,         
    CommonModule,
    NgChartsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCardModule,
    MatTableModule,
    MatOptionModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent {

  filtroMes: string = ''; 
  filtroCategoria = '';
  filtroTipo = '';
  
  meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril'];
  categorias = ['Alimentação', 'Transporte', 'Lazer'];

  lancamentos = [
    // Rendimentos
    { data: new Date('2025-01-15'), descricao: 'Salário', categoria: 'Renda', tipo: 'rendimento', valor: 1700 },
    { data: new Date('2025-02-15'), descricao: 'Salário', categoria: 'Renda', tipo: 'rendimento', valor: 1700 },
    { data: new Date('2025-03-15'), descricao: 'Salário', categoria: 'Renda', tipo: 'rendimento', valor: 1700 },
    { data: new Date('2025-04-15'), descricao: 'Salário', categoria: 'Renda', tipo: 'rendimento', valor: 1700 },
  
    // Despesas
    { data: new Date('2025-01-10'), descricao: 'Supermercado', categoria: 'Alimentação', tipo: 'despesa', valor: 600 },
    { data: new Date('2025-02-10'), descricao: 'Supermercado', categoria: 'Alimentação', tipo: 'despesa', valor: 670 },
    { data: new Date('2025-03-10'), descricao: 'Supermercado', categoria: 'Alimentação', tipo: 'despesa', valor: 520 },
    { data: new Date('2025-04-10'), descricao: 'Supermercado', categoria: 'Alimentação', tipo: 'despesa', valor: 668 },
  
    { data: new Date('2025-01-25'), descricao: 'Uber', categoria: 'Transporte', tipo: 'despesa', valor: 150 },
    { data: new Date('2025-02-25'), descricao: 'Uber', categoria: 'Transporte', tipo: 'despesa', valor: 220 },
    { data: new Date('2025-03-25'), descricao: 'Uber', categoria: 'Transporte', tipo: 'despesa', valor: 180 },
    { data: new Date('2025-04-25'), descricao: 'Uber', categoria: 'Transporte', tipo: 'despesa', valor: 210 },
  
    { data: new Date('2025-01-30'), descricao: 'Lazer', categoria: 'Lazer', tipo: 'despesa', valor: 200 },
    { data: new Date('2025-02-28'), descricao: 'Lazer', categoria: 'Lazer', tipo: 'despesa', valor: 250 },
    { data: new Date('2025-03-30'), descricao: 'Lazer', categoria: 'Lazer', tipo: 'despesa', valor: 180 },
    { data: new Date('2025-04-30'), descricao: 'Lazer', categoria: 'Lazer', tipo: 'despesa', valor: 200 },
  
    { data: new Date('2025-04-10'), descricao: 'Aluguel', categoria: 'Moradia', tipo: 'despesa', valor: 900 },
  ];

  lancamentosFiltrados = [...this.lancamentos];

  chartData = {
    labels: ['Rendimentos', 'Despesas'],
    datasets: [{ data: [0, 0], backgroundColor: ['#66bb6a', '#ef5350'] }] 
  };

  chartOptions: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right'
      }
    }
  };

  totalRendimentos: number = 0;
  totalDespesas: number = 0;
  saldo: number = 0;

  ngOnInit() {
    this.filtrarLancamentos();
  }

  filtrarLancamentos() {
    this.lancamentosFiltrados = this.lancamentos.filter(item => {
      const mesItem = item.data.getMonth(); 
      const mesSelecionado = this.meses.indexOf(this.filtroMes); 
  
      const filtroMesValido = this.filtroMes ? mesItem === mesSelecionado : true;
  
      const filtroCategoriaValido = this.filtroCategoria ? item.categoria === this.filtroCategoria : true;
  
      const filtroTipoValido = this.filtroTipo ? item.tipo === this.filtroTipo : true;
  
      return filtroMesValido && filtroCategoriaValido && filtroTipoValido;
    }).sort((a, b) => a.data.getTime() - b.data.getTime()); 

    const totalRendimentos = this.lancamentosFiltrados.filter(item => item.tipo === 'rendimento').reduce((acc, curr) => acc + curr.valor, 0);
    
    const totalDespesas = this.lancamentosFiltrados.filter(item => item.tipo === 'despesa').reduce((acc, curr) => acc + curr.valor, 0);

    this.chartData = {
      labels: ['Rendimentos', 'Despesas'],
      datasets: [{ data: [totalRendimentos, totalDespesas], backgroundColor: ['#66bb6a', '#ef5350'] }]
    };

    this.totalRendimentos = totalRendimentos;
    this.totalDespesas = totalDespesas;
    
    this.saldo = this.totalRendimentos - this.totalDespesas;
  }
}

