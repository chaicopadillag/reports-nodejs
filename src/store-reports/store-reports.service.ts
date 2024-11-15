import { Injectable } from '@nestjs/common';
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
    // const data = await this.prisma.orders.findMany();

    const documentDefinitions = generateOrderReport();

    return this.printerService.createPdf(documentDefinitions);
  }
}
