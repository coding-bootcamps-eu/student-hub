async function getTodaysMeetings(calendarApi, calendarId, auth) {
  let timeMin = new Date();
  timeMin.setHours(0);
  timeMin.setMinutes(0);
  let timeMax = new Date();
  timeMax.setHours(22);
  timeMax.setMinutes(0);

  const calendarResponse = await calendarApi.events.list({
    auth,
    calendarId: calendarId,
    timeMin: timeMin,
    timeMax: timeMax,
    singleEvents: true,
    orderBy: "startTime",
  });

  if (calendarResponse.data.items && calendarResponse.data.items.length > 0) {
    return calendarResponse.data.items.filter((item) => !!item.summary);
  } else {
    return [];
  }
}

async function getMeetingsForWeek(
  calendarApi,
  calendarId,
  auth,
  year,
  weekNumber
) {
  const mondayFriday = getMondayAndFridayForCalendarWeek(year, weekNumber);
  const timeMin = mondayFriday.monday;
  const timeMax = mondayFriday.friday;

  const calendarResponse = await calendarApi.events.list({
    auth,
    calendarId: calendarId,
    timeMin: timeMin,
    timeMax: timeMax,
    singleEvents: true,
    orderBy: "startTime",
  });

  if (calendarResponse.data.items && calendarResponse.data.items.length > 0) {
    return calendarResponse.data.items.filter((item) => !!item.summary);
  } else {
    return [];
  }
}

function getFirstMondayOfYear(year) {
  const firstMonday = new Date();
  firstMonday.setFullYear(year, 0, 1);
  firstMonday.setHours(6);

  // 0 = Sunday , 1 = Monday
  const firstDayOfYear = firstMonday.getDay();
  if (firstDayOfYear < 1) {
    firstMonday.setDate(firstMonday.getDate() + 1);
  } else if (firstDayOfYear > 1) {
    const daysUntilMonday = 7 - firstDayOfYear + 1;
    firstMonday.setDate(firstMonday.getDate() + daysUntilMonday);
  }

  return firstMonday;
}

function getMondayForCalendarWeek(year, week) {
  const mondayForCalendarWeek = getFirstMondayOfYear(year);
  mondayForCalendarWeek.setDate(
    mondayForCalendarWeek.getDate() + (week - 1) * 7
  );
  return mondayForCalendarWeek;
}

function getMondayAndFridayForCalendarWeek(year, week) {
  const mondayInCW = getMondayForCalendarWeek(year, week);
  const fridayInCW = new Date(mondayInCW);
  fridayInCW.setDate(fridayInCW.getDate() + 4);
  fridayInCW.setHours(22);

  return {
    monday: mondayInCW,
    friday: fridayInCW,
  };
}

module.exports = {
  getTodaysMeetings,
  getMeetingsForWeek,
};
