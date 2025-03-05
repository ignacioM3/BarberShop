import { format } from "date-fns";

export function getFormattedDates(day: string | null): {
  formatForApi: string;
  formattedDate: string;
} {

  const parsedDay = parseInt(day ?? "0", 10);
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  const targetDate = new Date(currentYear, currentMonth, parsedDay);

  if (targetDate.getMonth() !== currentMonth) {
    // Si el mes calculado no es el actual, significa que está en el próximo mes
    const nextMonthDate = new Date(currentYear, currentMonth + 1, parsedDay);
    return {
      formatForApi: format(nextMonthDate, "yyyy-MM-dd"),
      formattedDate: format(nextMonthDate, "dd-MM")
    };
  }

  return {
    formatForApi: format(targetDate, "yyyy-MM-dd"),
    formattedDate: format(targetDate, "dd-MM")
  };
}


export function formattedDateForApi  (date: string | undefined) {
  if(!date){
    return ""
  }
  const [day, month, year ] = date.split('-');
  return `${year}-${month}-${day}`;
}