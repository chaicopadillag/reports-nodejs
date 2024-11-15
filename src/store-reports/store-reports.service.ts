import { Injectable, NotFoundException } from '@nestjs/common';
import { generateOrderReport } from 'src/reports';
import { DatabaseService } from '../database/database.service';
import { PrinterService } from '../printer/printer.service';

@Injectable()
export class StoreReportsService {
  constructor(
    private readonly prisma: DatabaseService,
    private readonly printerService: PrinterService,
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
}
