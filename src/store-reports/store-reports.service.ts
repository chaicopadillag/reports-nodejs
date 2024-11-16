import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { ChartUtils } from '../helpers';
import { PrinterService } from '../printer/printer.service';
import {
  generateOrderReport,
  getStadisticsReport,
  getSvgContent,
} from '../reports';

@Injectable()
export class StoreReportsService {
  constructor(
    private readonly prisma: DatabaseService,
    private readonly printerService: PrinterService,
    private readonly chartUtil: ChartUtils,
  ) {}

  async orderReport(orderId: number) {
    const order: any = await this.prisma.orders.findUnique({
      where: {
        order_id: orderId,
      },
      include: {
        customers: true,
        order_details: {
          include: {
            products: true,
          },
        },
      },
    });

    if (!order) {
      throw new NotFoundException(
        `Order with the given ID: ${orderId} not found`,
      );
    }

    const documentDefinitions = generateOrderReport(order);

    return this.printerService.createPdf(documentDefinitions);
  }

  async basicSvg() {
    // const configChart = {
    //   type: 'bar',
    //   data: {
    //     labels: [
    //       'Enero',
    //       'Febrero',
    //       'Marzo',
    //       'Abril',
    //       'Mayo',
    //       'Junio',
    //       'Julio',
    //     ],
    //     datasets: [
    //       {
    //         label: 'Ventas 2021 (Miles)',
    //         data: [12, 19, 3, 5, 2, 3, 10],
    //         backgroundColor: 'rgba(54, 162, 235, 0.2)',
    //         borderColor: 'rgba(54, 162, 235, 1)',
    //         borderWidth: 1,
    //       },
    //     ],
    //   },
    // };

    const DATA_COUNT = 5;
    const NUMBER_CFG = { count: DATA_COUNT, min: 0, max: 100 };

    const data = {
      labels: ['Red', 'Orange', 'Yellow', 'Green', 'Blue'],
      datasets: [
        {
          label: 'Dataset 1',
          data: this.chartUtil.numbers(NUMBER_CFG),
          backgroundColor: Object.values(this.chartUtil.CHART_COLORS),
        },
      ],
    };

    const configChart = {
      type: 'doughnut',
      data,
      options: {
        title: {
          display: true,
          text: 'Chart.js Doughnut Chart',
        },
        responsive: true,
      },
    };

    const imageChart = await this.chartUtil.chartJsToImage(configChart);

    const documentDefinitions = await getSvgContent(imageChart);

    return this.printerService.createPdf(documentDefinitions);
  }

  async stadistics() {
    const data = await this.prisma.customers.groupBy({
      by: ['country'],
      _count: {
        country: true,
      },
      orderBy: {
        _count: {
          country: 'desc',
        },
      },
    });

    const documentDefinitions = getStadisticsReport(data);

    return this.printerService.createPdf(documentDefinitions);
  }
}
