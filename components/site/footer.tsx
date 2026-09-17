import { siteConfig } from '@/lib/site-config';

export function Footer() {
  return (
    <footer className="border-t border-white/8 px-6 py-8 sm:px-10">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center justify-between gap-3 text-sm text-muted-foreground sm:flex-row">
        <p>{siteConfig.name}</p>
        <p>{siteConfig.location}</p>
      </div>
    </footer>
  );
}
