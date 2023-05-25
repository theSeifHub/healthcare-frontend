import dayjs from "dayjs";

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

export const getAgeFromBirthDate = (dob) => {
  const years = dayjs().diff(dayjs(dob), 'year');
  if (years > 0) {
    return `${years} years`;
  }
  const months = dayjs().diff(dayjs(dob), 'month');
  if (months > 0) {
    return `${months} months`;
  }
  const days = dayjs().diff(dayjs(dob), 'day');
  if (days > 0) {
    return `${days} days`;
  }
};