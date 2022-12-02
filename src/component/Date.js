let currentDateTime = () => {
  const currentDate = new Date();
  const dateTime =
    "Last Sync: " +
    currentDate.getDate() +
    "/" +
    (currentDate.getMonth() + 1) +
    "/" +
    currentDate.getFullYear() +
    " " +
    currentDate.getHours() +
    ":" +
    currentDate.getMinutes() +
    ":" +
    currentDate.getSeconds();

  return dateTime;
};

export { currentDateTime };
