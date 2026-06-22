import { Button } from "@/components/ui/button";

// Placeholder home — sections are intentionally not built yet.
// Confirms the design-system tokens, fonts, and shadcn are wired correctly.
export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-8 p-8 text-center">
      <div className="space-y-3">
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-brand">
          Scaffold ready
        </span>
        <h1 className="font-heading text-4xl font-bold sm:text-5xl">
          STP Trading
        </h1>
        <p className="mx-auto max-w-md text-muted-foreground">
          Institutional forex &amp; CFD platform. Design system, fonts, and
          animation libraries are wired. Sections coming next.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button>Primary (brand)</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
      </div>

      <div className="flex items-center gap-6 font-mono text-sm" data-numeric>
        <span className="text-up">&#9650; +1.2840</span>
        <span className="text-down">&#9660; -0.0042</span>
        <span className="text-gold">XAU 2,034.50</span>
      </div>
    </main>
  );
}
