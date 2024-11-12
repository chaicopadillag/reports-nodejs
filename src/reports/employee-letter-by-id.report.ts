import { StyleDictionary, TDocumentDefinitions } from 'pdfmake/interfaces';
import { DateFormatter } from '../helpers/date-formatter';
import { getHeaderSection } from './sections';

type EmployeeLetterByIdProps = {
  employerName: string;
  employerPosition: string;
  companyName: string;
  employeeName: string;
  employeePosition: string;
  startDate: Date;
  weeklyHours: number;
  workSchedule: string;
};

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

export const getEmployeeLetterByIdReport = (
  values: EmployeeLetterByIdProps,
) => {
  const {
    employerName,
    employerPosition,
    companyName,
    employeeName,
    employeePosition,
    startDate,
    weeklyHours,
    workSchedule,
  } = values;

  const docDefinition: TDocumentDefinitions = {
    styles,
    pageMargins: [40, 60, 40, 60],
    header: getHeaderSection(),
    content: [
      { text: 'CONSTANCIA DE EMPLEADO', style: 'title' },
      {
        text: `Yo, ${employerName}, en mi calidad de ${employerPosition} de ${companyName}, por medio de la presente certifico que ${employeeName} ha sido empleado en nuestra empresa desde el ${DateFormatter.getDDMMMMYYYY(startDate)}.`,
        style: 'text',
      },
      {
        text: `Durante su empleo, el Sr./Sra. ${employeeName} ha desempeñado el cargo de ${employeePosition}, demostrando responsabilidad, compromiso y habilidades profesionales en sus labores.`,
        style: 'text',
      },
      {
        text: `La jornada laboral del Sr./ Sra. ${employeeName} es de ${weeklyHours} horas semanales, con un horario de ${workSchedule}, cumpliendo con las políticas y procedimientos establecidos por la empresa.`,
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
      { text: `${employerName}`, style: 'signature' },
      { text: `${employeePosition}`, style: 'signature' },
      { text: `${companyName}`, style: 'signature' },
      { text: DateFormatter.getDDMMMMYYYY(new Date()), style: 'signature' },
    ],
    footer: {
      text: 'Este documento es una constancia de empleo y no constituye una oferta de trabajo.',
      style: 'footer',
    },
  };

  return docDefinition;
};
