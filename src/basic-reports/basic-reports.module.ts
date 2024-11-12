import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { PrinterModule } from 'src/printer/printer.module';
import { BasicReportsController } from './basic-reports.controller';
import { BasicReportsService } from './basic-reports.service';

@Module({
  imports: [DatabaseModule, PrinterModule],
  controllers: [BasicReportsController],
  providers: [BasicReportsService],
})
export class BasicReportsModule {}
