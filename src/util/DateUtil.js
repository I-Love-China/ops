// 20220808091907926
exports.getReadableTimestamp = () => {
  let now = new Date();
  now = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
  return now.toISOString().replace(/[^\d]/g, '');
}

/**
 * 
 * https://stackoverflow.com/questions/439630/create-a-date-with-a-set-timezone-without-using-a-string-representation
 * @param {*} date 
 * @param {*} tzString 
 * @returns 
 */
exports.convertTZ = (date, tzString) => {
  return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", { timeZone: tzString }));
}