import { Injectable } from '@nestjs/common';
import { PrinterService } from '../printer/printer.service';
import { HtmlReportService } from '../reports';

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
}
