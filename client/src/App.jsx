// src/App.jsx
import { lazy, Suspense } from "react";
import { MotionConfig } from "framer-motion";
import { Analytics } from "@vercel/analytics/react";
import Home from "./pages/Home";
const CaseStudy = lazy(() => import("./components/CaseStudy"));
const Admin = lazy(() => import("./components/Admin"));
import useTrackVisit from "./hooks/useTrackVisit";
import "./index.css";

export default function App() {
  useTrackVisit();
  const path = window.location.pathname;
  const isAdmin = path === "/admin";
  const caseSlug = path.startsWith("/work/") ? path.split("/")[2] : null;

  return (
    <MotionConfig reducedMotion="user">
      <div className="bg-canvas text-ink overflow-x-hidden">
        {isAdmin ? (
          <Suspense fallback={null}>
            <Admin />
          </Suspense>
        ) : caseSlug ? (
          <Suspense fallback={null}>
            <CaseStudy slug={caseSlug} />
          </Suspense>
        ) : (
          <Home />
        )}
        <Analytics />
      </div>
    </MotionConfig>
  );
}
