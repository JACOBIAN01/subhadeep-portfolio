// src/App.jsx
import { lazy, Suspense } from "react";
import { MotionConfig } from "framer-motion";
import { Analytics } from "@vercel/analytics/react";
import Home from "./pages/Home";
const CaseStudy = lazy(() => import("./components/CaseStudy"));
const Blog = lazy(() => import("./components/blog/Blog"));
import "./index.css";

export default function App() {
  const path = window.location.pathname;
  const caseSlug = path.startsWith("/work/") ? path.split("/")[2] : null;

  return (
    <MotionConfig reducedMotion="user">
      <div className="bg-canvas text-ink overflow-x-hidden">
        {caseSlug ? (
          <Suspense fallback={null}>
            <CaseStudy slug={caseSlug} />
          </Suspense>
        ) : path.startsWith("/blog") ? (
          <Suspense fallback={null}>
            <Blog path={path} />
          </Suspense>
        ) : (
          <Home />
        )}
        <Analytics />
      </div>
    </MotionConfig>
  );
}
