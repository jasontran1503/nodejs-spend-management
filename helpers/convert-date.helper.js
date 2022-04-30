const convertDate = (date) => {
  const dateTime = new Date(date);
  return dateTime.setTime(dateTime.getTime() + 7 * 60 * 60 * 1000);
};

module.exports = { convertDate };
