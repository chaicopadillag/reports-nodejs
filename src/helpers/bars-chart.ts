import { Injectable } from '@nestjs/common';
import { ChartUtils } from './chart-utils';

@Injectable()
export class BarsChart {
  constructor(private readonly chartUtil: ChartUtils) {}

  async getBarsChart() {
    const DATA_COUNT = 7;
    const NUMBER_CFG = { count: DATA_COUNT, min: -100, max: 100 };

    const labels = this.chartUtil.months({ count: 7 });
    const data = {
      labels: labels,
      datasets: [
        {
          label: 'Fully Rounded',
          data: this.chartUtil.numbers(NUMBER_CFG),
          borderColor: this.chartUtil.NAMED_COLORS.red,
          backgroundColor: this.chartUtil.transparentize(
            this.chartUtil.NAMED_COLORS.red,
            0.5,
          ),
          borderWidth: 2,
          borderRadius: Number.MAX_VALUE,
          borderSkipped: false,
        },
        {
          label: 'Small Radius',
          data: this.chartUtil.numbers(NUMBER_CFG),
          borderColor: this.chartUtil.NAMED_COLORS.blue,
          backgroundColor: this.chartUtil.transparentize(
            this.chartUtil.NAMED_COLORS.blue,
            0.5,
          ),
          borderWidth: 2,
          borderRadius: 5,
          borderSkipped: false,
        },
      ],
    };

    const configChart = {
      type: 'bar',
      data: data,
    };

    return await this.chartUtil.chartJsToImage(configChart);
  }
}
