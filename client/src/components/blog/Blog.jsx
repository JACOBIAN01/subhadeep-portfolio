// Entry point for every /blog route, lazy-loaded from App.jsx so the rest of the site
// never downloads blog code, fonts or styles.
import BlogIndex from "./BlogIndex";
import BlogPost from "./BlogPost";

export default function Blog({ path }) {
  const slug = path.split("/")[2];
  return slug ? <BlogPost slug={slug} /> : <BlogIndex />;
}
