export const formatDateTimeFromISO = (isoDateString) => {
  const dateTime = new Date(isoDateString);
  const now = new Date();

  if (!isoDateString) {
    return "Just Now";
  }
  // Check if the date is today
  if (
    dateTime.getDate() === now.getDate() &&
    dateTime.getMonth() === now.getMonth() &&
    dateTime.getFullYear() === now.getFullYear()
  ) {
    const options = {
      hour: "numeric",
      minute: "numeric",
      //   second: "numeric",
      hour12: true,
    };

    return `Today, ${new Intl.DateTimeFormat("en-US", options).format(
      dateTime
    )}`;
  }

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    // second: "numeric",
    hour12: true,
  };

  return new Intl.DateTimeFormat("en-US", options).format(dateTime);
};
