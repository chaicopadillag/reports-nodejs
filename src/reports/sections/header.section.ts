import { Content } from 'pdfmake/interfaces';
import { DateFormatter } from 'src/helpers';

type HeaderProps = {
  title?: string;
  subtitle?: string;
  isShowLogo?: boolean;
  isShowDate?: boolean;
};

const logo: Content = {
  image: 'assets/images/tucan-code-logo.png',
  width: 100,
  height: 100,
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
                margin: [0, 15, 0, 0],
                style: {
                  fontSize: 22,
                  bold: true,
                },
              },
              subtitle
                ? {
                    text: subtitle,
                    alignment: 'center',
                    margin: [0, 2, 0, 0],
                    style: {
                      fontSize: 16,
                      bold: true,
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
            margin: [0, 20],
            width: 150,
          }
        : null,
    ],
    margin: [10, 10],
  };

  return header;
};
