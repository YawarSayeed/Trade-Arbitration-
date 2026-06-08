// Foraging Map — Interactive Epistemic Foraging Node Graph
// Edit node content in src/lib/data.ts — FORAGING_NODES array
import { FORAGING_NODES, JURISDICTIONS, type ForagingNode } from "@/lib/data";
import { useStore } from "@/lib/store";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Info, BookOpen, BarChart2, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const JURISDICTION_META: Record<string, { flag: string; name: string }> = {
  "new-york": { flag: "🇺🇸", name: "New York" },
  london: { flag: "🇬🇧", name: "London" },
  singapore: { flag: "🇸🇬", name: "Singapore" },
  "hong-kong": { flag: "🇭🇰", name: "Hong Kong" },
};

// SVG connection edges between nearby nodes (pairs of node IDs)
const EDGES: [string, string][] = [
  ["contract-text", "governing-law"],
  ["contract-text", "force-majeure"],
  ["contract-text", "expert-judgment"],
  ["governing-law", "sovereign-counterparty"],
  ["force-majeure", "sovereign-counterparty"],
  ["sovereign-counterparty", "tribunal-composition"],
  ["sovereign-counterparty", "enforcement-pathway"],
  ["sovereign-counterparty", "public-sector"],
  ["tribunal-composition", "prior-patterns"],
  ["enforcement-pathway", "local-court-support"],
  ["evidence-credibility", "force-majeure"],
  ["evidence-credibility", "prior-patterns"],
  ["settlement-leverage", "public-sector"],
  ["settlement-leverage", "enforcement-pathway"],
  ["expert-judgment", "sovereign-counterparty"],
  ["local-court-support", "prior-patterns"],
];

function NodeInfoSheet({
  node,
  open,
  onClose,
}: {
  node: ForagingNode | null;
  open: boolean;
  onClose: () => void;
}) {
  if (!node) return null;

  const confidenceColor = {
    High: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
    Medium: "text-amber-400 border-amber-500/30 bg-amber-500/10",
    Low: "text-red-400 border-red-500/30 bg-red-500/10",
  }[node.confidence];

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-xl overflow-y-auto bg-card border-border/60 p-0"
      >
        <SheetHeader className="p-6 border-b border-border/50 sticky top-0 bg-card z-10">
          <div className="flex items-start justify-between gap-3">
            <div>
              <SheetTitle className="font-serif text-xl text-foreground">
                {node.label}
              </SheetTitle>
              <div className="flex items-center gap-2 mt-2">
                <Badge
                  variant="outline"
                  className={cn("text-[10px] font-mono", confidenceColor)}
                >
                  Confidence: {node.confidence}
                </Badge>
              </div>
            </div>
          </div>
        </SheetHeader>

        <div className="p-6 space-y-6">
          {/* What it is */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Info className="w-4 h-4 text-primary" />
              <span className="text-xs font-mono uppercase tracking-wider font-semibold text-primary">
                What this factor means
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed bg-muted/20 rounded-lg p-4">
              {node.what}
            </p>
          </div>

          {/* Why it matters */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <BarChart2 className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-mono uppercase tracking-wider font-semibold text-amber-400">
                Why it matters
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed bg-amber-500/5 border border-amber-500/15 rounded-lg p-4">
              {node.why}
            </p>
          </div>

          {/* Jurisdiction impact */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-mono uppercase tracking-wider font-semibold text-foreground">
                Jurisdiction Impact
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(node.jurisdictionImpact).map(([jid, impact]) => {
                const meta = JURISDICTION_META[jid];
                const impactStyles = {
                  strengthens:
                    "text-emerald-400 border-emerald-500/25 bg-emerald-500/8",
                  weakens: "text-red-400 border-red-500/25 bg-red-500/8",
                  neutral:
                    "text-muted-foreground border-border/40 bg-muted/10",
                };
                return (
                  <div
                    key={jid}
                    className={cn(
                      "rounded-lg border p-3 flex items-center justify-between",
                      impactStyles[impact]
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-base">{meta.flag}</span>
                      <span className="text-sm font-medium">{meta.name}</span>
                    </div>
                    <span className="text-[10px] font-mono uppercase">
                      {impact}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Evidence needed */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="w-4 h-4 text-primary" />
              <span className="text-xs font-mono uppercase tracking-wider font-semibold text-primary">
                Evidence the Legal Team Should Collect Next
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed bg-primary/5 border border-primary/15 rounded-lg p-4">
              {node.evidenceNeeded}
            </p>
          </div>

          {/* Uncertainty */}
          <div className="rounded-lg border border-amber-500/25 bg-amber-500/5 p-4">
            <div className="text-[10px] font-mono uppercase tracking-wider text-amber-400 mb-2">
              Uncertainty Notes
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {node.uncertainty}
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function ForagingMapSVG({
  selectedId,
  onSelect,
}: {
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  // Build a lookup for node positions
  const nodePos = Object.fromEntries(
    FORAGING_NODES.map((n) => [n.id, { x: n.x, y: n.y }])
  );

  return (
    <div className="relative w-full" style={{ paddingBottom: "65%" }}>
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 w-full h-full"
        style={{ overflow: "visible" }}
      >
        {/* Edges */}
        {EDGES.map(([a, b], i) => {
          const pa = nodePos[a];
          const pb = nodePos[b];
          if (!pa || !pb) return null;
          const sel = selectedId === a || selectedId === b;
          return (
            <line
              key={i}
              x1={pa.x}
              y1={pa.y}
              x2={pb.x}
              y2={pb.y}
              stroke={sel ? "rgba(var(--primary) / 0.5)" : "rgba(255,255,255,0.08)"}
              strokeWidth={sel ? 0.4 : 0.25}
            />
          );
        })}

        {/* Nodes */}
        {FORAGING_NODES.map((node) => {
          const isSelected = selectedId === node.id;
          const confidence = node.confidence;
          const fillColor =
            confidence === "High"
              ? "#10b981"
              : confidence === "Medium"
              ? "#f59e0b"
              : "#ef4444";

          return (
            <g
              key={node.id}
              onClick={() => onSelect(node.id)}
              style={{ cursor: "pointer" }}
            >
              {/* Glow ring for selected */}
              {isSelected && (
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={5.5}
                  fill="none"
                  stroke={fillColor}
                  strokeWidth={0.5}
                  opacity={0.5}
                />
              )}
              <circle
                cx={node.x}
                cy={node.y}
                r={isSelected ? 3.8 : 3}
                fill={isSelected ? fillColor : `${fillColor}40`}
                stroke={fillColor}
                strokeWidth={0.5}
              />
              <text
                x={node.x}
                y={node.y + 5.5}
                textAnchor="middle"
                fontSize="3.2"
                fill={isSelected ? "#f8fafc" : "#94a3b8"}
                fontFamily="monospace"
                style={{ pointerEvents: "none", userSelect: "none" }}
              >
                {node.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export default function ForagingMap() {
  const { selectedForagingNode, setSelectedForagingNode } = useStore();
  const selectedNode =
    FORAGING_NODES.find((n) => n.id === selectedForagingNode) ?? null;

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-serif font-semibold text-foreground">
          Epistemic Foraging Map
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Click any node to explore how each factor shapes venue selection.
          Node color reflects confidence level — green (high), amber (medium), red (low).
        </p>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4">
        {[
          { color: "bg-emerald-500", label: "High Confidence" },
          { color: "bg-amber-500", label: "Medium Confidence" },
          { color: "bg-red-500", label: "Low Confidence" },
        ].map((l) => (
          <div key={l.label} className="flex items-center gap-2">
            <div className={cn("w-3 h-3 rounded-full", l.color)} />
            <span className="text-[11px] font-mono text-muted-foreground">
              {l.label}
            </span>
          </div>
        ))}
        <div className="ml-auto text-[11px] font-mono text-muted-foreground">
          {FORAGING_NODES.length} epistemic factors mapped
        </div>
      </div>

      {/* Map */}
      <div className="rounded-xl border border-border/60 bg-card p-6">
        <ForagingMapSVG
          selectedId={selectedForagingNode}
          onSelect={(id) =>
            setSelectedForagingNode(selectedForagingNode === id ? null : id)
          }
        />
      </div>

      {/* Quick node list */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {FORAGING_NODES.map((node) => {
          const isSelected = selectedForagingNode === node.id;
          const confidenceColor =
            node.confidence === "High"
              ? "text-emerald-400 border-emerald-500/20"
              : node.confidence === "Medium"
              ? "text-amber-400 border-amber-500/20"
              : "text-red-400 border-red-500/20";
          return (
            <motion.button
              key={node.id}
              onClick={() =>
                setSelectedForagingNode(
                  selectedForagingNode === node.id ? null : node.id
                )
              }
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                "rounded-lg border p-3 text-left transition-all text-xs",
                isSelected
                  ? "border-primary/50 bg-primary/10 text-primary"
                  : `${confidenceColor} bg-muted/10 hover:bg-muted/20 text-foreground/70`
              )}
            >
              <div className="font-medium text-sm leading-snug">
                {node.label}
              </div>
              <div
                className={cn(
                  "text-[10px] font-mono mt-1",
                  isSelected ? "text-primary/70" : "text-muted-foreground"
                )}
              >
                {node.confidence} confidence
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Node info sheet */}
      <NodeInfoSheet
        node={selectedNode}
        open={selectedForagingNode !== null}
        onClose={() => setSelectedForagingNode(null)}
      />
    </div>
  );
}
