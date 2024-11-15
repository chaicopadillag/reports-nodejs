import { TDocumentDefinitions } from 'pdfmake/interfaces';

export const generateOrderReport = (): TDocumentDefinitions => {
  return {
    header: {
      margin: [40, 20, 40, 20],
      columns: [
        {
          image: 'assets/images/crochefin.png',
          width: 90,
          height: 90,
          alignment: 'left',
        },
        {
          qr: 'https://crochefin.com',
          fit: 90,
          alignment: 'right',
        },
      ],
    },
    pageMargins: [40, 120, 40, 60],
    content: [
      {
        text: 'Crochefin',
        fontSize: 20,
        bold: true,
        color: '#43bccd',
      },
      {
        margin: [0, 10, 0, 20],
        columns: [
          {
            bold: true,
            text: 'Av. Abancay 1234, Lima, Perú\nEmail: austyn97@hotmail.com\nPhone: +51 123 456 789\nWebsite: crochefin.com',
          },
          {
            text: [
              {
                text: 'Pedido N°: 000125\n',
                style: {
                  fontSize: 14,
                  bold: true,
                },
              },
              'Fecha: 2021-09-01\nEstado: Completado\nMétodo de Pago: Tarjeta de Crédito',
            ],
            alignment: 'right',
          },
        ],
      },
      // customer info and shipping address
      {
        margin: [0, 5, 0, 0],
        columns: [
          {
            text: [
              {
                text: 'Cliente:\n',
                style: {
                  bold: true,
                },
              },
              'María Pérez Alarcón',
            ],
          },
          {
            text: [
              {
                text: 'Dirección de Envío:\n',
                style: {
                  bold: true,
                },
              },
              'Jr. Los Pinos 123, Lima, Perú',
            ],
            alignment: 'right',
          },
        ],
      },
      //  order items
      {
        margin: [0, 20, 0, 20],
        layout: 'headerLineOnly',
        table: {
          headerRows: 1,
          widths: ['auto', '*', 'auto', 'auto', 'auto'],
          body: [
            ['ID', 'Producto', 'Cantidad', 'Precio Unitario', 'Total'],
            ['1', 'Amigurrumi de Llama', '1', '$30.00', '$30.00'],
            ['2', 'Amigurrumi de Cristiano Ronaldo', '1', '$45.00', '$45.00'],
            ['3', 'Amigurrumi de Cuy', '1', '$30.00', '$30.00'],
          ],
        },
      },

      // order summary
      {
        columns: [
          { text: '', width: '*' },
          {
            width: 'auto',
            margin: [0, 20, 0, 20],
            layout: 'noBorders',
            table: {
              widths: ['*', 'auto'],
              body: [
                [{ text: 'Subtotal:', bold: true }, '$75.00'],
                [{ text: 'Envío:', bold: true }, '$5.00'],
                [{ text: 'Descuento:', bold: true }, '$0.00'],
                [{ text: 'Total:', bold: true }, '$80.00'],
              ],
            },
          },
        ],
      },
    ],
  };
};
