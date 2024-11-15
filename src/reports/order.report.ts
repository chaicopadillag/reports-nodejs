import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { DateFormatter } from 'src/helpers';
import { CurrencyFormatter } from '../helpers/currency-formatter';
import { OrderDetailsType } from '../store-reports/types';

export const generateOrderReport = (
  order: OrderDetailsType,
): TDocumentDefinitions => {
  const { customers, order_details, order_id, order_date } = order;
  const { customer_name, city, postal_code, address } = customers;

  const total = order_details.reduce(
    (acc, item) => acc + Number(item.products.price) * item.quantity,
    0,
  );
  const shipping = 10;

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
                text: `Pedido N°: ${order_id}\n`,
                style: {
                  fontSize: 14,
                  bold: true,
                },
              },
              `Fecha: ${DateFormatter.getDDMMMMYYYY(new Date(order_date))}\nEstado: Completado\nMétodo de Pago: Tarjeta de Crédito`,
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
              customer_name,
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
              `${address}, ${city}, ${postal_code}`,
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
            ...order_details.map((item) => [
              item.products.product_id,
              item.products.product_name,
              item.quantity,
              {
                text: CurrencyFormatter.formatCurrency(
                  Number(item.products.price),
                ),
                alignment: 'right',
              },
              {
                text: CurrencyFormatter.formatCurrency(
                  item.quantity * Number(item.products.price),
                ),
                alignment: 'right',
              },
            ]),
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
                [
                  { text: 'Subtotal:', bold: true },
                  {
                    text: CurrencyFormatter.formatCurrency(total),
                    alignment: 'right',
                  },
                ],
                [
                  { text: 'Envío:', bold: true },
                  {
                    text: CurrencyFormatter.formatCurrency(shipping),
                    alignment: 'right',
                  },
                ],
                [
                  { text: 'Descuento:', bold: true },
                  { text: 'S/ 0', alignment: 'right' },
                ],
                [
                  { text: 'Total:', bold: true },
                  {
                    text: CurrencyFormatter.formatCurrency(total + shipping),
                    alignment: 'right',
                    bold: true,
                  },
                ],
              ],
            },
          },
        ],
      },
    ],
  };
};
