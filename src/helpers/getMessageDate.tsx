export const getMessageDate = (days: number): string => {
  const date = new Date();
  const options = { year: 'numeric', month: 'long', day: 'numeric' };

  date.setDate(date.getDate() - days);

  return date.toLocaleString('en-US', options);
};
