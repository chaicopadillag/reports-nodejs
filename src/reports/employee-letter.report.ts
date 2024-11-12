import { StyleDictionary, TDocumentDefinitions } from 'pdfmake/interfaces';
import { getHeaderSection } from './sections';

const styles: StyleDictionary = {
  title: {
    fontSize: 24,
    bold: true,
    alignment: 'center',
    margin: [0, 50, 0, 50],
  },
  text: {
    fontSize: 14,
    margin: [0, 0, 0, 20],
  },
  spacing: {
    fontSize: 14,
    margin: [0, 0, 0, 100],
  },
  signature: {
    fontSize: 14,
    bold: true,
    alignment: 'left',
    margin: [0, 4, 0, 0],
  },
  footer: {
    fontSize: 10,
    alignment: 'center',
    margin: [0, 0, 0, 20],
  },
};

export const getEmployeeLetterReport = () => {
  const docDefinition: TDocumentDefinitions = {
    styles,
    pageMargins: [40, 60, 40, 60],
    header: getHeaderSection(),
    content: [
      { text: 'CONSTANCIA DE EMPLEADO', style: 'title' },
      {
        text: `Yo, [Nombre del Empleador], en mi calidad de [Cargo del Empleador] de [Nombre de la Empresa], por medio de la presente certifico que [Nombre del Empleado] ha sido empleado en nuestra empresa desde el [Fecha de Inicio del Empleado].`,
        style: 'text',
      },
      {
        text: `Durante su empleo, el Sr./Sra. [Nombre del Empleado] ha desempeñado el cargo de [Cargo del Empleado], demostrando responsabilidad, compromiso y habilidades profesionales en sus labores.`,
        style: 'text',
      },
      {
        text: `La jornada laboral del Sr./ Sra. [Nombre del Empleado] es de [Número de Horas] horas semanales, con un horario de [Horario de Trabajo], cumpliendo con las políticas y procedimientos establecidos por la empresa.`,
        style: 'text',
      },
      {
        text: `Esta constancia se expide a solicitud del interesado para los fines que considere conveniente.`,
        style: 'text',
      },
      { text: '', style: 'spacing' },
      {
        text: `Atentamente,`,
        style: 'signature',
      },
      { text: '[Nombre del Empleador]', style: 'signature' },
      { text: '[Cargo del Empleador]', style: 'signature' },
      { text: '[Nombre de la Empresa]', style: 'signature' },
      { text: '[Fecha de Emisión]', style: 'signature' },
    ],
    footer: {
      text: 'Este documento es una constancia de empleo y no constituye una oferta de trabajo.',
      style: 'footer',
    },
  };

  return docDefinition;
};
