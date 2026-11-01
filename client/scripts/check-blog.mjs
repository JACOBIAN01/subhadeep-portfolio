// Quick check of all blog posts without a full build: node scripts/check-blog.mjs
import { POSTS } from "../src/content/blog/index.js";
import { validatePosts } from "../src/content/blog/validate.js";

const problems = validatePosts(POSTS);
if (problems.length) {
  console.error(`✗ ${problems.length} problem(s):\n  ${problems.join("\n  ")}`);
  process.exit(1);
}
console.log(`✓ ${POSTS.length} post(s) valid`);
