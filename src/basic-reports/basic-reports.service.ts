import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { PrinterService } from '../printer/printer.service';
import {
  getEmployeeLetterByIdReport,
  getEmployeeLetterReport,
  getHelloWorldReport,
} from '../reports/';

@Injectable()
export class BasicReportsService {
  constructor(
    private readonly prisma: DatabaseService,
    private readonly printerService: PrinterService,
  ) {}

  helloWorld() {
    const pdfDoc = getHelloWorldReport('Gordon');
    return this.printerService.createPdf(pdfDoc);
  }

  employeeLetter() {
    const pdfDoc = getEmployeeLetterReport();
    return this.printerService.createPdf(pdfDoc);
  }

  async employeeLetterById(id: number) {
    const employee = await this.prisma.employees.findUnique({
      where: { id },
    });

    if (!employee) {
      throw new NotFoundException(`Employee by that ID: ${id} not found`);
    }

    const pdfDoc = getEmployeeLetterByIdReport({
      employerName: 'John Doe',
      employerPosition: 'CEO',
      companyName: 'Acme Inc.',
      employeeName: employee.name,
      employeePosition: employee.position,
      startDate: employee.start_date,
      weeklyHours: employee.hours_per_day,
      workSchedule: employee.work_schedule,
    });
    return this.printerService.createPdf(pdfDoc);
  }
}
