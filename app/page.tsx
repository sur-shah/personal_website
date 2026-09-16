export default function Home() {
  return (
    <section className="mx-auto flex min-h-screen w-full max-w-6xl items-center px-6 py-24 sm:px-10">
      <div className="max-w-2xl">
        <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Personal website
        </p>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">
          A clean foundation, ready to build on.
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
          Next.js, TypeScript, Tailwind CSS, Three.js, Framer Motion, and
          Lucide are configured and ready for your ideas.
        </p>
      </div>
    </section>
  );
}
