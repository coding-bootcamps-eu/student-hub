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

module.exports = {
  getTodaysMeetings,
};
