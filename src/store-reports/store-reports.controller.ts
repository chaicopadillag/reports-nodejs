import { Controller, Get, Param, ParseIntPipe, Res } from '@nestjs/common';
import { Response } from 'express';
import { StoreReportsService } from './store-reports.service';

@Controller('store-reports')
export class StoreReportsController {
  constructor(private readonly storeReportsService: StoreReportsService) {}

  @Get('orders/:orderId')
  async generateOrderReport(
    @Param('orderId', ParseIntPipe) orderId: number,
    @Res() res: Response,
  ) {
    const pdf = await this.storeReportsService.orderReport(orderId);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'inline; filename="order-report.pdf"');
    pdf.info.Title = `Order Report ${orderId}`;
    pdf.pipe(res);
    pdf.end();
  }
}