import { countries } from '@prisma/client';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { footerSection, getHeaderSection } from './sections';

export const generateCountriesReport = (
  countries: countries[],
): TDocumentDefinitions => {
  return {
    pageOrientation: 'landscape',
    header: getHeaderSection({
      title: 'Countries Report',
      subtitle: 'List of countries',
    }),
    pageSize: 'A4',
    pageMargins: [40, 110, 40, 60],
    content: [
      {
        layout: 'tableLayoutBlue',
        table: {
          headerRows: 1,
          widths: [30, 'auto', 30, 30, '*', '*'],
          body: [
            ['ID', 'Name', 'Iso 2', 'Iso 3', 'Continent', 'Local Name'],
            ...countries.map((country) => [
              country.id.toString(),
              {
                text: country.name,
                bold: true,
              },
              country.iso2,
              country.iso3,
              country.continent,
              country.local_name,
            ]),
          ],
        },
      },
      {
        layout: 'noBorders',
        table: {
          headerRows: 1,
          widths: ['*', 'auto', 30, 30, 30],
          body: [
            [
              {
                text: 'Total',
                bold: true,
                fontSize: 16,
              },
              {
                text: `${countries.length} países`,
                bold: true,
                fontSize: 16,
              },
              '',
              '',
              '',
            ],
          ],
        },
        margin: [0, 20, 0, 0],
      },
    ],
    footer: footerSection,
  };
};
