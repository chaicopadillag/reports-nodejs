import fs from 'fs';
import path from 'path';
import { TDocumentDefinitions } from 'pdfmake/interfaces';

export const getSvgContent = async (
  imageBase64: string,
): Promise<TDocumentDefinitions> => {
  const svg = await fs.readFileSync(
    path.join(__dirname, '../../assets/svg/nodejs.svg'),
    'utf8',
  );

  return {
    content: [
      {
        svg,
        // width: 200,
        // fit: [200, 200],
      },
      {
        image: imageBase64,
        width: 500,
        fit: [500, 500],
      },
    ],
  };
};
