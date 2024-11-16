import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { ChartUtils } from '../helpers';
import { PrinterModule } from '../printer/printer.module';
import { StoreReportsController } from './store-reports.controller';
import { StoreReportsService } from './store-reports.service';

@Module({
  imports: [DatabaseModule, PrinterModule, HttpModule],
  controllers: [StoreReportsController],
  providers: [StoreReportsService, ChartUtils],
})
export class StoreReportsModule {}
