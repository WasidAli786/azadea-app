import dayjs from "dayjs";

export function formatDateTime(date: string | Date) {
  return dayjs(date).format("DD-MMM-YYYY, h:mm a");
}
