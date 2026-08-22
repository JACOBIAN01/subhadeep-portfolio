// src/data/journeyData.js
import raw from "./btech_journey.json";

const courseByCode = Object.fromEntries(
  raw.courses.map((c) => [c.course_code, c])
);

function titlesFor(codes) {
  return codes.map((code) => courseByCode[code].course_title);
}

export const JOURNEY_SUMMARY = {
  degree: raw.profile.degree,
  branch: raw.profile.branch,
  startYear: raw.profile.year_joined,
  endYear: raw.profile.completion_year,
  finalCGPA: raw.profile.final_cgpa,
  creditsEarned: raw.profile.total_credits_earned,
  creditsRegistered: raw.profile.total_credits_registered,
};

// Every semester is bucketed into the calendar year its exam_month falls in
// (Semester 1 exams in Jan-2023 reflect coursework done in 2022, etc.), not the
// "academic_year" label, since that better matches when the courses were actually studied.
const SEMESTER_YEAR = {
  "Semester 1": 2022,
  "Semester 2": 2023,
  "Semester 3": 2023,
  "Semester 4": 2024,
  "Semester 5": 2024,
  "Semester 6": 2025,
  "Semester 7": 2025,
  "Semester 8": 2026,
};

const codesByYear = {};
raw.journey.forEach((sem) => {
  const year = SEMESTER_YEAR[sem.semester_label];
  codesByYear[year] = (codesByYear[year] || []).concat(sem.course_codes);
});

const STAGE_DEFINITIONS = [
  {
    year: 2022,
    stage: "Foundation",
    progression: ["Fundamentals", "Problem Solving"],
  },
  {
    year: 2023,
    stage: "Programming",
    progression: ["Problem Solving", "Programming", "Algorithmic Thinking"],
  },
  {
    year: 2024,
    stage: "Engineering",
    progression: ["Programming", "Circuit Design", "Embedded Engineering"],
  },
  {
    year: 2025,
    stage: "Systems",
    progression: ["Software Design", "Systems Thinking", "Building"],
  },
  {
    year: 2026,
    stage: "Engineer",
    progression: ["Systems Thinking", "Applied Engineering", "Engineer"],
  },
];

export const JOURNEY_STAGES = STAGE_DEFINITIONS.map((s) => ({
  ...s,
  courses: titlesFor(codesByYear[s.year]),
}));

export const JOURNEY_PAYOFF = {
  degree: raw.profile.degree,
  branch: raw.profile.branch,
  startYear: raw.profile.year_joined,
  endYear: raw.profile.completion_year,
};

export const JOURNEY_STATS = [
  { k: "Total Credits", v: raw.profile.total_credits_earned, suffix: "" },
  { k: "Final CGPA", v: raw.profile.final_cgpa, suffix: "" },
  { k: "Courses Completed", v: raw.statistics.total_courses_counted_in_cgpa, suffix: "" },
  { k: "A-Grade Courses", v: raw.statistics.grade_distribution_effective_courses.A, suffix: "" },
  { k: "S-Grade Courses", v: raw.statistics.grade_distribution_effective_courses.S, suffix: "" },
];
