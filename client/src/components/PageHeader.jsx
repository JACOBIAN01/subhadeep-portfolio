// The thin top bar used on inner pages (case studies, blog): a back link and the site name.
import { PROFILE } from "../data/profileData";

export default function PageHeader({ backHref, backLabel }) {
  return (
    <header className="border-b border-hairline">
      <div className="mx-auto max-w-4xl px-6 h-14 flex items-center justify-between text-sm">
        <a href={backHref} className="text-subtle hover:text-ink transition-colors duration-300">
          &larr; {backLabel}
        </a>
        <a href="/" className="font-medium text-ink">
          {PROFILE.name}
        </a>
      </div>
    </header>
  );
}
