import { Content } from 'pdfmake/interfaces';
import { DateFormatter } from 'src/helpers';

type HeaderProps = {
  title?: string;
  subtitle?: string;
  isShowLogo?: boolean;
  isShowDate?: boolean;
};

const logo: Content = {
  image: 'assets/images/crochefin.png',
  width: 50,
  height: 50,
  alignment: 'center',
  margin: [0, 0, 0, 20],
};

export const getHeaderSection = (options?: HeaderProps) => {
  const {
    title = '',
    subtitle = '',
    isShowLogo = true,
    isShowDate = true,
  } = options || {};

  const date = DateFormatter.getDDMMMMYYYY(new Date());

  const header: Content = {
    columns: [
      isShowLogo ? logo : null,
      title
        ? {
            stack: [
              {
                text: title,
                alignment: 'center',
                margin: [0, 10, 0, 0],
                style: {
                  fontSize: 14,
                  bold: true,
                },
              },
              subtitle
                ? {
                    text: subtitle,
                    alignment: 'center',
                    margin: [0, 2, 0, 0],
                    style: {
                      fontSize: 10,
                    },
                  }
                : null,
            ],
          }
        : null,
      isShowDate
        ? {
            text: date,
            alignment: 'right',
            margin: [0, 10],
            width: 150,
          }
        : null,
    ],
    margin: [20, 10, 20, 20],
  };

  return header;
};
