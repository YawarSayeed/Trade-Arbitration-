import { useState } from "react";
import { useLocation } from "wouter";
import { useStore } from "@/lib/store";
import { ArrowRight, ScanLine, ArrowDownToLine, GitCompareArrows, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const strategies = [
  {
    id: "breadth",
    title: "Broad Country Scan",
    description: "Survey the full macro landscape — political risk, currency exposure, infrastructure readiness, and regulatory environment — before drilling into the portco thesis.",
    icon: ScanLine,
  },
  {
    id: "depth",
    title: "Deep Thesis Drill",
    description: "Go deep on a single high-uncertainty factor. Ideal when one unresolved question — such as FDI repatriation policy — could alone invalidate the deployment decision.",
    icon: ArrowDownToLine,
  },
  {
    id: "contradiction",
    title: "Assumption Stress Test",
    description: "Actively surface contradicting evidence to the investment thesis. Seek data that challenges demand projections, management quality assessments, or political stability assumptions.",
    icon: GitCompareArrows,
  },
  {
    id: "wisdom",
    title: "Institutional Memory Lens",
    description: "Filter for hard-won knowledge from prior fund deployments in this region. Prioritizes tacit knowledge from senior investment officers, in-country advisors, and co-investors with lived experience.",
    icon: Eye,
  }
];

export default function Strategy() {
  const [, setLocation] = useLocation();
  const { strategy, setStrategy } = useStore();
  const [selectedId, setSelectedId] = useState<string | null>(strategy);

  const handleInitiate = () => {
    if (selectedId) {
      setStrategy(selectedId);
      setLocation("/reasoning");
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-8 pt-24 pb-32">
      <div className="mb-12">
        <div className="inline-block px-3 py-1 bg-secondary/10 text-secondary text-xs uppercase tracking-wider font-mono font-bold rounded mb-4">
          Phase 03 / Analysis Strategy
        </div>
        <h1 className="text-4xl font-serif text-foreground mb-4">Choose Your Approach</h1>
        <p className="text-lg text-muted-foreground">Select how the intelligence engine should traverse the investment knowledge terrain for NexPak Malaysia.</p>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-12">
        {strategies.map((strat) => {
          const isSelected = selectedId === strat.id;
          const Icon = strat.icon;
          return (
            <button
              key={strat.id}
              onClick={() => setSelectedId(strat.id)}
              className={cn(
                "text-left p-6 rounded-xl border transition-all duration-300 relative overflow-hidden group",
                isSelected 
                  ? "bg-card border-primary shadow-md ring-1 ring-primary/20" 
                  : "bg-card/50 border-border hover:border-primary/50 hover:bg-card"
              )}
            >
              {isSelected && (
                <div className="absolute top-0 right-0 w-16 h-16 bg-primary/10 rounded-bl-full -mr-8 -mt-8" />
              )}
              <div className={cn(
                "w-12 h-12 rounded-lg flex items-center justify-center mb-6 transition-colors",
                isSelected ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground group-hover:text-primary"
              )}>
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-serif text-foreground mb-3">{strat.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{strat.description}</p>
            </button>
          );
        })}
      </div>

      <div className="flex justify-end">
        <Button 
          size="lg" 
          disabled={!selectedId}
          className="bg-primary hover:bg-primary/90 text-primary-foreground font-mono uppercase tracking-wider text-xs px-8 h-12 transition-all disabled:opacity-50"
          onClick={handleInitiate}
        >
          Initiate Investment Analysis
          <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
