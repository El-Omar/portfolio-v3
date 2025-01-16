export const extractDateFromISOString = (rawDate: string) => {
  const [date] = rawDate.split("T");
  return date;
};

export const getYearMonthDay = (rawDate: string) => {
  const [date] = rawDate.split("T");
  return date.split("-");
};
