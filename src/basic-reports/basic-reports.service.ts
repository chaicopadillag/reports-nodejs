import { Injectable, NotFoundException } from '@nestjs/common';
import { CustomTableLayout } from 'pdfmake/interfaces';
import { DatabaseService } from '../database/database.service';
import { PrinterService } from '../printer/printer.service';
import {
  generateCountriesReport,
  getEmployeeLetterByIdReport,
  getEmployeeLetterReport,
  getHelloWorldReport,
} from '../reports';

const custumTableLayouts: Record<string, CustomTableLayout> = {
  tableLayoutBlue: {
    hLineWidth: (i, node) => {
      if (i === 0 || i === node.table.body.length) {
        return 0;
      }
      return i === node.table.headerRows ? 2 : 1;
    },
    vLineWidth: () => {
      return 0;
    },
    hLineColor: (i) => {
      return i === 1 ? 'black' : '#aaafff';
    },
    paddingLeft: (i) => {
      return i === 0 ? 0 : 8;
    },
    paddingRight: (i, node) => {
      return i === node.table.widths.length - 1 ? 0 : 8;
    },
    fillColor: (i) => {
      if (i === 0) {
        return '#aaafff';
      }

      return i % 2 ? '#f3f3f3' : null;
    },
  },
};

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

  async getCountriesReport() {
    const countries = await this.prisma.countries.findMany({
      where: {
        continent: {
          not: null,
        },
      },
    });

    const pdfDoc = generateCountriesReport(countries);
    return this.printerService.createPdf(pdfDoc, {
      tableLayouts: custumTableLayouts,
    });
  }
}
