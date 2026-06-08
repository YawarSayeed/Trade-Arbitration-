// Dashboard — Case Overview
// Edit CASE constant in src/lib/data.ts to change case details
import { useLocation } from "wouter";
import { CASE, JURISDICTIONS } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Scale,
  DollarSign,
  AlertTriangle,
  Target,
  ChevronRight,
  Info,
} from "lucide-react";
import { cn } from "@/lib/utils";

function ScoreBadge({ value, label }: { value: number; label: string }) {
  const color =
    value >= 80
      ? "text-emerald-400"
      : value >= 70
      ? "text-amber-400"
      : "text-red-400";
  return (
    <div className="flex flex-col items-center gap-1">
      <span className={cn("text-2xl font-bold font-mono", color)}>{value}</span>
      <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
    </div>
  );
}

export default function Dashboard() {
  const [, setLocation] = useLocation();

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <Badge
            variant="outline"
            className="font-mono text-xs text-muted-foreground border-border/60"
          >
            ARB-2026-0441
          </Badge>
          <Badge
            variant="outline"
            className="font-mono text-xs text-amber-500/80 border-amber-500/30 bg-amber-500/5"
          >
            Pre-Filing Strategy
          </Badge>
        </div>
        <h1 className="text-3xl font-serif font-semibold tracking-tight text-foreground">
          {CASE.title}
        </h1>
        <p className="text-muted-foreground text-sm leading-relaxed max-w-2xl">
          {CASE.summary}
        </p>
      </div>

      {/* Case Summary Card */}
      <div className="rounded-xl border border-border/60 bg-card overflow-hidden">
        <div className="px-6 py-4 border-b border-border/50 flex items-center gap-2">
          <Scale className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-foreground">
            Case Summary
          </span>
          <span className="ml-auto text-xs font-mono text-muted-foreground">
            Privileged & Confidential
          </span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-0 divide-x divide-y divide-border/40">
          {[
            { label: "Claimant", value: CASE.claimant },
            { label: "Respondent", value: CASE.respondent },
            { label: "Claim Value", value: CASE.claimValue, icon: DollarSign },
            { label: "Dispute Type", value: CASE.disputeType },
            {
              label: "Contract Law Ambiguity",
              value: CASE.contractLawAmbiguity,
            },
            { label: "Evidence Quality", value: CASE.evidenceQuality },
          ].map((item) => (
            <div key={item.label} className="p-4">
              <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-1">
                {item.label}
              </div>
              <div className="text-sm text-foreground font-medium leading-snug">
                {item.value}
              </div>
            </div>
          ))}
        </div>
        <div className="px-6 py-4 border-t border-border/50 bg-muted/20 flex items-start gap-3">
          <Target className="w-4 h-4 text-primary mt-0.5 shrink-0" />
          <div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-1">
              Strategic Objective
            </div>
            <p className="text-sm text-foreground">{CASE.strategicObjective}</p>
          </div>
        </div>
      </div>

      {/* Jurisdiction Snapshot */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-serif font-semibold text-foreground">
            Venue Snapshot
          </h2>
          <Button
            variant="ghost"
            size="sm"
            className="text-xs font-mono text-muted-foreground hover:text-foreground gap-1"
            onClick={() => setLocation("/jurisdictions")}
          >
            Full Analysis <ChevronRight className="w-3 h-3" />
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {JURISDICTIONS.map((j) => (
            <button
              key={j.id}
              onClick={() => setLocation("/jurisdictions")}
              className="rounded-xl border border-border/60 bg-card hover:border-primary/40 hover:bg-card/80 transition-all duration-200 text-left overflow-hidden group"
            >
              <div className="p-4 border-b border-border/40 flex items-center gap-2">
                <span className="text-xl">{j.flag}</span>
                <div>
                  <div className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                    {j.name}
                  </div>
                  <div
                    className={cn(
                      "text-[10px] font-mono uppercase",
                      j.riskColor
                    )}
                  >
                    {j.strategicRisk} Risk
                  </div>
                </div>
              </div>
              <div className="p-4 grid grid-cols-2 gap-3">
                <ScoreBadge value={j.winnability} label="Winnability" />
                <ScoreBadge
                  value={j.proceduralConfidence}
                  label="Procedural"
                />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Epistemic Foraging Intro */}
      <div className="rounded-xl border border-primary/20 bg-primary/5 p-6 flex gap-4">
        <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-foreground font-serif">
            Cognisee Epistemic Foraging
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            This platform structures the exploration of evidence, assumptions,
            precedent clusters, expert judgment signals, and decision pathways
            for this dispute. It supports better venue selection by surfacing
            what experienced arbitration counsel knows — not by replacing their
            judgment. Navigate the tabs to explore.
          </p>
          <div className="flex flex-wrap gap-2 pt-1">
            {[
              "Venue Analysis",
              "Foraging Map",
              "Tacit Counsel Layer",
              "Wisdom Vault Signals",
              "Decision Pathways",
            ].map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-mono uppercase tracking-wider text-primary/70 border border-primary/20 rounded px-2 py-0.5"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Warning */}
      <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 flex gap-3">
        <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <p className="text-xs text-amber-200/80 leading-relaxed">
          This platform provides arbitration strategy intelligence and
          expert-augmented decision support. It does not constitute legal advice.
          All recommendations are conditional and require review by qualified
          senior arbitration counsel before any filing decision is made.
        </p>
      </div>
    </div>
  );
}
