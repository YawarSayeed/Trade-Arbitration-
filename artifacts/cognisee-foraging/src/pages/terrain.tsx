import { useState } from "react";
import { useStore } from "@/lib/store";
import { ZoomIn, ZoomOut, Maximize, Target } from "lucide-react";
import { Button } from "@/components/ui/button";

const nodes = [
  { id: 1, label: "Malaysia CHIPS-equivalent incentive confirmed", type: "known", x: 30, y: 25 },
  { id: 2, label: "NexPak EBITDA margin 22% (audited)", type: "known", x: 55, y: 20 },
  { id: 3, label: "US-China export control spillover risk", type: "disputed", x: 75, y: 30 },
  { id: 4, label: "Host government stability (18-month window)", type: "hypothesized", x: 20, y: 55 },
  { id: 5, label: "FDI repatriation restrictions under review", type: "disputed", x: 50, y: 52 },
  { id: 6, label: "Successor CEO capabilities post-founder exit", type: "unknown", x: 80, y: 60 },
  { id: 7, label: "Competing SWF term sheet from GIC", type: "unknown", x: 35, y: 78 },
  { id: 8, label: "Currency hedge cost at current MYR/USD rate", type: "known", x: 65, y: 82 },
  { id: 9, label: "Advanced packaging demand surge (CoWoS, SoIC)", type: "known", x: 15, y: 35 },
];

const connections = [
  { source: 2, target: 5 },
  { source: 1, target: 4 },
  { source: 4, target: 5 },
  { source: 3, target: 5 },
  { source: 3, target: 7 },
  { source: 6, target: 7 },
  { source: 5, target: 8 },
  { source: 9, target: 2 },
  { source: 4, target: 6 },
];

export default function Terrain() {
  const setProvenance = useStore((state) => state.setProvenance);
  const [timeState, setTimeState] = useState(1);

  const getNodeColor = (type: string) => {
    switch (type) {
      case "known": return "bg-[hsl(var(--chart-1))]";
      case "hypothesized": return "bg-[hsl(var(--chart-2))] border-2 border-dashed border-[hsl(var(--chart-2))] bg-transparent";
      case "disputed": return "bg-[hsl(var(--chart-3))]";
      case "unknown": return "border-2 border-[hsl(var(--chart-4))] bg-transparent";
      default: return "bg-gray-500";
    }
  };

  const handleNodeClick = (node: any) => {
    setProvenance({
      sourceType: node.type === "known" ? "Verified Intelligence" : node.type === "hypothesized" ? "Institutional Inference" : "Contested Signal",
      contributorRole: node.type === "known" ? "Country Risk Director" : "Senior Investment Officer",
      context: "Malaysia Deal Room — NexPak IC-550 Series",
      jurisdiction: "Malaysia / Federal Investment Authority",
      rights: "Investment Committee Restricted",
      timestamp: `Assessed: Mar ${10 + node.id}, 2025`
    });
  };

  return (
    <div className="h-full flex">
      {/* Map Area */}
      <div className="flex-1 relative bg-[#F4F1EA]/50 overflow-hidden">
        <div className="absolute top-6 left-6 z-10 bg-card/90 backdrop-blur-sm border border-border p-4 rounded-lg shadow-sm">
          <div className="text-xs uppercase font-mono tracking-wider font-bold mb-3 text-foreground">Epistemic Legend</div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs text-muted-foreground"><div className="w-3 h-3 rounded-full bg-[hsl(var(--chart-1))]"></div> Confirmed</div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground"><div className="w-3 h-3 rounded-full border border-dashed border-[hsl(var(--chart-2))]"></div> Hypothesized</div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground"><div className="w-3 h-3 rounded-full bg-[hsl(var(--chart-3))] opacity-80" style={{ backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(255,255,255,0.5) 2px, rgba(255,255,255,0.5) 4px)" }}></div> Disputed</div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground"><div className="w-3 h-3 rounded-full border border-[hsl(var(--chart-4))]"></div> Unknown</div>
          </div>
        </div>

        <div className="absolute bottom-6 right-6 z-10 flex flex-col gap-2">
          <Button variant="outline" size="icon" className="bg-card shadow-sm"><ZoomIn className="w-4 h-4" /></Button>
          <Button variant="outline" size="icon" className="bg-card shadow-sm"><ZoomOut className="w-4 h-4" /></Button>
          <Button variant="outline" size="icon" className="bg-card shadow-sm"><Maximize className="w-4 h-4" /></Button>
        </div>

        {/* Mock Canvas */}
        <div className="absolute inset-0 p-12">
          <div className="w-full h-full relative">
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {connections.map((conn, i) => {
                const s = nodes.find(n => n.id === conn.source);
                const t = nodes.find(n => n.id === conn.target);
                if (!s || !t) return null;
                if (timeState === 0 && i > 3) return null;
                
                return (
                  <line 
                    key={i}
                    x1={`${s.x}%`} y1={`${s.y}%`}
                    x2={`${t.x}%`} y2={`${t.y}%`}
                    stroke="hsl(var(--border))"
                    strokeWidth="2"
                    strokeDasharray={t.type === "hypothesized" ? "4 4" : "none"}
                  />
                );
              })}
            </svg>

            {nodes.map((node) => {
              if (timeState === 0 && node.id > 6) return null;
              
              return (
                <div 
                  key={node.id}
                  onClick={() => handleNodeClick(node)}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                  style={{ left: `${node.x}%`, top: `${node.y}%` }}
                >
                  <div className={`w-8 h-8 rounded-full shadow-sm flex items-center justify-center transition-transform group-hover:scale-110 ${getNodeColor(node.type)}`}
                       style={node.type === 'disputed' ? { backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(255,255,255,0.5) 2px, rgba(255,255,255,0.5) 4px)" } : {}}
                  >
                    {node.type === "unknown" && <div className="w-1 h-1 rounded-full bg-[hsl(var(--chart-4))]" />}
                  </div>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-36 text-center">
                    <span className="text-[10px] font-medium leading-tight bg-card/80 backdrop-blur px-2 py-1 rounded shadow-sm border border-border inline-block">
                      {node.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-80 border-l border-border bg-card p-6 flex flex-col gap-8 shrink-0 overflow-y-auto">
        <div>
          <h3 className="text-xs uppercase font-mono tracking-wider font-bold mb-4">Confidence Distribution</h3>
          <div className="flex h-3 rounded-full overflow-hidden mb-2">
            <div className="bg-[hsl(var(--chart-1))] w-[35%]" title="Confirmed"></div>
            <div className="bg-[hsl(var(--chart-2))] w-[22%]" title="Hypothesized"></div>
            <div className="bg-[hsl(var(--chart-3))] w-[22%]" title="Disputed"></div>
            <div className="bg-[hsl(var(--chart-4))] w-[21%]" title="Unknown"></div>
          </div>
          <div className="flex justify-between text-[10px] font-mono text-muted-foreground">
            <span>High Confidence</span>
            <span>Unknown</span>
          </div>
        </div>

        <div>
          <h3 className="text-xs uppercase font-mono tracking-wider font-bold mb-4">Critical Missing Intelligence</h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-2 text-sm text-foreground bg-background p-3 rounded-md border border-border">
              <Target className="w-4 h-4 text-[hsl(var(--chart-4))] shrink-0 mt-0.5" />
              <span>Competing GIC term sheet details and co-investment appetite</span>
            </li>
            <li className="flex items-start gap-2 text-sm text-foreground bg-background p-3 rounded-md border border-border">
              <Target className="w-4 h-4 text-[hsl(var(--chart-4))] shrink-0 mt-0.5" />
              <span>Successor management capabilities following founder exit in Q3 2025</span>
            </li>
            <li className="flex items-start gap-2 text-sm text-foreground bg-background p-3 rounded-md border border-border">
              <Target className="w-4 h-4 text-[hsl(var(--chart-3))] shrink-0 mt-0.5" />
              <span>FDI repatriation policy outcome — Ministry of Finance review pending</span>
            </li>
          </ul>
        </div>

        <div className="mt-auto pt-6 border-t border-border">
          <h3 className="text-xs uppercase font-mono tracking-wider font-bold mb-4">Temporal Evolution</h3>
          <div className="px-2">
            <input 
              type="range" 
              min="0" max="2" 
              step="1"
              value={timeState}
              onChange={(e) => setTimeState(parseInt(e.target.value))}
              className="w-full accent-primary"
            />
            <div className="flex justify-between text-[10px] font-mono text-muted-foreground mt-2">
              <span>T-6mo (Initial DD)</span>
              <span>T-3mo</span>
              <span>T-0 (IC Review)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
