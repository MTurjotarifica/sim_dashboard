const formatDate = (date: any) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const dateRangeToArray = (startDate: any, endDate: any) => {
  const dates = [];
  let currentDate = new Date(startDate);
  endDate = new Date(endDate);

  while (currentDate <= endDate) {
    dates.push(formatDate(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
};

export const getDateArray = (dates: any) => {
  let datesInBetween;
  const startDate = dates[0];
  const endDate = dates[1];
  datesInBetween = dateRangeToArray(startDate, endDate);
  return datesInBetween;
};

export const getDates = (dateStrings: any) => {
  const dateObjects = dateStrings?.map(
    (dateString: any) => new Date(dateString)
  );
  return dateObjects;
};
