// Named icons for figure specs. Keep in sync with ICON_NAMES in src/content/tones.js.
import {
  FiKey,
  FiLock,
  FiUnlock,
  FiMonitor,
  FiServer,
  FiDatabase,
  FiGlobe,
  FiUser,
  FiUsers,
  FiMail,
  FiSearch,
  FiShield,
  FiAlertTriangle,
  FiCpu,
  FiCloud,
  FiFileText,
  FiLink,
  FiSmartphone,
  FiCreditCard,
  FiEye,
} from "react-icons/fi";

const MAP = {
  key: FiKey,
  lock: FiLock,
  unlock: FiUnlock,
  laptop: FiMonitor,
  server: FiServer,
  database: FiDatabase,
  globe: FiGlobe,
  user: FiUser,
  users: FiUsers,
  mail: FiMail,
  search: FiSearch,
  shield: FiShield,
  alert: FiAlertTriangle,
  cpu: FiCpu,
  cloud: FiCloud,
  file: FiFileText,
  link: FiLink,
  phone: FiSmartphone,
  wallet: FiCreditCard,
  eye: FiEye,
};

export default function Icon({ name, size = 14 }) {
  const C = MAP[name];
  return C ? <C size={size} aria-hidden="true" /> : null;
}
