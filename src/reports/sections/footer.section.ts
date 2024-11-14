import { DynamicContent } from 'pdfmake/interfaces';

export const footerSection: DynamicContent = (currentPage, pageCount) => {
  return {
    text: `Page ${currentPage.toString()} of ${pageCount}`,
    alignment: 'right',
    fontSize: 10,
    margin: [0, 10, 40, 0],
  };
};
