// Tacit Counsel Layer — Structured expert judgment
// Edit insights in src/lib/data.ts — TACIT_INSIGHTS array
import { useState } from "react";
import { TACIT_INSIGHTS } from "@/lib/data";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import {
  BrainCircuit,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  MessageSquareQuote,
  Shield,
} from "lucide-react";
import { cn } from "@/lib/utils";

const TAG_COLORS: Record<string, string> = {
  "Institutional Judgment":
    "text-primary border-primary/25 bg-primary/8",
  "Strategic Judgment":
    "text-amber-400 border-amber-500/25 bg-amber-500/8",
  "Enforcement Intelligence":
    "text-emerald-400 border-emerald-500/25 bg-emerald-500/8",
  "Adversary Intelligence":
    "text-red-400 border-red-500/25 bg-red-500/8",
  "Risk-Conditional":
    "text-orange-400 border-orange-500/25 bg-orange-500/8",
  "Partner-Level Judgment":
    "text-purple-400 border-purple-500/25 bg-purple-500/8",
};

function InsightCard({ insight }: { insight: (typeof TACIT_INSIGHTS)[number] }) {
  const [expanded, setExpanded] = useState(false);
  const tagStyle = TAG_COLORS[insight.tag] ?? "text-muted-foreground border-border/40";

  return (
    <motion.div
      layout
      className="rounded-xl border border-border/60 bg-card overflow-hidden"
    >
      <button
        onClick={() => setExpanded((e) => !e)}
        className="w-full text-left p-5 flex items-start gap-4 hover:bg-muted/10 transition-colors"
      >
        <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 mt-0.5">
          <BrainCircuit className="w-4 h-4 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-2">
            <Badge
              variant="outline"
              className={cn("text-[10px] font-mono", tagStyle)}
            >
              {insight.tag}
            </Badge>
          </div>
          <h3 className="text-sm font-semibold text-foreground font-serif leading-snug">
            {insight.title}
          </h3>
        </div>
        <div className="shrink-0 text-muted-foreground">
          {expanded ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </div>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            <div className="px-5 pb-5 pt-0 space-y-4 border-t border-border/40">
              {/* Main insight */}
              <div className="pt-4">
                <div className="flex items-center gap-2 mb-2">
                  <MessageSquareQuote className="w-3.5 h-3.5 text-muted-foreground" />
                  <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                    Structured Expert Insight
                  </span>
                </div>
                <p className="text-sm text-foreground/85 leading-relaxed bg-muted/20 rounded-lg p-4">
                  {insight.insight}
                </p>
              </div>

              {/* Implication */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="w-3.5 h-3.5 text-primary" />
                  <span className="text-[10px] font-mono uppercase tracking-wider text-primary">
                    Filing Implication
                  </span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed bg-primary/5 border border-primary/15 rounded-lg p-4">
                  {insight.implication}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function TacitCounsel() {
  const { counterargsOpen, setCounterargsOpen } = useStore();

  const counterarguments = [
    {
      title: "Force majeure notice non-compliance as threshold bar",
      body: "Respondent will argue that the 14-day notice gap is fatal to the claim regardless of the merits of the disruption event. This argument has prevailed in LCIA and ICC proceedings where notice timelines were treated as conditions precedent rather than procedural formalities.",
    },
    {
      title: "Sovereign immunity as preliminary jurisdictional objection",
      body: "MPA will assert that as a government-linked port authority, it is entitled to sovereign immunity from arbitration proceedings absent an express waiver. The strategy will be to delay proceedings at the preliminary stage while pursuing anti-suit relief in the home jurisdiction.",
    },
    {
      title: "Claimant's mitigation characterized as commercially unreasonable",
      body: "Respondent will argue that Atlas Renewables had multiple commercially viable alternatives during the disruption period and failed to pursue them. This transforms the claim from breach compensation into a mitigation failure question.",
    },
    {
      title: "Challenge to SIAC seat as unavailable under contract",
      body: "If the contract clause is ambiguous, Respondent will argue that no Asian seat was available and that the parties intended a European seat (London or Geneva). This creates a preliminary jurisdiction battle that delays proceedings by 6-18 months.",
    },
    {
      title: "Tariff shock characterized as foreseeable market risk",
      body: "Respondent will argue that the tariff disruptions that contributed to the port access issues were widely anticipated market developments that Atlas Renewables accepted as commercial risk when entering the procurement contract.",
    },
  ];

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <BrainCircuit className="w-6 h-6 text-primary" />
          <h1 className="text-2xl font-serif font-semibold text-foreground">
            Tacit Counsel Layer
          </h1>
        </div>
        <p className="text-muted-foreground text-sm leading-relaxed max-w-2xl">
          Structured expert arbitration judgment that cannot be found in case law
          databases. Cognisee surfaces tacit knowledge to support better
          decision-making — not to replace lawyers.
        </p>
      </div>

      {/* Action: Show Counterarguments */}
      <div className="flex gap-3 flex-wrap">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCounterargsOpen(!counterargsOpen)}
          className={cn(
            "text-xs font-mono gap-2",
            counterargsOpen
              ? "border-red-500/40 text-red-400"
              : "border-border/60"
          )}
        >
          <AlertTriangle className="w-3.5 h-3.5" />
          {counterargsOpen ? "Hide Counterarguments" : "Show Counterarguments"}
        </Button>
      </div>

      {/* Counterarguments panel */}
      <AnimatePresence>
        {counterargsOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="rounded-xl border border-red-500/25 bg-red-500/5 overflow-hidden"
          >
            <div className="px-6 py-4 border-b border-red-500/20 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-400" />
              <span className="text-sm font-semibold text-red-300 font-serif">
                Respondent Counterarguments · Decision Pathways
              </span>
            </div>
            <div className="p-4 space-y-3">
              {counterarguments.map((ca, i) => (
                <div
                  key={i}
                  className="rounded-lg border border-red-500/15 bg-red-500/5 p-4"
                >
                  <div className="text-sm font-semibold text-red-200 mb-2">
                    {ca.title}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {ca.body}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Disclaimer */}
      <div className="rounded-lg border border-primary/20 bg-primary/5 p-4 text-xs text-muted-foreground leading-relaxed">
        <span className="text-primary font-semibold">Cognisee Epistemic Foraging </span>
        structures the judgment of experienced arbitration practitioners, making
        implicit knowledge explicit and comparable. This is arbitration strategy
        intelligence, not legal advice. All insights require verification by
        qualified senior arbitration counsel before any filing decision.
      </div>

      {/* Insight cards */}
      <div className="space-y-3">
        {TACIT_INSIGHTS.map((insight) => (
          <InsightCard key={insight.id} insight={insight} />
        ))}
      </div>
    </div>
  );
}
