
export const getDateYearsAgo = (noOfYearsAgo) => {
  const today = new Date();
  let dateYearsAgo = new Date();
  dateYearsAgo.setFullYear(today.getFullYear() - noOfYearsAgo);
  return dateYearsAgo;
};

export const getDateDaysAhead = (noOfDays) => {
  const today = new Date();
  let dateDaysAhead = new Date();
  dateDaysAhead.setDate(today.getDate() + noOfDays);
  return dateDaysAhead;
};