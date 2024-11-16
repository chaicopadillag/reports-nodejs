import { Module } from '@nestjs/common';
import { HtmlToMakePdf } from '../helpers';
import { PrinterModule } from '../printer/printer.module';
import { HtmlReportService } from '../reports/html-custom.report';
import { CustomReportsController } from './custom-reports.controller';
import { CustomReportsService } from './custom-reports.service';

@Module({
  imports: [PrinterModule],
  controllers: [CustomReportsController],
  providers: [CustomReportsService, HtmlReportService, HtmlToMakePdf],
})
export class CustomReportsModule {}
