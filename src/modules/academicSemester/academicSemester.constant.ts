import {
  TAcademicSemesterCode,
  TAcademicSemesterName,
  TAcademicSemesterNameMapper,
  TMonths,
} from "./academicSemester.interface";

export const monthsArr: TMonths[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const AcademicSemesterName: TAcademicSemesterName[] = [
  "Autumn",
  "Summer",
  "Fall",
];

export const AcademicSemesterCode: TAcademicSemesterCode[] = ["01", "02", "03"];

export const academicSemesterNameCodeMapper: TAcademicSemesterNameMapper = {
  Autumn: "01",
  Summer: "02",
  Fall: "03",
};
