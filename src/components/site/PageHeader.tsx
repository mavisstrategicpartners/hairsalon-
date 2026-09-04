export function PageHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string
  title: string
  intro?: string
}) {
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-[1400px] px-6 pb-14 pt-16">
        <p className="eyebrow animate-fade-up">{eyebrow}</p>
        <h1 className="mt-4 max-w-[16ch] animate-fade-up text-balance font-display text-[clamp(3rem,7vw,6rem)] italic leading-[0.9] tracking-tight">
          {title}
        </h1>
        {intro ? (
          <p className="mt-6 max-w-[52ch] animate-fade-up text-pretty text-[15px] leading-relaxed text-muted-foreground">
            {intro}
          </p>
        ) : null}
      </div>
    </section>
  )
}
