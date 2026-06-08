import { useState } from "react";
import { useLocation } from "wouter";
import { CheckCircle2, AlertCircle, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const memoryLog = [
  {
    id: "m1",
    date: "Apr 10, 2025",
    question: "Capital deployment decision: NexPak Advanced Packaging Malaysia — $650M equity stake amid geopolitical and regulatory uncertainty",
    status: "unresolved",
    drift: "Investment Act amendment draft emerged; FDI repatriation risk elevated",
    nodes: 9,
    perspectives: 4
  },
  {
    id: "m2",
    date: "Nov 18, 2024",
    question: "Vietnam semiconductor assembly entry — Hanoi Chips consortium $420M greenfield vs. acquisition of VietSemi Holdings",
    status: "resolved",
    drift: "Greenfield option selected; land rights and incentive structure confirmed",
    nodes: 11,
    perspectives: 4
  },
  {
    id: "m3",
    date: "Jul 02, 2024",
    question: "Portfolio review: Should Meridian increase follow-on capital in Inari Amertron amid US-China export control expansion?",
    status: "resolved",
    drift: "Follow-on approved at $120M; BIS risk ring-fenced via dual supply chain structure",
    nodes: 14,
    perspectives: 3
  },
  {
    id: "m4",
    date: "Mar 22, 2024",
    question: "Country risk re-assessment: Indonesia battery materials JV following cabinet reshuffle and revised mining royalty framework",
    status: "unresolved",
    drift: "4 political assumptions shifted after March election — IC paused pending new minister confirmation",
    nodes: 8,
    perspectives: 3
  },
  {
    id: "m5",
    date: "Sep 14, 2023",
    question: "India OSAT entry thesis: Greenfield fab in Surat free trade zone versus anchor investment in Tata Electronics packaging unit",
    status: "resolved",
    drift: "Anchor investment selected; PLI scheme eligibility confirmed by Ministry of Electronics",
    nodes: 17,
    perspectives: 5
  }
];

export default function Memory() {
  const [, setLocation] = useLocation();
  const [filter, setFilter] = useState<"all" | "resolved" | "unresolved">("all");

  const filteredLog = memoryLog.filter(item => filter === "all" || item.status === filter);

  return (
    <div className="max-w-4xl mx-auto px-8 pt-24 pb-32">
      <div className="flex items-end justify-between mb-12">
        <div>
          <div className="inline-block px-3 py-1 bg-secondary/10 text-secondary text-xs uppercase tracking-wider font-mono font-bold rounded mb-4">
            Longitudinal Record
          </div>
          <h1 className="text-4xl font-serif text-foreground mb-4">Fund Decision Memory</h1>
          <p className="text-lg text-muted-foreground">Track the evolution of investment decisions and institutional knowledge across Meridian's deployment history.</p>
        </div>
        
        <div className="flex bg-muted/50 p-1 rounded-lg border border-border">
          <button 
            onClick={() => setFilter("all")}
            className={cn("px-4 py-2 text-xs font-mono uppercase tracking-wider rounded-md transition-colors", filter === "all" ? "bg-card shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground")}
          >
            All
          </button>
          <button 
            onClick={() => setFilter("resolved")}
            className={cn("px-4 py-2 text-xs font-mono uppercase tracking-wider rounded-md transition-colors", filter === "resolved" ? "bg-card shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground")}
          >
            Committed
          </button>
          <button 
            onClick={() => setFilter("unresolved")}
            className={cn("px-4 py-2 text-xs font-mono uppercase tracking-wider rounded-md transition-colors", filter === "unresolved" ? "bg-card shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground")}
          >
            Under Review
          </button>
        </div>
      </div>

      <div className="space-y-6 relative before:absolute before:inset-0 before:ml-6 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
        {filteredLog.map((item, idx) => (
          <div key={item.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
            <div className={cn(
              "flex items-center justify-center w-8 h-8 rounded-full border-4 border-background shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm absolute left-6 md:left-1/2 transform -translate-x-1/2",
              item.status === "resolved" ? "bg-[hsl(var(--chart-1))]" : "bg-[hsl(var(--chart-2))]"
            )}>
              {item.status === "resolved" ? (
                <CheckCircle2 className="w-4 h-4 text-white" />
              ) : (
                <AlertCircle className="w-4 h-4 text-white" />
              )}
            </div>

            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] ml-12 md:ml-0 p-6 rounded-xl border border-border bg-card shadow-sm hover:border-primary/50 hover:shadow-md transition-all cursor-pointer" onClick={() => setLocation("/terrain")}>
              <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground mb-3">
                <Clock className="w-3 h-3" />
                {item.date}
              </div>
              <h3 className="text-lg font-serif text-foreground mb-3 line-clamp-2">{item.question}</h3>
              
              <div className="flex items-center gap-2 mb-4">
                <span className={cn(
                  "px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider rounded",
                  item.status === "resolved" ? "bg-[hsl(var(--chart-1))]/10 text-[hsl(var(--chart-1))]" : "bg-[hsl(var(--chart-2))]/10 text-[hsl(var(--chart-2))]"
                )}>
                  {item.status === "resolved" ? "Committed" : "Under Review"}
                </span>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <ArrowRight className="w-3 h-3" />
                  {item.drift}
                </span>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex gap-4 text-xs font-mono text-muted-foreground">
                  <span>{item.nodes} Knowledge Nodes</span>
                  <span>{item.perspectives} Perspectives</span>
                </div>
                <Button variant="ghost" size="sm" className="h-6 text-xs text-primary hover:text-primary/80 px-2">
                  Restore State
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
