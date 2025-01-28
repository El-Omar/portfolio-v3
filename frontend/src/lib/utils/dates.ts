export const extractDateFromISOString = (rawDate: string) => {
  const [date] = rawDate.split("T");
  return date;
};

export const getYearMonthDay = (rawDate: string) => {
  const [date] = rawDate.split("T");
  return date.split("-");
};

export const formatDate = (rawDate: string): string => {
  const date = new Date(rawDate);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
