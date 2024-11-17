import { CustomTableLayout } from 'pdfmake/interfaces';

export const custumTableLayouts: Record<string, CustomTableLayout> = {
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
  tableLayoutCrochefin: {
    hLineColor: () => {
      return '#80558c           ';
    },
    vLineColor: () => {
      return '#80558c           ';
    },
  },
};
