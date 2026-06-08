// Strategic Filing Recommendation
// Edit PARTNER_BRIEF and recommendation rationale in src/lib/data.ts
import { useState } from "react";
import { JURISDICTIONS, PARTNER_BRIEF } from "@/lib/data";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Award,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  ClipboardList,
  HelpCircle,
  ChevronRight,
  Printer,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

// Ranked list: Singapore → London → New York → Hong Kong
const RANKED_VENUES = ["singapore", "london", "new-york", "hong-kong"];
const RANK_LABELS = ["Recommended", "Strong Alternative", "Viable", "Not Preferred"];

const RATIONALE = [
  "Strong procedural reliability — SIAC's proactive case management reduces procedural attrition risk",
  "Strong institutional arbitration support — Singapore courts provide world-class supervisory jurisdiction",
  "Lower strategic friction — fewer sovereign immunity defense pathways than New York or Hong Kong",
  "Balanced enforcement profile across ASEAN and key Asian commercial trading partners",
  "Good fit for trade and infrastructure disputes — growing cluster of on-point precedent",
  "Commercially pragmatic force majeure interpretation threshold more favorable than English law strict standard",
];

// ---- Partner Brief Modal ----
function PartnerBriefModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { sections } = PARTNER_BRIEF;

  const Section = ({
    title,
    icon: Icon,
    children,
    color = "text-primary",
  }: {
    title: string;
    icon: React.ElementType;
    children: React.ReactNode;
    color?: string;
  }) => (
    <div>
      <div className={cn("flex items-center gap-2 mb-3", color)}>
        <Icon className="w-4 h-4" />
        <span className="text-xs font-mono uppercase tracking-wider font-semibold">
          {title}
        </span>
      </div>
      {children}
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto bg-card border-border/60 p-0">
        <DialogHeader className="p-6 border-b border-border/50 sticky top-0 bg-card z-10">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Badge
                variant="outline"
                className="font-mono text-xs text-muted-foreground border-border/60"
              >
                {PARTNER_BRIEF.classification}
              </Badge>
            </div>
            <DialogTitle className="font-serif text-xl text-foreground">
              {PARTNER_BRIEF.title}
            </DialogTitle>
            <div className="flex gap-4 text-xs font-mono text-muted-foreground">
              <span>{PARTNER_BRIEF.matter}</span>
              <span>{PARTNER_BRIEF.date}</span>
            </div>
          </div>
        </DialogHeader>

        <div className="p-6 space-y-8">
          {/* Case posture */}
          <Section title="Case Posture" icon={ClipboardList}>
            <p className="text-sm text-muted-foreground leading-relaxed bg-muted/20 rounded-lg p-4">
              {sections.casePosture}
            </p>
          </Section>

          {/* Recommended seat */}
          <Section
            title="Recommended Seat"
            icon={Award}
            color="text-emerald-400"
          >
            <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-4 flex items-center gap-3">
              <span className="text-3xl">🇸🇬</span>
              <div>
                <div className="text-lg font-serif font-semibold text-foreground">
                  {sections.recommendedSeat}
                </div>
                <div className="text-xs font-mono text-emerald-400">
                  Primary Recommendation
                </div>
              </div>
            </div>
          </Section>

          {/* Rationale */}
          <Section title="Rationale" icon={CheckCircle2} color="text-emerald-400">
            <ul className="space-y-2">
              {sections.rationale.map((r, i) => (
                <li
                  key={i}
                  className="flex gap-2 text-sm text-foreground/80 bg-muted/10 rounded-lg p-3"
                >
                  <ChevronRight className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  {r}
                </li>
              ))}
            </ul>
          </Section>

          {/* Key risks */}
          <Section title="Key Risks" icon={AlertTriangle} color="text-amber-400">
            <ul className="space-y-2">
              {sections.keyRisks.map((r, i) => (
                <li
                  key={i}
                  className="flex gap-2 text-sm text-foreground/80 bg-amber-500/5 border border-amber-500/15 rounded-lg p-3"
                >
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  {r}
                </li>
              ))}
            </ul>
          </Section>

          {/* Counterarguments */}
          <Section
            title="Counterarguments"
            icon={XCircle}
            color="text-red-400"
          >
            <ul className="space-y-2">
              {sections.counterarguments.map((c, i) => (
                <li
                  key={i}
                  className="flex gap-2 text-sm text-foreground/80 bg-red-500/5 border border-red-500/15 rounded-lg p-3"
                >
                  <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  {c}
                </li>
              ))}
            </ul>
          </Section>

          {/* Evidence gaps */}
          <Section
            title="Evidence Gaps"
            icon={ClipboardList}
            color="text-orange-400"
          >
            <ul className="space-y-2">
              {sections.evidenceGaps.map((g, i) => (
                <li
                  key={i}
                  className="flex gap-2 text-sm text-foreground/80 bg-orange-500/5 border border-orange-500/15 rounded-lg p-3"
                >
                  <span className="text-orange-400 font-mono text-xs mt-0.5 shrink-0">
                    {i + 1}.
                  </span>
                  {g}
                </li>
              ))}
            </ul>
          </Section>

          {/* Partner decision questions */}
          <Section
            title="Partner Decision Questions"
            icon={HelpCircle}
            color="text-purple-400"
          >
            <ul className="space-y-2">
              {sections.partnerDecisionQuestions.map((q, i) => (
                <li
                  key={i}
                  className="flex gap-3 text-sm text-foreground/80 bg-purple-500/5 border border-purple-500/15 rounded-lg p-3"
                >
                  <span className="text-purple-400 font-mono text-xs font-bold shrink-0 mt-0.5">
                    Q{i + 1}
                  </span>
                  {q}
                </li>
              ))}
            </ul>
          </Section>

          {/* Disclaimer */}
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-4 flex gap-3">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <p className="text-xs text-amber-200/80 leading-relaxed">
              Partner Review Required. This brief is preliminary and
              conditional. Filing strategy must be reviewed against governing
              law, contract seat clause, party domicile, enforceable assets,
              treaty posture, tribunal preferences, and updated case law before
              any filing decision is made.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ---- Main export ----
export default function Recommendation() {
  const { partnerBriefOpen, setPartnerBriefOpen } = useStore();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const rankedJurisdictions = RANKED_VENUES.map((id) =>
    JURISDICTIONS.find((j) => j.id === id)!
  );

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl font-serif font-semibold text-foreground">
          Strategic Filing Recommendation
        </h1>
        <p className="text-muted-foreground text-sm">
          Venue ranking based on Cognisee Epistemic Foraging analysis.
          Expert-augmented, not expert-replacing.
        </p>
      </div>

      {/* Action: Generate Partner Brief */}
      <Button
        onClick={() => setPartnerBriefOpen(true)}
        className="bg-primary text-primary-foreground hover:bg-primary/90 font-mono text-xs uppercase tracking-wider gap-2"
      >
        <Printer className="w-3.5 h-3.5" />
        Generate Partner Brief
      </Button>

      {/* Ranking */}
      <div className="space-y-4">
        {rankedJurisdictions.map((j, idx) => {
          if (!j) return null;
          const isExpanded = expandedId === j.id;
          const isRecommended = idx === 0;

          const rankBadgeStyle = isRecommended
            ? "text-emerald-400 border-emerald-500/30 bg-emerald-500/10"
            : idx === 1
            ? "text-primary border-primary/30 bg-primary/10"
            : idx === 2
            ? "text-amber-400 border-amber-500/25 bg-amber-500/8"
            : "text-red-400 border-red-500/25 bg-red-500/8";

          return (
            <motion.div
              key={j.id}
              layout
              className={cn(
                "rounded-xl border bg-card overflow-hidden transition-all",
                isRecommended
                  ? "border-emerald-500/40 shadow-lg shadow-emerald-500/5"
                  : "border-border/60"
              )}
            >
              <button
                onClick={() => setExpandedId(isExpanded ? null : j.id)}
                className="w-full text-left p-5 flex items-center gap-4 hover:bg-muted/10 transition-colors"
              >
                {/* Rank number */}
                <div
                  className={cn(
                    "w-10 h-10 rounded-full border-2 flex items-center justify-center font-bold font-mono shrink-0",
                    rankBadgeStyle
                  )}
                >
                  {idx + 1}
                </div>

                {/* Flag & name */}
                <div className="flex items-center gap-3 flex-1">
                  <span className="text-2xl">{j.flag}</span>
                  <div>
                    <div className="text-base font-serif font-semibold text-foreground">
                      {j.name}
                    </div>
                    <Badge
                      variant="outline"
                      className={cn("text-[10px] font-mono mt-0.5", rankBadgeStyle)}
                    >
                      {RANK_LABELS[idx]}
                    </Badge>
                  </div>
                </div>

                {/* Key scores */}
                <div className="hidden md:flex gap-6 text-center">
                  {[
                    { label: "Winnability", value: j.winnability },
                    { label: "Procedural", value: j.proceduralConfidence },
                    { label: "Enforcement", value: j.enforcementConfidence },
                  ].map((s) => {
                    const col =
                      s.value >= 80
                        ? "text-emerald-400"
                        : s.value >= 70
                        ? "text-amber-400"
                        : "text-red-400";
                    return (
                      <div key={s.label}>
                        <div className={cn("text-xl font-bold font-mono", col)}>
                          {s.value}
                        </div>
                        <div className="text-[9px] font-mono uppercase tracking-wider text-muted-foreground">
                          {s.label}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <ChevronRight
                  className={cn(
                    "w-4 h-4 text-muted-foreground transition-transform",
                    isExpanded && "rotate-90"
                  )}
                />
              </button>

              {/* Expanded rationale */}
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="border-t border-border/40 px-5 py-4 space-y-4"
                >
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <div className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 mb-2">
                        Key Strengths
                      </div>
                      <ul className="space-y-1.5">
                        {j.whyHelps.slice(0, 3).map((h, i) => (
                          <li
                            key={i}
                            className="text-xs text-foreground/75 flex gap-2"
                          >
                            <span className="text-emerald-400/60 shrink-0">→</span>
                            {h}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <div className="text-[10px] font-mono uppercase tracking-wider text-red-400 mb-2">
                        Key Concerns
                      </div>
                      <ul className="space-y-1.5">
                        {j.whyHurts.slice(0, 3).map((h, i) => (
                          <li
                            key={i}
                            className="text-xs text-foreground/75 flex gap-2"
                          >
                            <span className="text-red-400/60 shrink-0">→</span>
                            {h}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Primary rationale for Singapore */}
      <div className="rounded-xl border border-emerald-500/25 bg-emerald-500/5 overflow-hidden">
        <div className="px-6 py-4 border-b border-emerald-500/20 flex items-center gap-2">
          <Award className="w-4 h-4 text-emerald-400" />
          <span className="text-sm font-semibold text-emerald-300 font-serif">
            Why Singapore is the Recommended Venue
          </span>
        </div>
        <div className="p-5 space-y-2">
          {RATIONALE.map((r, i) => (
            <div key={i} className="flex gap-3 text-sm text-foreground/80">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              {r}
            </div>
          ))}
        </div>
      </div>

      {/* Partner Review Warning */}
      <div className="rounded-xl border border-amber-500/40 bg-amber-500/8 p-5 flex gap-4">
        <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div>
          <div className="text-sm font-semibold text-amber-300 mb-2">
            Partner Review Required
          </div>
          <p className="text-sm text-amber-200/75 leading-relaxed">
            Recommendation is conditional. Filing strategy should be reviewed
            against governing law, contract seat clause, party domicile,
            enforceable assets, treaty posture, tribunal preferences, and
            updated case law. Cognisee structures the decision — it does not
            make it.
          </p>
        </div>
      </div>

      {/* Partner brief modal */}
      <PartnerBriefModal
        open={partnerBriefOpen}
        onClose={() => setPartnerBriefOpen(false)}
      />
    </div>
  );
}
