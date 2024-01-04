// formatted time example: 2023-10-14 19:45:38.691+05:30 (is local time)
// can be easily inputted into new Date object
// can also be easily decoded at https://dencode.com/en/date/iso8601

const padWithZero = (num: number) => {
  return (num < 10 ? '0' : '') + num;
};

// get time offset at start
const tzo = -new Date().getTimezoneOffset();
const tzo_string = `${tzo >= 0 ? '+' : '-'}${padWithZero(
  Math.floor(Math.abs(tzo) / 60)
)}:${padWithZero(Math.abs(tzo) % 60)}`;

const getFormattedTime = (): string => {
  return new Date().toLocaleString('sv').concat(tzo_string);
};

export default getFormattedTime;
