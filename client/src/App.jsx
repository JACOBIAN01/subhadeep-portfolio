// src/App.jsx
import { MotionConfig } from "framer-motion";
import Home from "./pages/Home";
import "./index.css";

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="bg-canvas text-ink overflow-x-hidden">
        <Home />
      </div>
    </MotionConfig>
  );
}
