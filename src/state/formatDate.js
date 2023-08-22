const formatDateTime = (dateTimeString) => {
  const options = {
    dateStyle: "short",
    timeStyle: "short",
  };
  const dateTime = new Date(dateTimeString);
  return dateTime.toLocaleString(undefined, options);
};

export default formatDateTime;
