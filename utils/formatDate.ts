export const formatToDayMonth = (date: string) => {
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
  });
};

export const formatToDayMonthYear = (date: string | Date) => {
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export const formatToClock = (date: string | Date) => {
  const dateObj = new Date(date);
  return dateObj.toLocaleTimeString("tr-TR", {
    hour: "2-digit",
    minute: "2-digit",
  });
};
