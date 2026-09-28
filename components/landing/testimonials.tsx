import { Reveal, SectionHeading } from "@/components/shared/reveal";

const quotes = [
  { quote: "It feels less like asking a bot and more like opening up a room full of perspectives.", name: "Maya Chen", role: "Independent designer", initials: "MC" },
  { quote: "The best part is staying in the work instead of managing a stack of tabs.", name: "Andre Lewis", role: "Product lead", initials: "AL" },
  { quote: "I use the compare view to get past the first obvious answer. It is a small shift that adds up.", name: "Sofia Patel", role: "Writer & researcher", initials: "SP" },
  { quote: "When I'm stuck, I line up a few answers side by side and the right direction usually shows itself.", name: "Daniel Okafor", role: "Software engineer", initials: "DO" },
  { quote: "It has changed how I draft. I start with several takes and shape the best one, instead of polishing the first.", name: "Lena Fischer", role: "Content strategist", initials: "LF" },
];


const BEATS = 4;
const BEAT_WIDTH = 400 / BEATS;
const beat: [number, number][] = [
  [0, 10], [8, 10],     
  [11, 7.5], [14, 10],      
  [19, 10],                  
  [21.5, 12], [24, 1],       
  [27, 16], [29.5, 10],      
  [34, 10], [38, 6.5],      
  [42, 10], [BEAT_WIDTH, 10]
];
const ecgPoints = Array.from({ length: BEATS }, (_, b) =>
  beat.map(([x, y]) => `${(b * BEAT_WIDTH + x).toFixed(1)},${y}`)
)
  .flat()
  .join(" ");

function ScribbleLine({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 400 20"
      className={`h-auto w-full text-stone-500 ${className}`}
    >

      <polyline
        points={ecgPoints}
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.2"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
     
      <polyline
        className="ecg-trace"
        points={ecgPoints}
        pathLength={1}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TestimonialCard({ item }: { item: (typeof quotes)[number] }) {
  return (
    <figure className="flex h-full w-[300px] shrink-0 flex-col rounded-lg border border-border bg-surface p-5 sm:w-[380px] sm:p-6">
      <blockquote className="mt-5 flex-1 text-base leading-7">“{item.quote}”</blockquote>
      <ScribbleLine className="mt-7" />
      <figcaption className="mt-4 flex items-center gap-3">
        <span className="grid size-9 place-items-center rounded-full bg-white text-xs font-semibold text-primary">
          {item.initials}
        </span>
        <span>
          <span className="block text-sm font-semibold">{item.name}</span>
          <span className="mt-0.5 block text-xs text-muted">{item.role}</span>
        </span>
      </figcaption>
    </figure>
  );
}

export function Testimonials() {
  return (
    <section className="border-y border-border bg-surface-muted/40 py-20 sm:py-24">
      <style>{`
        @keyframes testimonial-scroll-left {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .testimonial-track {
          animation: testimonial-scroll-left 40s linear infinite;
        }
        .testimonial-marquee:hover .testimonial-track,
        .testimonial-marquee:focus-within .testimonial-track {
          animation-play-state: paused;
        }
        @keyframes ecg-sweep {
          from { stroke-dashoffset: 0.3; }
          to { stroke-dashoffset: -1; }
        }
        .ecg-trace {
          stroke-dasharray: 0.3 1;
          animation: ecg-sweep 4s linear infinite;
          filter: drop-shadow(0 0 2px currentColor);
        }
        @media (prefers-reduced-motion: reduce) {
          .testimonial-track { animation: none; }
          .ecg-trace { animation: none; stroke-dasharray: none; filter: none; }
        }
      `}</style>

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading eyebrow="In good company" title="A little more perspective goes a long way." />
      </div>

      <Reveal>
        <div
          className="testimonial-marquee mt-10 overflow-hidden"
          style={{
            maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
            WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          }}
        >
          <div className="testimonial-track flex w-max gap-3 pr-3">
            {quotes.map((item) => (
              <TestimonialCard key={item.name} item={item} />
            ))}
            {quotes.map((item) => (
              <div key={`${item.name}-copy`} aria-hidden="true">
                <TestimonialCard item={item} />
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}