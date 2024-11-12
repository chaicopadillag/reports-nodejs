import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class BasicReportsService {
  constructor(private readonly prisma: DatabaseService) {}

  async getEmployees() {
    return this.prisma.employees.findMany();
  }
}
