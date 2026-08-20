export const formattedDate = (date: string): string => {
  const dateFormat = new Intl.DateTimeFormat("id-ID").format(new Date(date));
  return dateFormat;
};
