import colorLib from '@kurkle/color';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom, map } from 'rxjs';

interface ChartOptions {
  height?: number;
  width?: number;
}

interface NumbersConfig {
  min?: number;
  max?: number;
  count?: number;
  from?: number;
  decimals?: number;
  continuity?: number;
}

interface MonthsConfig {
  count?: number;
  section?: number;
}

@Injectable()
export class ChartUtils {
  private _seed = Date.now();
  CHART_COLORS = [
    '#4dc9f6',
    '#f67019',
    '#f53794',
    '#537bc4',
    '#acc236',
    '#166a8f',
    '#00a950',
    '#727478',
    '#9756cf',
  ];

  NAMED_COLORS = {
    red: 'rgb(255, 99, 132)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    blue: 'rgb(54, 162, 235)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(201, 203, 207)',
  };

  MONTHS = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ];

  constructor(private readonly httpService: HttpService) {}

  srand(seed: any) {
    this._seed = seed;
  }

  rand(min: number = 0, max: number = 0) {
    this._seed = (this._seed * 9301 + 49297) % 233280;
    return min + (this._seed / 233280) * (max - min);
  }

  transparentize(value: string, opacity: number) {
    const alpha = opacity === undefined ? 0.5 : 1 - opacity;
    return colorLib(value).alpha(alpha).rgbString();
  }

  async chartJsToImage(chartConfig: unknown, options: ChartOptions = {}) {
    const params = new URLSearchParams();

    if (options?.height) params.append('height', options.height.toString());
    if (options?.width) params.append('width', options.width.toString());

    const encodedUri = encodeURIComponent(JSON.stringify(chartConfig));

    const chartUrl = lastValueFrom(
      this.httpService
        .get(`https://quickchart.io/chart?c=${encodedUri}`, {
          responseType: 'arraybuffer',
        })
        .pipe(
          map(
            (response) =>
              `data:image/png;base64,${Buffer.from(response.data, 'binary').toString('base64')}`,
          ),
        ),
    );

    return chartUrl;
  }

  numbers(config: NumbersConfig = {}) {
    const cfg = config || {};
    const min = cfg.min ?? 0;
    const max = cfg.max ?? 100;
    const from = cfg.from ?? [];
    const count = cfg.count ?? 8;
    const decimals = cfg.decimals ?? 8;
    const continuity = cfg.continuity ?? 1;
    const dfactor = Math.pow(10, decimals) || 0;
    const data = [];
    let i: number, value: number;

    for (i = 0; i < count; ++i) {
      value = (from[i] || 0) + this.rand(min, max);
      if (this.rand() <= continuity) {
        data.push(Math.round(dfactor * value) / dfactor);
      } else {
        data.push(null);
      }
    }

    return data;
  }

  months(config: MonthsConfig = {}) {
    const cfg = config ?? {};
    const count = cfg.count ?? 12;
    const section = cfg.section;
    const values = [];
    let i: number, value: string;

    for (i = 0; i < count; ++i) {
      value = this.MONTHS[Math.ceil(i) % 12];
      values.push(value.substring(0, section));
    }

    return values;
  }
}
