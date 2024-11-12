import { Content } from 'pdfmake/interfaces';
import { DateFormatter } from 'src/helpers';

type HeaderProps = {
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
  const { isShowLogo = true, isShowDate = true } = options || {};

  const date = DateFormatter.getDDMMMMYYYY(new Date());

  const header: Content = {
    columns: [
      isShowLogo ? logo : null,
      isShowDate
        ? {
            text: `Fecha de Emisión: ${date}`,
            alignment: 'right',
            margin: [20, 20, 20, 20],
          }
        : null,
    ],
  };

  return header;
};
