// Turns any text into a URL-safe id: "The confused deputy" -> "the-confused-deputy".
export function slugify(text) {
  return String(text)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// A project's URL slug is its name before the colon:
// "EventLoop Studio: runs your own JavaScript…" -> "eventloop-studio".
export function projectSlug(name) {
  return slugify(String(name).split(":")[0]);
}
