import { Controller, Get, Param, ParseIntPipe, Res } from '@nestjs/common';
import { Response } from 'express';
import { BasicReportsService } from './basic-reports.service';

@Controller('basic-reports')
export class BasicReportsController {
  constructor(private readonly basicReportsService: BasicReportsService) {}

  @Get()
  helloWorld(@Res() res: Response) {
    const pdf = this.basicReportsService.helloWorld();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'inline; filename="hello-world.pdf"');
    pdf.info.Title = 'Hello, world!';
    pdf.pipe(res);
    pdf.end();
  }

  @Get('employee-letter')
  employeeLetter(@Res() res: Response) {
    const pdf = this.basicReportsService.employeeLetter();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      'inline; filename="employee-letter.pdf"',
    );
    pdf.info.Title = 'Employee Letter';
    pdf.pipe(res);
    pdf.end();
  }

  @Get('employee-letter/:id')
  async employeeLetterById(
    @Param('id', ParseIntPipe) id: number,
    @Res() res: Response,
  ) {
    const pdf = await this.basicReportsService.employeeLetterById(id);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      'inline; filename="employee-letter.pdf"',
    );
    pdf.info.Title = 'Employee Letter';
    pdf.pipe(res);
    pdf.end();
  }

  @Get('countries-report')
  async getCountriesReport(@Res() res: Response) {
    const pdf = await this.basicReportsService.getCountriesReport();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      'inline; filename="countries-report.pdf"',
    );
    pdf.info.Title = 'Countries Report';
    pdf.pipe(res);
    pdf.end();
  }
}
