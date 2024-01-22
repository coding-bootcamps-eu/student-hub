import { scheduleDetails } from "./schedule-details";

// Number of days in  fulltime bootcamp
export const bootcampDays = 65;

// Current classes
export const classNames = ["2023-09-26", "2023-10-26", "2023-12-05"];

export const defaultSchedule = [
  { topic: "Onboarding", days: 1 },
  { topic: "Your Frontend Developer Setup", days: 1 },
  { topic: "First Steps with Git", days: 2 },
  { topic: "HTML Foundation", days: 2 },
  { topic: "CSS Foundation", days: 4 },
  { topic: "Advanced CSS", days: 4 },
  { topic: "Next Steps with Git", days: 1 },
  { topic: "Recap Day", days: 1 },
  { topic: "Introduction to Programming with JavaScript", days: 5 },
  { topic: "Solving Problems with JavaScript", days: 5 },
  { topic: "From Objects to Classes", days: 1 },
  { topic: "Recap Day", days: 1 },
  { topic: "Web App Basics", days: 5 },
  { topic: "Basic State Management", days: 2 },
  { topic: "Recap Day", days: 1 },
  { topic: "Fetch and Http Requests", days: 2 },
  { topic: "Intro to Node.js and NPM", days: 1 },
  { topic: "Introduction to Restful APIs", days: 3 },
  { topic: "Recap Day", days: 1 },
  { topic: "Testing", days: 4 },
  { topic: "Vue.js Basics", days: 5 },
  { topic: "Vue.js Single Page Applications", days: 5 },
];

export const classSchedules = {};

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
  "2022-10-27": "Agile Workshop",
  "2022-10-28": "Agile Workshop",
  "2023-02-23": "Agile Workshop",
  "2023-02-24": "Agile Workshop",
  "2023-05-31": "Agile Workshop",
  "2023-06-01": "Agile Workshop",
  "2023-08-31": "Agile Workshop",
  "2023-09-01": "Agile Workshop",
  "2023-12-07": "Agile Workshop",
  "2023-12-08": "Agile Workshop",
};

// TODO: Use library for that
const holidays = [
  "2022-01-01",
  "2022-04-15",
  "2022-04-18",
  "2022-05-01",
  "2022-05-26",
  "2022-06-06",
  "2022-06-16",
  "2022-10-03",
  "2022-12-23",
  "2022-12-25",
  "2022-12-26",
  "2022-12-27",
  "2022-12-28",
  "2022-12-29",
  "2022-12-30",
  "2022-12-31",
  "2023-01-01",
  "2023-01-02",
  "2023-01-03",
  "2023-01-04",
  "2023-01-05",
  "2023-01-06",
  "2023-03-08",
  "2023-04-07",
  "2023-04-09",
  "2023-04-10",
  "2023-05-01",
  "2023-05-18",
  "2023-05-29",
  "2023-06-08",
  "2023-10-03",
  "2023-10-31",
  "2023-11-01",
  "2023-12-25",
  "2023-12-26",
  "2023-12-27",
  "2023-12-28",
  "2023-12-29",
  "2024-01-01",
  "2024-01-02",
  "2024-01-03",
  "2024-01-04",
  "2024-01-05",
  "2024-03-29",
  "2024-04-01",
  "2024-05-01",
  "2024-05-09",
  "2024-05-20",
  "2024-05-30",
  "2024-10-03",
  "2024-10-31",
  "2024-11-01",
  "2024-12-24",
  "2024-12-25",
  "2024-12-26",
  "2024-12-27",
  "2024-12-30",
  "2024-12-31",
  "2025-01-01",
  "2025-01-02",
  "2025-01-03",
];

const getDetailedTopic = function (topic) {
  const dTopic = scheduleDetails[topic];
  return dTopic;
};

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

export const calculateStaticSchedule = () => {
  const staticSchedule = [];
  for (let topic of defaultSchedule) {
    topic = Object.assign({}, topic);
    topic.details = getDetailedTopic(topic.topic);
    topic.totalTopicDays = topic.days;
    if (topic.topic === "Onboarding") {
      delete topic.days;
      delete topic.totalTopicDays;
    }
    if (topic.topic !== "Recap Day") {
      staticSchedule.push(topic);
    }
  }
  return staticSchedule;
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

      if (
        calculateDates &&
        specialDays[formatDate(startDate)] &&
        className !== "2023-04"
      ) {
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
        details: getDetailedTopic(topic.topic),
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
