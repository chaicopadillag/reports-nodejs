import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { CustomReportsService } from './custom-reports.service';

@Controller('custom-reports')
export class CustomReportsController {
  constructor(private readonly customReportService: CustomReportsService) {}

  @Get('html')
  async getCustomHtmlReport(@Res() res: Response) {
    const pdf = await this.customReportService.getCustomHtmlReport();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      'inline; filename="custom-html-report.pdf"',
    );
    pdf.info.Title = 'Custom HTML Report';
    pdf.pipe(res);
    pdf.end();
  }

  @Get('cotizacion')
  async getCotizacionReport(@Res() res: Response) {
    const pdf = await this.customReportService.getCotizacionReport();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      'inline; filename="cotizacion-report.pdf"',
    );
    pdf.info.Title = 'Cotizacion Report';
    pdf.pipe(res);
    pdf.end();
  }
}
