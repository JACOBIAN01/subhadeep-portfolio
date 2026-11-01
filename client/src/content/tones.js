// Colour tones that figure specs can name ("tone": "blue"). Plain JS so the build-time
// validator can check names in Node. Matches the site tokens and the Decoded palette.
export const TONES = {
  blue: { fg: "#0066cc", bg: "#eff6ff" },
  orange: { fg: "#ff9500", bg: "#fff7ed" },
  red: { fg: "#d93025", bg: "#fdecea" },
  green: { fg: "#1f9d55", bg: "#eafaf0" },
  purple: { fg: "#6a3fc6", bg: "#f5f1fd" },
  grey: { fg: "#86868b", bg: "#f5f5f7" },
};

export const tone = (name) => TONES[name] || TONES.blue;

// Icons a spec can name ("icon": "key"). Mapped to components in figures/icons.jsx.
export const ICON_NAMES = [
  "key",
  "lock",
  "unlock",
  "laptop",
  "server",
  "database",
  "globe",
  "user",
  "users",
  "mail",
  "search",
  "shield",
  "alert",
  "cpu",
  "cloud",
  "file",
  "link",
  "phone",
  "wallet",
  "eye",
];
