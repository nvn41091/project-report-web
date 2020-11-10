export const formatDate = (date: Date): Date | null => {
  if (date) {
    const now_utc = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(),
      date.getHours(), date.getMinutes(), date.getSeconds());
    return new Date(now_utc);
  }
  return null;
};
