export class DateFormatter {
  static getDDMMMMYYYY(date: Date): string {
    return new Intl.DateTimeFormat('es-PE', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }).format(date);
  }
}
