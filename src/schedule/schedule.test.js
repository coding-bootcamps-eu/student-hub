import { bootcampDays, calculateSchedule, getClassSchedule } from "./schedule";

describe("schedule", () => {
  it("should calculate personal schedule", () => {
    const personalSchedule = calculateSchedule(new Date("2022-04-19"));
    expect(personalSchedule.length).toEqual(bootcampDays);
  });

  it("should calculate personal schedule", () => {
    const personalSchedule = calculateSchedule(new Date("2022-04-19"));
    expect(personalSchedule.length).toEqual(bootcampDays);
  });

  it("should return schedule for class", () => {
    const mockGeneralSchedule = [];
    const mockClassSchedules = {
      "2022-04": [],
    };

    // Test for class that uses a special schedule
    const schedule1 = getClassSchedule(
      "2022-04",
      mockGeneralSchedule,
      mockClassSchedules
    );
    expect(schedule1).toBe(mockClassSchedules["2022-04"]);

    // Test for class that uses the general schedule
    const schedule2 = getClassSchedule(
      "2022-05",
      mockGeneralSchedule,
      mockClassSchedules
    );
    expect(schedule2).toBe(mockGeneralSchedule);
  });
});
