import { Injectable } from '@nestjs/common';
import { ChartUtils } from './chart-utils';

type PointStylingChartOptions = {
  labels: string[];
  datasets: {
    label: string;
    value: number[];
  };
  pointStyle?:
    | 'circle'
    | 'cross'
    | 'crossRot'
    | 'dash'
    | 'line'
    | 'rect'
    | 'rectRounded'
    | 'rectRot'
    | 'star'
    | 'triangle';
};

@Injectable()
export class PointStylingChart {
  constructor(private readonly chartUtil: ChartUtils) {}

  async getPointStylingChart(options: PointStylingChartOptions) {
    const { labels, datasets, pointStyle = 'dash' } = options;

    const data = {
      labels: labels,
      datasets: [
        {
          label: datasets.label,
          data: datasets.value,
          borderColor: this.chartUtil.NAMED_COLORS.purple,
          backgroundColor: this.chartUtil.transparentize(
            this.chartUtil.NAMED_COLORS.purple,
            0.5,
          ),
          pointStyle,
          pointRadius: 10,
          pointHoverRadius: 15,
        },
      ],
    };

    const configChart = {
      type: 'line',
      data: data,
    };

    return await this.chartUtil.chartJsToImage(configChart);
  }
}
