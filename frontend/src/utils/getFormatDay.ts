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

  const formatForApi = format(targetDate, "yyyy-MM-dd");
  const formattedDate = format(targetDate, "dd-MM");

  return { formatForApi, formattedDate };
}
