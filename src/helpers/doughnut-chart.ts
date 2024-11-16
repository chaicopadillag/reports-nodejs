import { Injectable } from '@nestjs/common';
import { ChartUtils } from './chart-utils';

type DoughnutChartOptions = {
  labels: string[];
  datasets: {
    label: string;
    value: number[];
  };
  legendPosition?: 'top' | 'left' | 'bottom' | 'right';
};

@Injectable()
export class DoughnutChart {
  constructor(private readonly chartUtil: ChartUtils) {}

  async getDoughnutChart(options: DoughnutChartOptions) {
    const { labels, datasets, legendPosition = 'top' } = options;

    const data = {
      labels: labels,
      datasets: [
        {
          label: datasets.label,
          data: datasets.value,
          backgroundColor: this.chartUtil.CHART_COLORS,
        },
      ],
    };

    const configChart = {
      type: 'doughnut',
      data: data,
      options: {
        legend: {
          position: legendPosition,
        },
        plugins: {
          datalabels: {
            color: 'white',
            font: {
              weight: 'bold',
              size: 16,
            },
          },
        },
      },
    };

    return await this.chartUtil.chartJsToImage(configChart);
  }
}
