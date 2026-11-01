// src/App.jsx
import { lazy, Suspense } from "react";
import { MotionConfig } from "framer-motion";
import { Analytics } from "@vercel/analytics/react";
import Home from "./pages/Home";
const CaseStudy = lazy(() => import("./components/CaseStudy"));
const BlogIndex = lazy(() => import("./components/blog/BlogIndex"));
const BlogPost = lazy(() => import("./components/blog/BlogPost"));
import "./index.css";

function route(path) {
  if (path.startsWith("/work/")) return { page: "case", slug: path.split("/")[2] };
  if (path === "/blog" || path === "/blog/") return { page: "blogIndex" };
  if (path.startsWith("/blog/")) return { page: "post", slug: path.split("/")[2] };
  return { page: "home" };
}

export default function App() {
  const { page, slug } = route(window.location.pathname);

  return (
    <MotionConfig reducedMotion="user">
      <div className="bg-canvas text-ink overflow-x-hidden">
        <Suspense fallback={null}>
          {page === "case" && <CaseStudy slug={slug} />}
          {page === "blogIndex" && <BlogIndex />}
          {page === "post" && <BlogPost slug={slug} />}
          {page === "home" && <Home />}
        </Suspense>
        <Analytics />
      </div>
    </MotionConfig>
  );
}
