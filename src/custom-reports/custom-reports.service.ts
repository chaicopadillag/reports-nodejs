import { Injectable } from '@nestjs/common';
import { custumTableLayouts } from '../printer/printer-tabla.layout';
import { PrinterService } from '../printer/printer.service';
import { getCotizacionReport, HtmlReportService } from '../reports';

@Injectable()
export class CustomReportsService {
  constructor(
    private readonly printer: PrinterService,
    private readonly htmlReportService: HtmlReportService,
  ) {}

  async getCustomHtmlReport() {
    const docDefinition = await this.htmlReportService.getHtmlReport();
    return this.printer.createPdf(docDefinition);
  }

  async getCotizacionReport() {
    const docDefinition = await getCotizacionReport();
    return this.printer.createPdf(docDefinition, {
      tableLayouts: custumTableLayouts,
    });
  }
}
