import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export const DATE_FORMATS: Record<string, string> = {
  with_time: "YYYY-MM-DD HH:mm:ss",
  std_date: "YYYY-MM-DD", // standard data date format in the database
  us_date: "MM/DD/YYYY",
  de_date: "DD.MM.YYYY",
};
export const YESTERDAY = dayjs().subtract(1, "day").toDate();

export const formatDate = (
  date: Parameters<typeof dayjs>[0],
  formatStr: string
): string | null => {
  if (!date) return null;
  return dayjs(date).tz("America/New_York").format(formatStr);
};

export const parseDate = (
  date: Parameters<typeof dayjs>[0],
  formatStr: string
): Date | null => {
  if (!date) return null;
  return dayjs(date, formatStr).tz("America/New_York").toDate();
};

// export const excludeDateList = (list: Array<string>, dateFormatStr: string) => (date: Date) => {
//   return !list.includes(formatDate(date, dateFormatStr));
// };

export const getLocaleDateFormat = (): string => {
  if (
    typeof navigator !== "undefined" &&
    navigator?.language?.substring(0, 2) === "en"
  ) {
    return DATE_FORMATS.us_date;
  } else {
    return DATE_FORMATS.de_date;
  }
};
