
import { features } from "@/lib/mock-data";
import { Reveal, SectionHeading } from "@/components/shared/reveal";

export function Features() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
      <SectionHeading
        eyebrow="A better way to think"
        title="Less tab-hopping. More clarity."
        description="Everything you need to move from the first question to the idea that sticks."
      />
      <div className="mt-14 grid gap-px overflow-hidden rounded-none border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => (
          <Reveal key={feature.title} delay={index * 0.06}>
            <div className="group relative h-full overflow-hidden bg-surface p-6 sm:p-7">
              <div className="w-fit origin-top-left transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:-rotate-90 group-hover:translate-y-full">
                <h3 className="text-[1.05rem] font-medium leading-snug">{feature.title}</h3>
                <p className="mt-2 max-w-[26ch] text-sm leading-6 text-muted">{feature.description}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}