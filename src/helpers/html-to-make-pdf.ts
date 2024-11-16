import { Injectable } from '@nestjs/common';
import htmlToPdfmake from 'html-to-pdfmake';
import { JSDOM } from 'jsdom';

@Injectable()
export class HtmlToMakePdf {
  getHtmlToMakePdf(html: string) {
    const { window } = new JSDOM('');

    return htmlToPdfmake(html, { window });
  }
}
