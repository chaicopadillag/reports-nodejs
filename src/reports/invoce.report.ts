import type { TDocumentDefinitions } from 'pdfmake/interfaces';

export const getCotizacionReport = () => {
  const pdfDoc: TDocumentDefinitions = {
    pageSize: 'A4',
    defaultStyle: {
      fontSize: 10,
    },
    content: [
      {
        columns: [
          {
            image: 'assets/images/crochefin.png',
            width: 60,
            height: 60,
            alignment: 'left',
          },
          {
            text: 'CROCHEFIN S.A.\n RUC: 123456789\n DIRECCIÓN: AV. SIEMPRE VIVA 123\n TELÉFONO: 123456789\n EMAIL: info@crochefin.com',
            alignment: 'center',
          },
          {
            alignment: 'right',
            width: 150,
            layout: 'tableLayoutCrochefin',
            margin: [0, 0, 0, 10],
            table: {
              widths: '*',
              body: [
                [
                  {
                    width: 'auto',
                    layout: 'noBorders',
                    table: {
                      widths: ['*', 'auto'],
                      body: [
                        ['Cotización N°:', '000123'],
                        ['Fecha:', '16/11/2024'],
                      ],
                    },
                  },
                ],
              ],
            },
          },
        ],
      },
      // horizontal line
      {
        margin: [0, 10],
        canvas: [
          {
            type: 'line',
            x1: 0,
            y1: 5,
            x2: 515,
            y2: 5,
            lineWidth: 2,
            lineColor: '#80558c',
          },
        ],
      },
      //customer info
      {
        layout: 'tableLayoutCrochefin',
        table: {
          widths: ['auto', '*', 'auto', '*'],
          body: [
            // table header
            [
              {
                text: 'DATOS DEL CLIENTE',
                colSpan: 4,
                fillColor: '#80558c',
                color: 'white',
              },
              '',
              '',
              '',
            ],
            // table body
            [
              {
                text: 'RAZÓN SOCIAL:',
                fillColor: '#80558c',
                color: 'white',
              },
              {
                text: 'Mario Bros S.A.',
              },
              {
                text: 'DIRECCIÓN:',
                fillColor: '#80558c',
                color: 'white',
              },
              {
                text: 'Av. Siempre Viva 123',
              },
            ],
            [
              {
                text: 'RUC:',
                fillColor: '#80558c',
                color: 'white',
              },
              {
                text: '20123456789',
              },
              {
                text: 'TELÉFONO:',
                fillColor: '#80558c',
                color: 'white',
              },
              {
                text: '+51 123456789',
              },
            ],
            [
              {
                text: 'EMAIL:',
                fillColor: '#80558c',
                color: 'white',
              },
              {
                text: 'vida_ullrich98@gmail.com',
              },
              {
                text: 'METODO DE PAGO:',
                fillColor: '#80558c',
                color: 'white',
              },
              {
                text: 'Tarjeta de Crédito',
              },
            ],
          ],
        },
      },
      {
        margin: [0, 10],
        layout: 'tableLayoutCrochefin',
        table: {
          widths: ['auto', '*', 'auto', '*'],
          body: [
            [
              {
                text: 'DETALLE DE LA COTIZACIÓN',
                colSpan: 4,
                fillColor: '#80558c',
                color: 'white',
              },
              '',
              '',
              '',
            ],
          ],
        },
      },
      {
        layout: 'tableLayoutCrochefin',
        table: {
          widths: ['*', 'auto', 'auto', 'auto'],
          body: [
            [
              {
                text: 'PRODUCTO',
                fillColor: '#80558c',
                color: 'white',
              },
              {
                text: 'CANTIDAD',
                fillColor: '#80558c',
                color: 'white',
              },
              {
                text: 'PRECIO',
                fillColor: '#80558c',
                color: 'white',
              },
              {
                text: 'SUB  TOTAL',
                fillColor: '#80558c',
                color: 'white',
              },
            ],
            [
              {
                text: 'Amigurumi Pokemon Pikachu hecho a mano',
              },
              {
                text: '1',
                alignment: 'center',
              },
              {
                text: 'S/ 100.00',
                alignment: 'right',
              },
              {
                text: 'S/ 100.00',
                alignment: 'right',
              },
            ],
            [
              {
                text: 'Amigurumi Personaje de Anime hecho a mano',
              },
              {
                text: '2',
                alignment: 'center',
              },
              {
                text: 'S/ 100.00',
                alignment: 'right',
              },
              {
                text: 'S/ 200.00',
                alignment: 'right',
              },
            ],
            [
              {
                text: 'Amigurumi Oso hecho a mano',
              },
              {
                text: '1',
                alignment: 'center',
              },
              {
                text: 'S/ 50.00',
                alignment: 'right',
              },
              {
                text: 'S/ 50.00',
                alignment: 'right',
              },
            ],
          ],
        },
      },
      // total
      {
        margin: [0, 10],
        layout: 'tableLayoutCrochefin',
        table: {
          widths: ['*', 'auto'],
          body: [
            [
              {
                text: 'TOTAL',
                fillColor: '#80558c',
                color: 'white',
              },
              {
                text: 'S/ 350.00',
                alignment: 'right',
              },
            ],
          ],
        },
      },
      {
        margin: [0, 10],
        layout: 'tableLayoutCrochefin',
        table: {
          widths: ['*', 'auto'],
          body: [
            [
              {
                text: 'OBSERVACIONES',
                fillColor: '#80558c',
                color: 'white',
              },
              {
                text: 'Gracias por su preferencia',
              },
            ],
          ],
        },
      },
      // terms and conditions
      {
        text: 'CONDICIONES GENERALES',
        bold: true,
        margin: [0, 10],
      },
      {
        fontSize: 8,
        ul: [
          'El precio de la cotización es válido por 7 días.',
          'El precio no incluye IGV.',
          'El precio no incluye gastos de envío.',
        ],
      },
      {
        text: `Dolorum consequatur laboriosam nostrum non facilis laudantium consequatur voluptatibus. Rem inventore aut qui libero id voluptas ullam amet sequi. Excepturi nostrum autem molestiae. Nisi voluptas iste aut molestias occaecati alias. Officia a explicabo impedit ut ipsa quis itaque. Neque possimus voluptatem quis hic officiis.
 
Ipsum omnis vero officiis eos. Neque rerum autem quis id dignissimos nam. Eum et eos sunt et suscipit quae quo mollitia. Molestiae labore sequi. In hic aliquid qui. Impedit accusantium nulla assumenda qui iste magnam error ad.
 
Accusantium qui voluptatem enim illum modi ex. Quo ipsa repellendus aut. Molestiae tempore dolor nam eum.`,
        fontSize: 8,
        margin: [0, 10],
      },
    ],
  };

  return pdfDoc;
};
