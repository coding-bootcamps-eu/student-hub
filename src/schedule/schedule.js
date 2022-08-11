// Number of days in  fulltime bootcamp
export const bootcampDays = 65;

// Current classes
export const classNames = ["2022-05-17", "2022-06-21", "2022-07-19"];

export const defaultSchedule = [
  { topic: "Onboarding", days: 1 },
  { topic: "Your Frontend Developer Setup", days: 2 },
  { topic: "First Steps with Git", days: 1 },
  { topic: "HTML Foundation", days: 2 },
  { topic: "CSS Foundation", days: 4 },
  { topic: "Advanced CSS", days: 4 },
  { topic: "Next Steps with Git", days: 1 },
  { topic: "Recap Day", days: 1 },
  { topic: "Introduction to Programming with p5", days: 5 },
  { topic: "Solving Problems with JavaScript", days: 4 },
  { topic: "From Objects to Classes", days: 1 },
  { topic: "Recap Day", days: 1 },
  { topic: "Web App Basics", days: 5 },
  { topic: "Basic State Management", days: 2 },
  { topic: "Recap Day", days: 1 },
  { topic: "Fetch and Http Requests", days: 2 },
  { topic: "Intro to Node.js and NPM", days: 2 },
  { topic: "Introduction to Restful APIs", days: 3 },
  { topic: "Recap Day", days: 1 },
  { topic: "Testing", days: 4 },
  { topic: "Vue.js", days: 10 },
  { topic: "Recap Day", days: 1 },
];

export const schedule202205 = [
  { topic: "Onboarding", days: 1 },
  { topic: "Your Frontend Developer Setup", days: 2 },
  { topic: "First Steps with Git", days: 1 },
  { topic: "HTML Foundation", days: 2 },
  { topic: "CSS Foundation", days: 4 },
  { topic: "Advanced CSS", days: 4 },
  { topic: "Next Steps with Git", days: 1 },
  { topic: "Recap Day", days: 1 },
  { topic: "Introduction to Programming with p5", days: 5 },
  { topic: "Solving Problems with JavaScript", days: 4 },
  { topic: "From Objects to Classes", days: 1 },
  { topic: "Recap Day", days: 1 },
  { topic: "Web App Basics", days: 5 },
  { topic: "Basic State Management", days: 2 },
  { topic: "Recap Day", days: 1 },
  { topic: "Fetch and Http Requests", days: 2 },
  { topic: "Intro to Node.js and NPM", days: 2 },
  { topic: "Introduction to Restful APIs", days: 3 },
  { topic: "Recap Day", days: 1 },
  { topic: "Testing", days: 4 },
  { topic: "Vue.js", days: 10 },
  { topic: "Recap Day", days: 1 },
];

export const schedule202206 = [
  { topic: "Onboarding", days: 1 },
  { topic: "Your Frontend Developer Setup", days: 2 },
  { topic: "First Steps with Git", days: 1 },
  { topic: "HTML Foundation", days: 2 },
  { topic: "CSS Foundation", days: 4 },
  { topic: "Advanced CSS", days: 4 },
  { topic: "Next Steps with Git", days: 1 },
  { topic: "Recap Day", days: 1 },
  { topic: "Introduction to Programming with p5", days: 5 },
  { topic: "Solving Problems with JavaScript", days: 6 },
  { topic: "From Objects to Classes", days: 1 },
  { topic: "Recap Day", days: 1 },
  { topic: "Web App Basics", days: 5 },
  { topic: "Basic State Management", days: 2 },
  { topic: "Recap Day", days: 1 },
  { topic: "Fetch and Http Requests", days: 2 },
  { topic: "Intro to Node.js and NPM", days: 2 },
  { topic: "Introduction to Restful APIs", days: 3 },
  { topic: "Recap Day", days: 1 },
  { topic: "Testing", days: 4 },
  { topic: "Vue.js", days: 10 },
  { topic: "Recap Day", days: 1 },
];
export const classSchedules = {
  "2022-05": schedule202205,
  "2022-06": schedule202206,
};

export function getClassSchedule(className, generalSchedule, classSchedules) {
  if (Object.keys(classSchedules).includes(className)) {
    return classSchedules[className];
  } else {
    return generalSchedule;
  }
}

const specialDays = {
  "2022-05-11": "Next Steps Messe",
  "2022-05-12": "Agile Workshop",
  "2022-08-04": "Agile Workshop",
  "2022-08-05": "Agile Workshop",
};

// TODO: Use library for that
const holidays = [
  "2021-12-24",
  "2021-12-25",
  "2021-12-26",
  "2021-12-27",
  "2021-12-28",
  "2021-12-29",
  "2021-12-30",
  "2021-12-31",
  "2022-01-01",
  "2022-04-15",
  "2022-04-18",
  "2022-05-01",
  "2022-05-26",
  "2022-06-06",
  "2022-06-16",
  "2022-10-03",
  "2022-11-01",
  "2022-12-25",
  "2022-12-26",
];

export const getDailyClassGoals = () => {
  const classGoals = [];
  classNames.forEach((className) => {
    let studentStartDate = new Date(className);
    let today = new Date();
    const workingDays = calculateWorkingDaysSinceCampStart(
      studentStartDate,
      today
    );

    if (className.length > 7) {
      className = className.substring(0, 7);
    }

    if (workingDays <= bootcampDays && workingDays > 0) {
      const schedule = calculateSchedule(studentStartDate, className);
      classGoals.push({ className, goal: schedule[workingDays - 1] });
    }
  });

  return classGoals;
};

/**
 * Calculate schedule
 * @param {*} startDate when passed the schedule includes a date for each day
 * @returns array of daily topics
 */
export const calculateSchedule = (startDate, className) => {
  const calculateDates = startDate !== undefined && startDate !== null;

  let schedule = defaultSchedule;
  if (className) {
    schedule = getClassSchedule(className, defaultSchedule, classSchedules);
  }

  const getNextWorkingDay = () => {
    startDate.setDate(startDate.getDate() + 1);
    while (!isWorkingDay(startDate)) {
      startDate.setDate(startDate.getDate() + 1);
    }
  };

  if (calculateDates) {
    startDate = normalizeDate(startDate);
  }
  const dailyTopics = [];
  let dayInSchedule = 0;
  schedule.forEach((topic) => {
    for (let i = 0; i < topic.days; i++) {
      dayInSchedule++;

      if (calculateDates && specialDays[formatDate(startDate)]) {
        do {
          const specialDay = specialDays[formatDate(startDate)];
          const dailyTopic = {
            topic: specialDay,
            dayOfTopic: 1,
            totalTopicDays: 1,
            dayInSchedule: dayInSchedule,
            date: new Date(startDate),
          };
          dailyTopics.push(dailyTopic);
          getNextWorkingDay();
          dayInSchedule++;
        } while (specialDays[formatDate(startDate)]);
      }

      const dailyTopic = {
        topic: topic.topic,
        dayOfTopic: i + 1,
        totalTopicDays: topic.days,
        dayInSchedule: dayInSchedule,
      };

      if (calculateDates) {
        dailyTopic.date = new Date(startDate);
      }

      dailyTopics.push(dailyTopic);

      if (calculateDates) {
        getNextWorkingDay();
      }
    }
  });

  //Bonus Tage
  const days = Object.keys(dailyTopics).length;
  if (days < bootcampDays) {
    const openDays = bootcampDays - days;
    for (let i = 0; i < openDays; i++) {
      dayInSchedule++;
      const dailyTopic = {
        topic: "Abschlussprojekt",
        dayOfTopic: i + 1,
        totalTopicDays: openDays,
        dayInSchedule: dayInSchedule,
      };

      if (calculateDates) {
        dailyTopic.date = new Date(startDate);
      }

      dailyTopics.push(dailyTopic);

      if (calculateDates) {
        getNextWorkingDay();
      }
    }
  }

  return dailyTopics;
};

// Calculate the number of working days for a
// specific bootcamp start date and a current date
export const calculateWorkingDaysSinceCampStart = (startDate, calledDate) => {
  startDate = normalizeDate(startDate);
  calledDate = normalizeDate(calledDate);
  let workingDays = 0;

  while (startDate <= calledDate) {
    if (isWorkingDay(startDate)) {
      workingDays++;
    }
    startDate.setDate(startDate.getDate() + 1);
  }
  return workingDays;
};

export const normalizeDate = (d) => {
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0"); //January is 0!
  const yyyy = d.getFullYear();
  return new Date(yyyy + "-" + mm + "-" + dd);
};

export const formatDate = (d) => {
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0"); //January is 0!
  const yyyy = d.getFullYear();
  return yyyy + "-" + mm + "-" + dd;
};

export const formatTime = (d) => {
  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");

  return hh + ":" + mm;
};

const isWorkingDay = (day) => {
  return (
    day.getDay() !== 0 &&
    day.getDay() !== 6 &&
    !holidays.includes(formatDate(day))
  );
};
