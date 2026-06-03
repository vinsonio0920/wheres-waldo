function formatTime(time) {
  let formattedTime;
  const numberFormat = new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  });
  const day = 24 * 60 * 60 * 1000;
  const hour = 60 * 60 * 1000;
  const minute = 60 * 1000;

  if (time / day > 1) {
    // day
    formattedTime = `${numberFormat
      .format(time / day)
      .toString()
      .replace(/\./, ":")}d`;
  } else if (time / hour > 1) {
    // hour
    formattedTime = `${numberFormat
      .format(time / hour)
      .toString()
      .replace(/\./, ":")}h`;
  } else {
    // minutes/seconds
    if (time / minute > 1) {
      formattedTime = `${numberFormat
        .format(time / minute)
        .toString()
        .replace(/\./, ":")}m`;
    } else {
      formattedTime = `${numberFormat
        .format(time / minute)
        .toString()
        .replace(/\./, ":")}s`;
    }
  }

  return formattedTime;
}

export { formatTime };
