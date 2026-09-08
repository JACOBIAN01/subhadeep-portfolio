// src/data/journeyData.js
import raw from "./btech_journey.json";

const grades = raw.statistics.grade_distribution_effective_courses;

// Institution isn't present in the raw JSON in a directly usable form
// (only internal codes: campus "AMR", school "SENSE"), added as a plain constant.
export const EDUCATION = {
  degree: raw.profile.degree,
  branch: raw.profile.branch,
  institution: "VIT-AP University",
  gradYear: raw.profile.completion_year,
  cgpa: raw.profile.final_cgpa,
  totalCredits: raw.profile.total_credits_earned,
  totalCourses: raw.statistics.total_courses_listed,
  sGrades: grades.S,
  aGrades: grades.A,
};

// Per-year course load from the real semester-by-semester transcript
// (journey[], grouped by year_label); each headline summarized from the real
// milestones[] entries for that year, and keyCourses pulled verbatim from
// courses[].course_title for that year's most SDE-relevant entries.
export const ACADEMIC_TIMELINE = [
  {
    year: "Year 1",
    academicYear: "2022 – 2023",
    headline: "Foundations & Programming",
    courseCount: 12,
    credits: 44,
    keyCourses: ["Problem Solving using Python", "Object Oriented Programming", "Digital Logic Design"],
  },
  {
    year: "Year 2",
    academicYear: "2023 – 2024",
    headline: "DSA & Core ECE Transition",
    courseCount: 16,
    credits: 50,
    keyCourses: [
      "Data Structures and Algorithms",
      "Microprocessors and Microcontrollers",
      "Engineering Clinics - Raspberry Pi using Python",
    ],
  },
  {
    year: "Year 3",
    academicYear: "2024 – 2025",
    headline: "Electives & Software Engineering",
    courseCount: 11,
    credits: 39,
    keyCourses: ["Software Engineering", "AWS for Cloud Computing", "Computer Organization and Architecture"],
  },
  {
    year: "Year 4",
    academicYear: "2025 – 2026",
    headline: "Capstone, Internship & Certification",
    courseCount: 7,
    credits: 31,
    keyCourses: ["Capstone", "Internship", "IoT System Architecture", "OCI Foundations Associate"],
  },
];
