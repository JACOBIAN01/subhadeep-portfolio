// src/App.jsx
import { MotionConfig } from "framer-motion";
import { Analytics } from "@vercel/analytics/react";
import Home from "./pages/Home";
import Admin from "./components/Admin";
import useTrackVisit from "./hooks/useTrackVisit";
import "./index.css";

export default function App() {
  useTrackVisit();
  const isAdmin = window.location.pathname === "/admin";

  return (
    <MotionConfig reducedMotion="user">
      <div className="bg-canvas text-ink overflow-x-hidden">
        {isAdmin ? <Admin /> : <Home />}
        <Analytics />
      </div>
    </MotionConfig>
  );
}
