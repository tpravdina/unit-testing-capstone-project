const timezonedDate = require("timezoned-date");

let unitTestingTask = require("./unitTestingTask");

describe("unitTestingTask", () => {
  describe("Different type of date", () => {
    it("should return today date if not date passed", () => {
      jest.useFakeTimers("modern");
      jest.setSystemTime(new Date(2022, 5, 24));

      expect(unitTestingTask("YYYY")).toEqual("2022");

      jest.useRealTimers();
    });

    it("should return correct date if date passed as a string", () => {
      expect(unitTestingTask("YYYY", "1995-07-06")).toEqual("1995");
    });
  });

  describe("Year", () => {
    it("should return correct result for 'YYYY' token", () => {
      expect(unitTestingTask("YYYY", new Date("December 17, 1995"))).toEqual(
        "1995"
      );
    });

    it("should return correct result for 'YY' token", () => {
      expect(unitTestingTask("YY", new Date("December 17, 1995"))).toEqual(
        "95"
      );
    });
  });

  describe("Month", () => {
    it("should return correct result for 'MMMM' token", () => {
      expect(unitTestingTask("MMMM", new Date("December 17, 1995"))).toEqual(
        "December"
      );
    });

    it("should return correct result for 'MMM' token", () => {
      expect(
        unitTestingTask("MMM", new Date("December 17, 1995 03:24:00"))
      ).toEqual("Dec");
    });

    it("should return correct result for 'MM' token", () => {
      expect(
        unitTestingTask("MM", new Date("December 17, 1995 03:24:00"))
      ).toEqual("12");
    });

    it("should return correct result for 'M' token (2 digits)", () => {
      expect(
        unitTestingTask("M", new Date("December 17, 1995 03:24:00"))
      ).toEqual("12");
    });

    it("should return correct result for 'M' token (1 digit)", () => {
      expect(
        unitTestingTask("M", new Date("February 17, 1995 03:24:00"))
      ).toEqual("2");
    });
  });

  describe("Day", () => {
    it("should return correct result for 'DDD' token", () => {
      expect(
        unitTestingTask("DDD", new Date("February 17, 1995 03:24:00"))
      ).toEqual("Friday");
    });

    it("should return correct result for 'DD' token", () => {
      expect(
        unitTestingTask("DD", new Date("February 17, 1995 03:24:00"))
      ).toEqual("Fri");
    });

    it("should return correct result for 'D' token", () => {
      expect(
        unitTestingTask("D", new Date("February 17, 1995 03:24:00"))
      ).toEqual("Fr");
    });

    it("should return correct result for 'dd' token (2 digits)", () => {
      expect(
        unitTestingTask("dd", new Date("February 17, 1995 03:24:00"))
      ).toEqual("17");
    });

    it("should return correct result for 'dd' token (1 digit)", () => {
      expect(
        unitTestingTask("dd", new Date("February 7, 1995 03:24:00"))
      ).toEqual("07");
    });

    it("should return correct result for 'd' token (2 digits)", () => {
      expect(
        unitTestingTask("d", new Date("February 17, 1995 03:24:00"))
      ).toEqual("17");
    });

    it("should return correct result for 'd' token (1 digit)", () => {
      expect(
        unitTestingTask("d", new Date("February 7, 1995 03:24:00"))
      ).toEqual("7");
    });
  });

  describe("Hour", () => {
    it("should return correct result for 'HH' token", () => {
      expect(
        unitTestingTask("HH", new Date("February 17, 1995 03:24:00"))
      ).toEqual("03");
    });

    it("should return correct result for 'H' token (2 digits)", () => {
      expect(
        unitTestingTask("H", new Date("February 17, 1995 14:24:00"))
      ).toEqual("14");
    });

    it("should return correct result for 'H' token (1 digit)", () => {
      expect(
        unitTestingTask("H", new Date("February 17, 1995 03:24:00"))
      ).toEqual("3");
    });

    it("should return correct result for 'hh' token (before 12)", () => {
      expect(
        unitTestingTask("hh", new Date("February 17, 1995 03:24:00"))
      ).toEqual("03");
    });

    it("should return correct result for 'hh' token (after 12)", () => {
      expect(
        unitTestingTask("hh", new Date("February 17, 1995 14:24:00"))
      ).toEqual("02");
    });

    it("should return correct result for 'hh' token (for 00)", () => {
      expect(
        unitTestingTask("hh", new Date("February 17, 1995 00:24:00"))
      ).toEqual("12");
    });

    it("should return correct result for 'h' token (after 12, 1 digit)", () => {
      expect(
        unitTestingTask("h", new Date("February 17, 1995 14:24:00"))
      ).toEqual("2");
    });

    it("should return correct result for 'h' token (for 00)", () => {
      expect(
        unitTestingTask("h", new Date("February 17, 1995 00:24:00"))
      ).toEqual("12");
    });
  });

  describe("Minute", () => {
    it("should return correct result for 'mm' token (2 digits)", () => {
      expect(
        unitTestingTask("mm", new Date("February 17, 1995 03:24:00"))
      ).toEqual("24");
    });

    it("should return correct result for 'mm' token (1 digit)", () => {
      expect(
        unitTestingTask("mm", new Date("February 17, 1995 03:04:00"))
      ).toEqual("04");
    });

    it("should return correct result for 'm' token (2 digit)", () => {
      expect(
        unitTestingTask("m", new Date("February 17, 1995 03:24:00"))
      ).toEqual("24");
    });

    it("should return correct result for 'm' token (1 digit)", () => {
      expect(
        unitTestingTask("m", new Date("February 17, 1995 03:04:00"))
      ).toEqual("4");
    });
  });

  describe("Second", () => {
    it("should return correct result for 'ss' token (2 digits)", () => {
      expect(
        unitTestingTask("ss", new Date("February 17, 1995 03:24:54"))
      ).toEqual("54");
    });

    it("should return correct result for 'ss' token (1 digit)", () => {
      expect(
        unitTestingTask("ss", new Date("February 17, 1995 03:04:06"))
      ).toEqual("06");
    });

    it("should return correct result for 's' token (2 digits)", () => {
      expect(
        unitTestingTask("s", new Date("February 17, 1995 03:24:36"))
      ).toEqual("36");
    });

    it("should return correct result for 's' token (1 digit)", () => {
      expect(
        unitTestingTask("s", new Date("February 17, 1995 03:04:03"))
      ).toEqual("3");
    });
  });

  describe("Milliseconds", () => {
    it("should return correct result for 'ff' token (2 digits)", () => {
      expect(
        unitTestingTask("ff", new Date("February 17, 1995 03:24:54:17"))
      ).toEqual("017");
    });

    it("should return correct result for 'ff' token (1 digit)", () => {
      expect(
        unitTestingTask("ff", new Date("February 17, 1995 03:04:06:04"))
      ).toEqual("004");
    });

    it("should return correct result for 'f' token (2 digits)", () => {
      expect(
        unitTestingTask("f", new Date("February 17, 1995 03:24:36:17"))
      ).toEqual("17");
    });

    it("should return correct result for 'f' token (1 digit)", () => {
      expect(
        unitTestingTask("f", new Date("February 17, 1995 03:04:03:04"))
      ).toEqual("4");
    });
  });

  describe("AM/PM", () => {
    it("should return correct result for 'A' token (for am time)", () => {
      expect(
        unitTestingTask("A", new Date("February 17, 1995 03:24:54"))
      ).toEqual("AM");
    });

    it("should return correct result for 'A' token (for pm time)", () => {
      expect(
        unitTestingTask("A", new Date("February 17, 1995 13:24:54"))
      ).toEqual("PM");
    });

    it("should return correct result for 'a' token (for am time)", () => {
      expect(
        unitTestingTask("a", new Date("February 17, 1995 03:24:54"))
      ).toEqual("am");
    });

    it("should return correct result for 'a' token (for pm time)", () => {
      expect(
        unitTestingTask("a", new Date("February 17, 1995 13:24:54"))
      ).toEqual("pm");
    });
  });

  describe("Time-zone", () => {
    const plusTwoTimeZoneDate = timezonedDate.makeConstructor(120);
    it("should return correct result for 'ZZ' token", () => {
      expect(unitTestingTask("ZZ", new plusTwoTimeZoneDate())).toEqual("+0200");
    });

    it("should return correct result for 'Z' token", () => {
      expect(unitTestingTask("Z", new plusTwoTimeZoneDate())).toEqual("+02:00");
    });
  });

  describe("Errors", () => {
    it("should throw error when 'format' is not a string", () => {
      expect(() =>
        unitTestingTask(5, new Date("February 17, 1995 03:24:54"))
      ).toThrow(TypeError);

      expect(() =>
        unitTestingTask(5, new Date("February 17, 1995 03:24:54"))
      ).toThrow("Argument `format` must be a string");
    });

    it("should throw error when 'date' has wrong type", () => {
      expect(() => unitTestingTask("YYYY", {})).toThrow(TypeError);
      expect(() => unitTestingTask("YYYY", {})).toThrow(
        "Argument `date` must be instance of Date or Unix Timestamp or ISODate String"
      );
    });
  });

  describe("Format", () => {
    it("should return list of custom formats", () => {
      expect(unitTestingTask.formatters()).toEqual([
        "ISODate",
        "ISOTime",
        "ISODateTime",
        "ISODateTimeTZ",
      ]);
    });

    it("should return correct result for existing format", () => {
      expect(
        unitTestingTask("ISODate", new Date("February 17, 1995 03:24:54"))
      ).toEqual("1995-02-17");
    });

    it("should return correct result for custom format", () => {
      expect(
        unitTestingTask.register(
          "longDate",
          "d MMMM"
        )(new Date("February 17, 1995 03:24:54"))
      ).toEqual("17 February");
    });
  });

  describe("Language (pl)", () => {
    beforeEach(() => {
      unitTestingTask.lang("pl");
    });

    afterAll(() => {
      unitTestingTask.lang("en");
    });

    it("should return correct current language after changing", () => {
      expect(unitTestingTask.lang()).toEqual("pl");
    });

    it("should return correct month in different format", () => {
      expect(
        unitTestingTask("MMMM", new Date("February 17, 1995 03:24:54"))
      ).toEqual("luty");
      expect(
        unitTestingTask("MMM", new Date("February 17, 1995 03:24:54"))
      ).toEqual("lut");
    });

    it("should return month in correct case", () => {
      expect(
        unitTestingTask("dd MMMM", new Date("February 17, 1995 03:24:54"))
      ).toEqual("17 lutego");
      expect(
        unitTestingTask("dd MMM", new Date("February 17, 1995 03:24:54"))
      ).toEqual("17 lut");
    });

    it("should return correct day in different format", () => {
      expect(
        unitTestingTask("DDD", new Date("February 17, 1995 03:24:54"))
      ).toEqual("piątek");
      expect(
        unitTestingTask("DD", new Date("February 17, 1995 03:24:54"))
      ).toEqual("pt");
      expect(
        unitTestingTask("D", new Date("February 17, 1995 03:24:54"))
      ).toEqual("Pt");
    });

    it("should return correct meridiem", () => {
      expect(
        unitTestingTask("A", new Date("February 17, 1995 03:24:54"))
      ).toEqual("rano");
      expect(
        unitTestingTask("A", new Date("February 17, 1995 17:24:54"))
      ).toEqual("");
    });
  });
});
