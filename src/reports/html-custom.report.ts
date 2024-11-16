import { Injectable } from '@nestjs/common';
import fs from 'fs';
import path from 'path';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { HtmlToMakePdf } from '../helpers';

@Injectable()
export class HtmlReportService {
  constructor(private readonly htmlToPdf: HtmlToMakePdf) {}

  async getHtmlReport(): Promise<TDocumentDefinitions> {
    let html = await fs.readFileSync(
      path.resolve(__dirname, '../../public/advance-template.html'),
      'utf8',
    );

    const dataToInject: Record<string, any> = {
      name: 'John Doe',
      age: 30,
      country: 'USA',
    };

    Object.entries(dataToInject).forEach(([key, value]) => {
      html = html.replaceAll(`{{ ${key} }}`, value);
    });

    const converted = this.htmlToPdf.getHtmlToMakePdf(html);

    const docDefinition: TDocumentDefinitions = {
      content: converted,
    };

    return docDefinition;
  }
}
