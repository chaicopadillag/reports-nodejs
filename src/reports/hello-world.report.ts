import type { TDocumentDefinitions } from 'pdfmake/interfaces';

export const getHelloWorldReport = (name: string) => {
  const pdfDoc: TDocumentDefinitions = {
    content: [`Hello, ${name}`, 'This is a basic PDF report.'],
  };

  return pdfDoc;
};
