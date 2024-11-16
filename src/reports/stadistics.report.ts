import type { TDocumentDefinitions } from 'pdfmake/interfaces';

export const getStadisticsReport = (data?: any) => {
  console.log(data);

  const docDefinitions: TDocumentDefinitions = {
    content: ['Hello World'],
  };

  return docDefinitions;
};
