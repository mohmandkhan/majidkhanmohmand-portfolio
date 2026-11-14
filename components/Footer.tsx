import Link from 'next/link';
import { person, social } from '@/content/profile';

export function Footer() {
  return (
    <footer className="no-print border-t border-contour">
      <div className="mx-auto flex max-w-[1240px] flex-col gap-4 px-5 py-10 text-[14px] text-haze sm:px-8 md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} {person.name}. Co-founder of StoresWiki LLC, founder of Code Engineers.</p>
        <p className="flex flex-wrap gap-x-5 gap-y-1">
          <Link href="/cv/" className="hover:text-chalk">CV</Link>
          <a href="/llms.txt" className="hover:text-chalk">For AI assistants</a>
          <a href="https://dossier.storeswiki.com" className="hover:text-chalk">The video studios dossier</a>
          <a href={social[0].url} className="hover:text-chalk">LinkedIn</a>
          <a href={social[1].url} className="hover:text-chalk">GitHub</a>
        </p>
      </div>
    </footer>
  );
}
