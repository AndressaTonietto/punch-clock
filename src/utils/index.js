import differenceInMinutes from 'date-fns/differenceInMinutes';

const workDay = 480;

export const convertToDate = stringHour => {
  const date = new Date();
  return date.setHours(stringHour.split(':')[0], stringHour.split(':')[1]);
};

const format = record => {
  const { punchIn, punchOut, breakDuration } = record;
  const start = convertToDate(punchIn);
  const end = convertToDate(punchOut);

  const timePassed = differenceInMinutes(end, start);
  const dailyTimeBank = timePassed - breakDuration - workDay;
  return { ...record, dailyTimeBank };
};

export const calculateTimeBank = data => {
  if (data && data.length) {
    return data
      .map(record => format(record))
      .reduce((acc, obj) => acc + obj.dailyTimeBank, 0);
  }
  return format(data).dailyTimeBank;
};
