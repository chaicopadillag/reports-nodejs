import { Injectable } from '@nestjs/common';
import type { TDocumentDefinitions } from 'pdfmake/interfaces';
import {
  BarsChart,
  ChartUtils,
  DoughnutChart,
  PieChart,
  PointStylingChart,
} from '../helpers';
import { footerSection, getHeaderSection } from './sections';

type TopCountry = {
  _count: Count;
  country: string;
};

type Count = {
  country: number;
};

@Injectable()
export class StadisticsReport {
  constructor(
    private readonly doughnutChart: DoughnutChart,
    private readonly pointStylingChart: PointStylingChart,
    private readonly chartUtil: ChartUtils,
    private readonly barsChart: BarsChart,
    private readonly pieChart: PieChart,
  ) {}

  async getStadisticsReport(topCountries: TopCountry[]) {
    const [
      imageChart,
      imagePointStylingChart,
      pieChart,
      barsChart1,
      barsChart2,
    ] = await Promise.all([
      this.generateDoughnutChart(topCountries),
      this.generatePointStylingChart(topCountries),
      this.generatePieChart(topCountries),
      this.barsChart.getBarsChart(),
      this.barsChart.getBarsChart(),
    ]);

    const docDefinitions: TDocumentDefinitions = {
      header: getHeaderSection({
        title: 'Stadistics Report',
        subtitle: 'Charts Graphics Reports',
      }),
      footer: footerSection,
      pageSize: 'A4',
      pageMargins: [20, 70, 20, 20],
      content: [
        {
          columnGap: 25,
          columns: [
            {
              stack: [
                {
                  text: '10 Paises con más Clientes',
                  alignment: 'center',
                  margin: [0, 0, 0, 10],
                },
                {
                  image: imageChart,
                  width: 350,
                },
              ],
            },
            {
              margin: [0, 20, 0, 0],
              layout: 'lightHorizontalLines',
              width: 400,
              table: {
                headerRows: 1,
                widths: [100, 'auto'],
                body: [
                  ['Pais', 'Clientes'],
                  ...topCountries.map((c) => [
                    c.country,
                    {
                      text: c._count.country,
                      alignment: 'right',
                      bold: true,
                    },
                  ]),
                ],
              },
            },
          ],
        },
        {
          text: 'Point Styling Chart',
          alignment: 'center',
          margin: [0, 40, 0, 10],
        },
        {
          image: imagePointStylingChart,
          width: 550,
        },
        {
          text: 'Bars Chart',
          alignment: 'center',
          margin: [0, 40, 0, 10],
        },
        {
          columnGap: 10,
          columns: [
            {
              image: barsChart1,
              width: 270,
            },
            {
              image: barsChart2,
              width: 270,
            },
          ],
        },
        {
          text: 'Pie Chart',
          alignment: 'center',
          margin: [0, 40, 0, 10],
        },
        {
          image: pieChart,
          width: 550,
        },
      ],
    };

    return docDefinitions;
  }

  async generatePointStylingChart(topCountries: TopCountry[]) {
    // only warning editor
    if (topCountries.length === 0) {
      console.log(topCountries);
    }

    return this.pointStylingChart.getPointStylingChart({
      labels: ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes'],
      datasets: {
        label: 'Ventas Semanales',
        value: this.chartUtil.numbers({ count: 5, min: -100, max: 100 }),
      },
      pointStyle: 'circle',
    });
  }

  async generateDoughnutChart(topCountries: TopCountry[]) {
    return this.doughnutChart.getDoughnutChart({
      labels: topCountries.map((country) => country.country),
      datasets: {
        label: 'Top Countries',
        value: topCountries.map((country) => country._count.country),
      },
      legendPosition: 'left',
    });
  }

  async generatePieChart(topCountries: TopCountry[]) {
    return this.pieChart.getPieChart({
      labels: topCountries.map((country) => country.country),
      datasets: {
        label: 'Top Countries',
        value: topCountries.map((country) => country._count.country),
      },
      legendPosition: 'right',
    });
  }
}
