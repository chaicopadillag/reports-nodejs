import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { PrinterModule } from '../printer/printer.module';
import { StoreReportsService } from './store-reports.service';
import { StoreReportsController } from './store-reports.controller';

@Module({
  imports: [DatabaseModule, PrinterModule],
  providers: [StoreReportsService],
  controllers: [StoreReportsController],
})
export class StoreReportsModule {}
