// Loading blog posts, shared by the blog pages (src/pages/Blog.jsx) and the "Writing"
// cards on the home page (src/components/Writing.jsx). Which posts exist and their URLs
// follow src/data/blogMeta.js, the same rules the build uses.
import { isPublishable, newestFirst, slugFromFileName, summarize } from "./blogMeta";

// Vite gives each JSON file its own small download, fetched only when asked for.
// So a post page downloads just that post.
const POST_FILES = import.meta.glob("../content/blog/*.json", { import: "default" });

// blog/posts.json, the small summary the build writes: the posts that were live at build
// time. Fetched once per visit; null if it can't be read.
let builtListRequest;
function fetchBuiltList() {
  builtListRequest ??= fetch("/blog/posts.json")
    .then((response) => (response.ok ? response.json() : null))
    .then((list) => (Array.isArray(list) ? list : null))
    .catch(() => null);
  return builtListRequest;
}

// In production a post page shows only posts the build listed, so the page, the list and
// the sitemap agree (a post dated in the future stays hidden until the next build after
// its date). If the summary can't be read, the post's own rules decide.
export async function loadPost(slug) {
  const loadFile = POST_FILES[`../content/blog/${slug}.json`];
  if (!loadFile) return null;
  const [post, builtList] = await Promise.all([
    loadFile(),
    import.meta.env.DEV ? null : fetchBuiltList(),
  ]);
  const listed = !builtList || builtList.some((entry) => entry.slug === slug);
  return listed && isPublishable(post) ? { ...post, slug } : null;
}

// Every published post's summary, newest first. In production it reads blog/posts.json,
// so the list never downloads whole posts. The dev server has no build step, so there it
// reads the post files directly; a file that fails to load is skipped, not fatal.
export async function loadPostList() {
  if (!import.meta.env.DEV) return (await fetchBuiltList()) || [];

  const results = await Promise.allSettled(
    Object.entries(POST_FILES).map(async ([path, loadFile]) => ({
      post: await loadFile(),
      slug: slugFromFileName(path),
    }))
  );
  return results
    .filter((result) => result.status === "fulfilled" && isPublishable(result.value.post))
    .map((result) => summarize(result.value.post, result.value.slug))
    .sort(newestFirst);
}

// "2026-11-01" -> "1 November 2026".
export function formatDate(isoDate) {
  return new Date(`${isoDate}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
