const convertDate = (date) => {
  const dateTime = new Date(date);
  return dateTime.setTime(dateTime.getTime() + 7 * 60 * 60 * 1000);
};

const getRangeDateByMonth = (date) => {
  let fromDate = new Date(date);
  let toDate = new Date(fromDate.getFullYear(), fromDate.getMonth() + 1, 0);

  fromDate = convertDate(fromDate);
  toDate = convertDate(toDate);

  return { fromDate, toDate };
};

module.exports = { convertDate, getRangeDateByMonth };
