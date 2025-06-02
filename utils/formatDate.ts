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
