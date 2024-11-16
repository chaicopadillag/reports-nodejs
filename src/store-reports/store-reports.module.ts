import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import {
  BarsChart,
  ChartUtils,
  DoughnutChart,
  PieChart,
  PointStylingChart,
} from '../helpers';
import { PrinterModule } from '../printer/printer.module';
import { StadisticsReport } from '../reports';
import { StoreReportsController } from './store-reports.controller';
import { StoreReportsService } from './store-reports.service';

@Module({
  imports: [DatabaseModule, PrinterModule, HttpModule],
  controllers: [StoreReportsController],
  providers: [
    StoreReportsService,
    ChartUtils,
    DoughnutChart,
    StadisticsReport,
    PointStylingChart,
    BarsChart,
    PieChart,
  ],
})
export class StoreReportsModule {}
