import { useState } from "react";
import { AlertCircle, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const options = [
  {
    id: "a",
    title: "Full $650M deployment — primary equity stake, 5-year lock-in",
    risk: "High Regulatory Risk",
    uncertainty: 55,
    impact: 85,
    cost: 30,
    tradeoffs: [
      { label: "Capital at Risk", value: 90, color: "bg-[hsl(var(--chart-3))]" },
      { label: "Mandate Alignment", value: 80, color: "bg-[hsl(var(--chart-1))]" },
      { label: "Repatriation Flexibility", value: 20, color: "bg-[hsl(var(--chart-3))]" },
    ]
  },
  {
    id: "b",
    title: "Staged deployment — $300M tranche 1, $350M contingent on regulatory clarity",
    risk: "Medium Execution Risk",
    uncertainty: 35,
    impact: 72,
    cost: 55,
    tradeoffs: [
      { label: "Capital at Risk", value: 45, color: "bg-[hsl(var(--chart-2))]" },
      { label: "Mandate Alignment", value: 75, color: "bg-[hsl(var(--chart-1))]" },
      { label: "Repatriation Flexibility", value: 65, color: "bg-[hsl(var(--chart-1))]" },
    ]
  },
  {
    id: "c",
    title: "Co-investment structure with GIC — 50/50 JV, shared board governance",
    risk: "Medium Strategic Risk",
    uncertainty: 40,
    impact: 60,
    cost: 60,
    tradeoffs: [
      { label: "Capital at Risk", value: 50, color: "bg-[hsl(var(--chart-2))]" },
      { label: "Mandate Alignment", value: 55, color: "bg-[hsl(var(--chart-2))]" },
      { label: "Repatriation Flexibility", value: 80, color: "bg-[hsl(var(--chart-1))]" },
    ]
  }
];

export default function Decision() {
  const [selectedId, setSelectedId] = useState<string>("b");

  return (
    <div className="max-w-5xl mx-auto px-8 pt-24 pb-32">
      <div className="mb-12">
        <div className="inline-block px-3 py-1 bg-secondary/10 text-secondary text-xs uppercase tracking-wider font-mono font-bold rounded mb-4">
          Phase 05 / Decision Surface
        </div>
        <h1 className="text-4xl font-serif text-foreground mb-4">Navigate Capital Trade-offs</h1>
        <p className="text-lg text-muted-foreground">Select a deployment structure for NexPak Malaysia based on the synthesized investment terrain and fund mandate constraints.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 mb-12">
        {options.map((opt) => {
          const isSelected = selectedId === opt.id;
          return (
            <div 
              key={opt.id}
              onClick={() => setSelectedId(opt.id)}
              className={cn(
                "border rounded-xl p-6 cursor-pointer transition-all duration-300",
                isSelected 
                  ? "bg-card border-primary shadow-md ring-1 ring-primary/20" 
                  : "bg-card/50 border-border hover:border-primary/50"
              )}
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-start gap-4">
                  <div className={cn(
                    "w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5",
                    isSelected ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  )}>
                    {isSelected ? <CheckCircle2 className="w-4 h-4" /> : <div className="w-2 h-2 rounded-full bg-current" />}
                  </div>
                  <div>
                    <h3 className="text-xl font-serif text-foreground mb-2">{opt.title}</h3>
                    <div className="flex items-center gap-3">
                      <span className="px-2 py-0.5 bg-muted text-muted-foreground text-[10px] font-mono uppercase tracking-wider rounded">
                        {opt.risk}
                      </span>
                      <span className="flex items-center gap-1 text-[10px] font-mono text-[hsl(var(--chart-2))]">
                        <AlertCircle className="w-3 h-3" />
                        Uncertainty Index: {opt.uncertainty}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pl-10">
                <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-4">Fund Mandate Trade-off Profile</div>
                <div className="space-y-3">
                  {opt.tradeoffs.map((tradeoff, idx) => (
                    <div key={idx} className="flex items-center gap-4">
                      <div className="w-40 text-xs text-foreground">{tradeoff.label}</div>
                      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className={cn("h-full rounded-full", tradeoff.color)} 
                          style={{ width: `${tradeoff.value}%` }} 
                        />
                      </div>
                      <div className="w-8 text-right text-xs font-mono text-muted-foreground">{tradeoff.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-card border border-border rounded-xl p-8 shadow-sm">
        <h3 className="text-lg font-serif text-foreground mb-2">Investment Committee Reversal Conditions</h3>
        <p className="text-sm text-muted-foreground mb-6">What specific new information would cause the IC to revisit or reverse this capital deployment decision?</p>
        <Textarea 
          placeholder="E.g., If the Malaysian Ministry of Finance confirms the repatriation cap in its final Investment Act text, the full deployment becomes structurally incompatible with our liquidity mandate..."
          className="min-h-[120px] bg-background border-border resize-none mb-6"
        />
        <div className="flex justify-end">
          <Button 
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-mono uppercase tracking-wider text-xs px-8"
          >
            Commit Decision to Fund Memory
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
