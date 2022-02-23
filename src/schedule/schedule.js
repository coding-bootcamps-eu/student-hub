export const bootcampDays = 65;

export const topics = [
  { topic: "Onboarding + Bits and Bytes", days: 1 },
  { topic: "Your Frontend Developer Setup", days: 2 },
  { topic: "First Steps with Git", days: 1 },
  { topic: "HTML Foundation", days: 2 },
  { topic: "CSS Foundation", days: 4 },
  { topic: "Advanced CSS", days: 4 },
  { topic: "Next Steps with Git", days: 1 },
  { topic: "Checkpoint Web Dev Foundation", days: 1 },
  { topic: "Introduction to Programming with p5", days: 4 },
  { topic: "Solving Problems with JavaScript", days: 4 },
  { topic: "From Classes to Objects", days: 4 },
  { topic: "Checkpoint Coding Foundation", days: 1 },
  { topic: "Web App Basics", days: 5 },
  { topic: "Basic State Management", days: 2 },
  { topic: "Async", days: 1 },
  { topic: "Checkpoint Web App Basics", days: 1 },
  { topic: "Fetch and Http Requests", days: 3 },
  { topic: "Intro to Node.js and NPM", days: 2 },
  { topic: "Introduction to Restful APIs", days: 3 },
  { topic: "Checkpoint Restful Backends", days: 1 },
  { topic: "VueJS", days: 10 },
  { topic: "Checkpoint VueJS", days: 1 },
];

export const calculateSchedule = () => {
  const dailyTopics = [];
  let dayInSchedule = 0;
  topics.forEach((topic) => {
    for (let i = 0; i < topic.days; i++) {
      dayInSchedule++;
      dailyTopics.push({
        topic: topic.topic,
        dayOfTopic: i + 1,
        totalTopicDays: topic.days,
        dayInSchedule: dayInSchedule,
      });
    }
  });
  return dailyTopics;
};

// Use library for that
const holidays = [
  new Date("2022-01-01"),
  new Date("2022-04-15"),
  new Date("2022-04-18"),
  new Date("2022-05-01"),
  new Date("2022-05-26"),
  new Date("2022-06-06"),
  new Date("2022-06-16"),
  new Date("2022-10-03"),
  new Date("2022-11-01"),
  new Date("2022-12-25"),
  new Date("2022-12-26"),
];

const holidaysAsMs = holidays.map((day) => day.getTime());

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

const isWorkingDay = (day) => {
  return (
    day.getDay() !== 0 &&
    day.getDay() !== 6 &&
    !holidaysAsMs.includes(day.getTime())
  );
};
