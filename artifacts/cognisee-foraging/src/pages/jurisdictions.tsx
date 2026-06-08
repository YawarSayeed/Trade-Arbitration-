// Jurisdictions Page — Venue Analysis
// Edit scores and content in src/lib/data.ts
import { useState } from "react";
import { JURISDICTIONS, STRESS_SCENARIOS, type Jurisdiction } from "@/lib/data";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CheckCircle2,
  XCircle,
  BookOpen,
  Lightbulb,
  ShieldAlert,
  Scale,
  Swords,
  ChevronRight,
  Zap,
  AlignLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

// ---- Score bar component ----
function ScoreBar({
  value,
  label,
  delta = 0,
}: {
  value: number;
  label: string;
  delta?: number;
}) {
  const adjusted = Math.max(0, Math.min(100, value + delta));
  const color =
    adjusted >= 80
      ? "bg-emerald-500"
      : adjusted >= 70
      ? "bg-amber-500"
      : "bg-red-500";
  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center">
        <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
          {label}
        </span>
        <div className="flex items-center gap-1.5">
          <span className="text-sm font-bold font-mono text-foreground">
            {adjusted}
          </span>
          {delta !== 0 && (
            <span
              className={cn(
                "text-[10px] font-mono",
                delta > 0 ? "text-emerald-400" : "text-red-400"
              )}
            >
              {delta > 0 ? `+${delta}` : delta}
            </span>
          )}
        </div>
      </div>
      <div className="h-1.5 rounded-full bg-muted/40 overflow-hidden">
        <motion.div
          className={cn("h-full rounded-full", color)}
          initial={{ width: `${value}%` }}
          animate={{ width: `${adjusted}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>
    </div>
  );
}

// ---- Venue card ----
function JurisdictionCard({
  j,
  stressDeltas,
  onClick,
  isSelected,
}: {
  j: Jurisdiction;
  stressDeltas: { winnability: number; enforcement: number };
  onClick: () => void;
  isSelected: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-xl border bg-card text-left transition-all duration-200 overflow-hidden w-full",
        isSelected
          ? "border-primary/60 shadow-lg shadow-primary/10"
          : "border-border/60 hover:border-primary/30"
      )}
    >
      <div className="p-5 border-b border-border/40">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{j.flag}</span>
            <span className="text-lg font-serif font-semibold text-foreground">
              {j.name}
            </span>
          </div>
          <ChevronRight
            className={cn(
              "w-4 h-4 transition-colors",
              isSelected ? "text-primary" : "text-muted-foreground"
            )}
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          <Badge
            variant="outline"
            className={cn(
              "text-[10px] font-mono",
              j.riskColor,
              "border-current/30 bg-current/5"
            )}
          >
            {j.strategicRisk} Strategic Risk
          </Badge>
          <Badge
            variant="outline"
            className="text-[10px] font-mono text-muted-foreground border-border/40"
          >
            Cost/Time: {j.costTimeRisk}
          </Badge>
        </div>
      </div>
      <div className="p-5 space-y-3">
        <ScoreBar
          value={j.winnability}
          label="Winnability"
          delta={stressDeltas.winnability}
        />
        <ScoreBar
          value={j.proceduralConfidence}
          label="Procedural Confidence"
        />
        <ScoreBar
          value={j.enforcementConfidence}
          label="Enforcement Confidence"
          delta={stressDeltas.enforcement}
        />
        <ScoreBar value={j.precedentAlignment} label="Precedent Alignment" />
      </div>
    </button>
  );
}

// ---- Deep Dive Sheet ----
function DeepDiveSheet({
  j,
  open,
  onClose,
}: {
  j: Jurisdiction | null;
  open: boolean;
  onClose: () => void;
}) {
  if (!j) return null;
  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-2xl overflow-y-auto bg-card border-border/60 p-0"
      >
        <SheetHeader className="p-6 border-b border-border/50 sticky top-0 bg-card z-10">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{j.flag}</span>
            <div>
              <SheetTitle className="font-serif text-xl text-foreground">
                {j.name}
              </SheetTitle>
              <div className={cn("text-xs font-mono", j.riskColor)}>
                Strategic Risk: {j.strategicRisk}
              </div>
            </div>
          </div>
        </SheetHeader>

        <div className="p-6 space-y-6">
          {/* Scores */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Winnability", value: j.winnability },
              { label: "Procedural Confidence", value: j.proceduralConfidence },
              {
                label: "Enforcement Confidence",
                value: j.enforcementConfidence,
              },
              { label: "Precedent Alignment", value: j.precedentAlignment },
            ].map((s) => {
              const color =
                s.value >= 80
                  ? "text-emerald-400"
                  : s.value >= 70
                  ? "text-amber-400"
                  : "text-red-400";
              return (
                <div
                  key={s.label}
                  className="rounded-lg border border-border/40 bg-muted/20 p-3 text-center"
                >
                  <div className={cn("text-3xl font-bold font-mono", color)}>
                    {s.value}
                  </div>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mt-1">
                    {s.label}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Why helps / hurts */}
          <div className="grid grid-cols-1 gap-4">
            <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-4">
              <div className="flex items-center gap-2 mb-3 text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
                <span className="text-xs font-mono uppercase tracking-wider font-semibold">
                  Why this venue may help
                </span>
              </div>
              <ul className="space-y-2">
                {j.whyHelps.map((item, i) => (
                  <li key={i} className="text-sm text-foreground/80 flex gap-2">
                    <span className="text-emerald-400/60 mt-0.5">→</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-4">
              <div className="flex items-center gap-2 mb-3 text-red-400">
                <XCircle className="w-4 h-4" />
                <span className="text-xs font-mono uppercase tracking-wider font-semibold">
                  Why this venue may hurt
                </span>
              </div>
              <ul className="space-y-2">
                {j.whyHurts.map((item, i) => (
                  <li key={i} className="text-sm text-foreground/80 flex gap-2">
                    <span className="text-red-400/60 mt-0.5">→</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Precedent Clusters */}
          <div>
            <div className="flex items-center gap-2 mb-3 text-muted-foreground">
              <BookOpen className="w-4 h-4 text-primary" />
              <span className="text-xs font-mono uppercase tracking-wider font-semibold text-primary">
                Wisdom Vault Signals · Precedent Clusters
              </span>
            </div>
            <div className="space-y-3">
              {j.precedentClusters.map((c, i) => (
                <div
                  key={i}
                  className="rounded-lg border border-border/40 bg-muted/10 p-4"
                >
                  <div className="text-sm font-semibold text-foreground mb-1">
                    {c.title}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {c.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Tacit Signals */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-mono uppercase tracking-wider font-semibold text-amber-400">
                Tacit Expert Signals
              </span>
            </div>
            <ul className="space-y-2">
              {j.tacitSignals.map((s, i) => (
                <li
                  key={i}
                  className="flex gap-2 text-sm text-foreground/80 bg-amber-500/5 border border-amber-500/15 rounded-lg p-3"
                >
                  <span className="text-amber-400/60 mt-0.5 shrink-0">◆</span>
                  {s}
                </li>
              ))}
            </ul>
          </div>

          {/* Procedural Risk */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <ShieldAlert className="w-4 h-4 text-red-400" />
              <span className="text-xs font-mono uppercase tracking-wider font-semibold text-red-400">
                Procedural Risk
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed bg-red-500/5 border border-red-500/15 rounded-lg p-4">
              {j.proceduralRisk}
            </p>
          </div>

          {/* Enforcement */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Scale className="w-4 h-4 text-primary" />
              <span className="text-xs font-mono uppercase tracking-wider font-semibold text-primary">
                Enforcement Considerations
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed bg-primary/5 border border-primary/15 rounded-lg p-4">
              {j.enforcementConsiderations}
            </p>
          </div>

          {/* Adversary Response */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Swords className="w-4 h-4 text-orange-400" />
              <span className="text-xs font-mono uppercase tracking-wider font-semibold text-orange-400">
                Adversary Strategy · Likely Response
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed bg-orange-500/5 border border-orange-500/15 rounded-lg p-4">
              {j.adversaryResponse}
            </p>
          </div>

          {/* Next Steps */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <ChevronRight className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-mono uppercase tracking-wider font-semibold text-emerald-400">
                What Senior Arbitration Counsel Would Test Next
              </span>
            </div>
            <ol className="space-y-2">
              {j.counselNextSteps.map((step, i) => (
                <li
                  key={i}
                  className="flex gap-3 text-sm text-foreground/80 bg-muted/20 rounded-lg p-3"
                >
                  <span className="text-primary font-mono text-xs font-bold w-5 shrink-0 mt-0.5">
                    {i + 1}.
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

// ---- Compare Panel ----
function ComparePanel({ onClose }: { onClose: () => void }) {
  const top2 = JURISDICTIONS.slice()
    .sort((a, b) => b.winnability - a.winnability)
    .slice(0, 2);
  return (
    <div className="rounded-xl border border-primary/30 bg-card overflow-hidden">
      <div className="px-6 py-4 border-b border-border/50 flex items-center justify-between">
        <span className="text-sm font-semibold text-foreground font-serif">
          Top Two Venue Comparison
        </span>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="text-xs text-muted-foreground"
        >
          Close
        </Button>
      </div>
      <div className="grid grid-cols-2 divide-x divide-border/40 p-6 gap-6">
        {top2.map((j) => (
          <div key={j.id} className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{j.flag}</span>
              <span className="font-serif font-semibold text-foreground">
                {j.name}
              </span>
            </div>
            <div className="space-y-3">
              {[
                { label: "Winnability", value: j.winnability },
                { label: "Procedural", value: j.proceduralConfidence },
                { label: "Enforcement", value: j.enforcementConfidence },
                { label: "Precedent", value: j.precedentAlignment },
              ].map((s) => (
                <ScoreBar key={s.label} value={s.value} label={s.label} />
              ))}
            </div>
            <div className="text-xs text-muted-foreground space-y-1">
              <div className="font-mono uppercase tracking-wider text-[10px] text-primary">
                Key Advantage
              </div>
              <p className="leading-relaxed">{j.whyHelps[0]}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---- Stress Test Panel ----
function StressTestPanel({ onClose }: { onClose: () => void }) {
  const { activeStressScenarios, toggleStressScenario } = useStore();

  return (
    <div className="rounded-xl border border-amber-500/30 bg-card overflow-hidden">
      <div className="px-6 py-4 border-b border-border/50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-amber-400" />
          <span className="text-sm font-semibold text-foreground font-serif">
            Stress Test Case
          </span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="text-xs text-muted-foreground"
        >
          Close
        </Button>
      </div>
      <div className="p-4 text-xs text-muted-foreground bg-amber-500/5 border-b border-amber-500/20">
        Select one or more scenarios to see how venue scores shift under
        different assumptions.
      </div>
      <div className="p-4 space-y-3">
        {STRESS_SCENARIOS.map((s) => {
          const active = activeStressScenarios.includes(s.id);
          return (
            <button
              key={s.id}
              onClick={() => toggleStressScenario(s.id)}
              className={cn(
                "w-full text-left rounded-lg border p-3 transition-all",
                active
                  ? "border-amber-500/50 bg-amber-500/10"
                  : "border-border/40 hover:border-amber-500/30 bg-muted/10"
              )}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div
                    className={cn(
                      "text-sm font-medium",
                      active ? "text-amber-300" : "text-foreground"
                    )}
                  >
                    {s.label}
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    {s.description}
                  </div>
                </div>
                <div
                  className={cn(
                    "shrink-0 w-4 h-4 rounded-full border-2 mt-0.5",
                    active
                      ? "bg-amber-400 border-amber-400"
                      : "border-border/60"
                  )}
                />
              </div>
              {active && (
                <div className="mt-2 text-xs text-amber-200/70 bg-amber-500/10 rounded p-2 font-mono">
                  {s.impact}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ---- Main export ----
export default function Jurisdictions() {
  const {
    activeView,
    setActiveView,
    stressTestOpen,
    setStressTestOpen,
    activeStressScenarios,
    compareModeOpen,
    setCompareModeOpen,
  } = useStore();

  const [deepDiveId, setDeepDiveId] = useState<string | null>(null);
  const deepDiveJurisdiction =
    JURISDICTIONS.find((j) => j.id === deepDiveId) ?? null;

  // Compute aggregate stress deltas per jurisdiction
  function getStressDeltas(jId: string) {
    let winnability = 0;
    let enforcement = 0;
    for (const sid of activeStressScenarios) {
      const s = STRESS_SCENARIOS.find((x) => x.id === sid);
      if (s) {
        const d = s.scoreDeltas[jId as keyof typeof s.scoreDeltas];
        if (d) {
          winnability += d.winnability;
          enforcement += d.enforcement;
        }
      }
    }
    return { winnability, enforcement };
  }

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-serif font-semibold text-foreground">
            Venue Analysis
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Explore and compare arbitral seats for{" "}
            <span className="text-foreground">
              Atlas Renewables v. Meridian Ports Authority
            </span>
          </p>
        </div>

        {/* Action bar */}
        <div className="flex flex-wrap gap-2">
          {/* Score / Reasoning toggle */}
          <div className="rounded-lg border border-border/60 bg-muted/20 p-0.5 flex">
            <button
              onClick={() => setActiveView("score")}
              className={cn(
                "px-3 py-1.5 rounded text-xs font-mono uppercase tracking-wider transition-colors",
                activeView === "score"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Score View
            </button>
            <button
              onClick={() => setActiveView("reasoning")}
              className={cn(
                "px-3 py-1.5 rounded text-xs font-mono uppercase tracking-wider transition-colors",
                activeView === "reasoning"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Reasoning View
            </button>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setStressTestOpen(!stressTestOpen)}
            className={cn(
              "text-xs font-mono gap-2",
              stressTestOpen
                ? "border-amber-500/50 text-amber-400"
                : "border-border/60"
            )}
          >
            <Zap className="w-3.5 h-3.5" />
            Stress Test Case
            {activeStressScenarios.length > 0 && (
              <span className="bg-amber-500 text-black rounded-full w-4 h-4 flex items-center justify-center text-[10px] font-bold">
                {activeStressScenarios.length}
              </span>
            )}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCompareModeOpen(!compareModeOpen)}
            className={cn(
              "text-xs font-mono gap-2",
              compareModeOpen
                ? "border-primary/50 text-primary"
                : "border-border/60"
            )}
          >
            <AlignLeft className="w-3.5 h-3.5" />
            Compare Top Two Venues
          </Button>
        </div>
      </div>

      {/* Stress test panel */}
      <AnimatePresence>
        {stressTestOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            <StressTestPanel onClose={() => setStressTestOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Compare panel */}
      <AnimatePresence>
        {compareModeOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            <ComparePanel onClose={() => setCompareModeOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Score / Reasoning views */}
      {activeView === "score" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {JURISDICTIONS.map((j) => (
            <JurisdictionCard
              key={j.id}
              j={j}
              stressDeltas={getStressDeltas(j.id)}
              onClick={() => setDeepDiveId(j.id)}
              isSelected={deepDiveId === j.id}
            />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {JURISDICTIONS.map((j) => (
            <div
              key={j.id}
              className="rounded-xl border border-border/60 bg-card overflow-hidden"
            >
              <div className="p-5 border-b border-border/40 flex items-center gap-3">
                <span className="text-2xl">{j.flag}</span>
                <span className="font-serif font-semibold text-lg text-foreground">
                  {j.name}
                </span>
                <Badge
                  variant="outline"
                  className={cn(
                    "ml-auto text-[10px] font-mono",
                    j.riskColor,
                    "border-current/30"
                  )}
                >
                  {j.strategicRisk} Risk
                </Badge>
              </div>
              <div className="grid md:grid-cols-2 divide-x divide-border/40">
                <div className="p-5">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 mb-3">
                    Why this venue may help
                  </div>
                  <ul className="space-y-2">
                    {j.whyHelps.map((h, i) => (
                      <li key={i} className="text-sm text-foreground/80 flex gap-2">
                        <span className="text-emerald-400/60 shrink-0 mt-0.5">→</span>
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-5">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-red-400 mb-3">
                    Why this venue may hurt
                  </div>
                  <ul className="space-y-2">
                    {j.whyHurts.map((h, i) => (
                      <li key={i} className="text-sm text-foreground/80 flex gap-2">
                        <span className="text-red-400/60 shrink-0 mt-0.5">→</span>
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="px-5 py-3 border-t border-border/40 flex justify-end">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs font-mono gap-1 text-primary"
                  onClick={() => setDeepDiveId(j.id)}
                >
                  Full Deep Dive <ChevronRight className="w-3 h-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Deep dive sheet */}
      <DeepDiveSheet
        j={deepDiveJurisdiction}
        open={deepDiveId !== null}
        onClose={() => setDeepDiveId(null)}
      />
    </div>
  );
}
