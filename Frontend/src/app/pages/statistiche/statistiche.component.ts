import { Component, ViewChild } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartOptions, ChartConfiguration } from 'chart.js';
import {
  EventStats,
  StatisticsService,
} from '../../services/statistics.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-statistiche',
  standalone: false,
  templateUrl: './statistiche.component.html',
  styleUrl: './statistiche.component.scss',
})
export class StatisticheComponent {
  events: EventStats[] = [];
  fromDate = '';
  toDate = '';
  isLoading = false;

  displayedColumns: string[] = [
    'title',
    'date',
    'totalCheckins',
    'participationRate',
  ];

  // Chart.js
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
  public barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
    },
  };
  public barChartLabels: string[] = [];
  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [
      { data: [], label: 'Check-in Effettuati' },
      { data: [], label: '% Partecipazione' },
    ],
  };

  constructor(
    private statisticsService: StatisticsService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.loadStats();
  }

  loadStats() {
    this.isLoading = true;
    const from = this.fromDate || undefined;
    const to = this.toDate || undefined;

    this.statisticsService.getEventStatistics(from, to).subscribe({
      next: (data) => {
        this.events = data;
        this.updateChart(data);
        this.isLoading = false;
        if (!data.length) {
          this.notificationService.warningMessage(
            'Nessun evento trovato nel periodo selezionato.'
          );
        }
      },
      error: () => {
        this.isLoading = false;
        this.notificationService.errorMessage(
          'Errore nel caricamento delle statistiche.'
        );
      },
    });
  }

  onFilterApply() {
    if (this.fromDate && this.toDate && this.fromDate > this.toDate) {
      this.notificationService.warningMessage(
        'La data "dal" deve precedere la data "al".'
      );
      return;
    }
    this.loadStats();
  }

  private updateChart(data: EventStats[]) {
    this.barChartData.labels = data.map((e) => e.title);
    this.barChartData.datasets[0].data = data.map((e) => e.totalCheckins);
    this.barChartData.datasets[1].data = data.map((e) => e.participationRate);
    this.chart?.update();
  }
}
