// src/data/journeyData.js
import raw from "./btech_journey.json";

// Institution isn't present in the raw JSON in a directly usable form
// (only internal codes: campus "AMR", school "SENSE"), added as a plain constant.
export const EDUCATION = {
  degree: raw.profile.degree,
  branch: raw.profile.branch,
  institution: "VIT-AP University",
  gradYear: raw.profile.completion_year,
  cgpa: raw.profile.final_cgpa,
};
