import { useState } from "react";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { ShieldAlert, Fingerprint, Activity, BookOpen, AlertTriangle, ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";

const perspectives = [
  {
    id: "geopolitical",
    title: "Geopolitical / Country Risk",
    icon: ShieldAlert,
    color: "bg-[hsl(var(--chart-3))]",
    textColor: "text-[hsl(var(--chart-3))]",
    confidence: 62,
    steps: [
      {
        id: "g1",
        claim: "Malaysia sits in a strategically advantageous position — US-China tensions are redirecting OSAT investment toward Southeast Asia.",
        evidence: [{ id: "e1", label: "SEMI Industry Report Q1-25", type: "External Research" }],
        assumptions: [],
      },
      {
        id: "g2",
        claim: "The current Madani government has signaled 5-year FDI stability; however, a scheduled by-election in Q4 creates leadership transition risk.",
        evidence: [{ id: "e2", label: "Country Risk Desk Brief #47", type: "Internal Intelligence" }],
        assumptions: [{ id: "a1", label: "Coalition stability holds through 2026" }],
      }
    ],
    openQuestions: "Does the Q4 by-election materially alter the FDI repatriation policy timeline?"
  },
  {
    id: "financial",
    title: "Financial / Economic",
    icon: Activity,
    color: "bg-[hsl(var(--chart-1))]",
    textColor: "text-[hsl(var(--chart-1))]",
    confidence: 78,
    steps: [
      {
        id: "f1",
        claim: "NexPak's CoWoS and SoIC advanced packaging revenue grew 41% YoY; backlog visibility is 18 months at current customer commitments.",
        evidence: [{ id: "e3", label: "NexPak Audited Financials FY24", type: "Verified Data" }],
        assumptions: [],
      },
      {
        id: "f2",
        claim: "MYR/USD hedge cost at current rates is 340bps annually — materially compressing projected IRR from 19.2% to 16.8%.",
        evidence: [{ id: "e4", label: "Treasury FX Model v3.2", type: "Model Output" }],
        assumptions: [{ id: "a2", label: "BNM maintains managed float regime" }, { id: "a3", label: "3-year hedge tenor is achievable at quoted rates" }],
      }
    ],
    openQuestions: "Can a natural hedge be structured via MYR-denominated debt at NexPak level to reduce FX cost?"
  },
  {
    id: "tacit",
    title: "Institutional Tacit Knowledge",
    icon: Fingerprint,
    color: "bg-[hsl(var(--chart-5))]",
    textColor: "text-[hsl(var(--chart-5))]",
    confidence: 85,
    steps: [
      {
        id: "t1",
        claim: "Prior deployments in Malaysian semi (2018, 2021) succeeded where local partner relationships were established before IC approval — not after.",
        evidence: [{ id: "e5", label: "Post-mortem: Apex Micro 2021", type: "Institutional Memory" }],
        assumptions: [],
      },
      {
        id: "t2",
        claim: "The Malaysian Investment Development Authority (MIDA) relationship cultivated by our KL office can materially accelerate license conversion timelines by 4–6 months.",
        evidence: [{ id: "e6", label: "KL Desk Officer Field Notes", type: "Tacit Knowledge" }],
        assumptions: [{ id: "a4", label: "Current MIDA director relationship remains active" }],
      }
    ],
    openQuestions: "Who is the critical relationship holder at NexPak's primary customer (TSMC packaging subcontracting unit) and is there relationship continuity if the founder exits?"
  },
  {
    id: "regulatory",
    title: "Regulatory / Legal",
    icon: BookOpen,
    color: "bg-[hsl(var(--chart-2))]",
    textColor: "text-[hsl(var(--chart-2))]",
    confidence: 44,
    steps: [
      {
        id: "r1",
        claim: "Proposed amendments to Malaysia's Investment Act 2024 could impose new profit-repatriation caps of 60% per annum for non-resident investors.",
        evidence: [{ id: "e7", label: "Draft Investment Act Amendment (leaked)", type: "Regulatory Document" }],
        assumptions: [],
      },
      {
        id: "r2",
        claim: "US BIS Entity List expansion in the advanced packaging space may restrict NexPak's ability to source US-origin equipment, affecting 30% of planned capex.",
        evidence: [],
        assumptions: [{ id: "a5", label: "NexPak does not qualify for FDP exemption" }, { id: "a6", label: "No allied-nation equipment substitutes available at cost parity" }],
      }
    ],
    openQuestions: "Has external counsel confirmed whether the leaked Investment Act draft reflects the Minister's current position or a prior iteration?"
  }
];

export default function Reasoning() {
  const { strategy, setProvenance } = useStore();
  const [expandedSteps, setExpandedSteps] = useState<Record<string, boolean>>({});
  const [challengedAssumptions, setChallengedAssumptions] = useState<Record<string, boolean>>({});
  const [merged, setMerged] = useState(false);

  const toggleStep = (id: string) => {
    setExpandedSteps(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const challengeAssumption = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setChallengedAssumptions(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleEvidenceClick = (evidence: any) => {
    setProvenance({
      sourceType: evidence.type,
      contributorRole: "Senior Investment Officer",
      context: "NexPak Malaysia IC-550 Deal Room",
      jurisdiction: "Malaysia / Federal",
      rights: "Investment Committee Restricted",
      timestamp: "Captured: Apr 08, 2025"
    });
  };

  return (
    <div className="max-w-[1600px] mx-auto px-6 pt-16 pb-32">
      <div className="flex items-end justify-between mb-8">
        <div>
          <div className="flex items-center gap-4 mb-4">
            <div className="inline-block px-3 py-1 bg-secondary/10 text-secondary text-xs uppercase tracking-wider font-mono font-bold rounded">
              Phase 04 / Reasoning
            </div>
            {strategy && (
              <div className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs uppercase tracking-wider font-mono font-bold rounded border border-primary/20">
                Active Strategy: {strategy.replace("-", " ").toUpperCase()}
              </div>
            )}
          </div>
          <h1 className="text-3xl font-serif text-foreground mb-2">Multi-Perspective Investment Analysis</h1>
          <p className="text-muted-foreground">Synthesize reasoning across geopolitical, financial, institutional, and regulatory lenses for NexPak Malaysia.</p>
        </div>
        <Button 
          onClick={() => setMerged(!merged)}
          className={cn(
            "font-mono uppercase tracking-wider text-xs transition-all",
            merged ? "bg-secondary hover:bg-secondary/90" : "bg-primary hover:bg-primary/90 text-primary-foreground"
          )}
        >
          {merged ? "Unmerge Paths" : "Synthesize Paths"}
          <ArrowDown className="ml-2 w-4 h-4" />
        </Button>
      </div>

      <div className="grid grid-cols-4 gap-6 mb-12">
        {perspectives.map((p) => {
          const Icon = p.icon;
          return (
            <div key={p.id} className="flex flex-col h-full bg-card border border-border rounded-xl overflow-hidden shadow-sm">
              <div className="p-4 border-b border-border bg-card/50 relative">
                <div className="absolute bottom-0 left-0 h-1 bg-muted w-full">
                  <div className={cn("h-full", p.color)} style={{ width: `${p.confidence}%` }} />
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <Icon className={cn("w-4 h-4", p.textColor)} />
                  <h3 className="font-serif font-medium text-foreground">{p.title}</h3>
                </div>
                <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
                  Confidence Band: {p.confidence}%
                </div>
              </div>

              <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                {p.steps.map((step, idx) => (
                  <div key={step.id} className="relative pl-6 pb-2">
                    {idx < p.steps.length - 1 && (
                      <div className="absolute top-6 left-[11px] bottom-[-16px] w-[2px] bg-border" />
                    )}
                    <div className="absolute top-1 left-0 w-6 h-6 rounded-full bg-background border border-border flex items-center justify-center text-[10px] font-mono font-bold text-muted-foreground z-10">
                      {idx + 1}
                    </div>

                    <div 
                      className="bg-background border border-border rounded-lg p-3 cursor-pointer hover:border-primary/50 transition-colors shadow-sm"
                      onClick={() => toggleStep(step.id)}
                    >
                      <p className="text-sm text-foreground leading-relaxed">{step.claim}</p>
                      
                      {(expandedSteps[step.id] || step.evidence.length > 0 || step.assumptions.length > 0) && (
                        <div className="mt-3 pt-3 border-t border-border space-y-3">
                          {step.evidence.length > 0 && (
                            <div>
                              <div className="text-[10px] font-mono uppercase text-muted-foreground mb-1.5">Evidence</div>
                              <div className="flex flex-wrap gap-1.5">
                                {step.evidence.map(e => (
                                  <button
                                    key={e.id}
                                    onClick={(ev) => { ev.stopPropagation(); handleEvidenceClick(e); }}
                                    className="px-2 py-1 bg-secondary/5 text-secondary border border-secondary/20 rounded text-[10px] font-mono uppercase tracking-wider hover:bg-secondary/10 transition-colors"
                                  >
                                    {e.label}
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}

                          {step.assumptions.length > 0 && (
                            <div>
                              <div className="text-[10px] font-mono uppercase text-muted-foreground mb-1.5 flex items-center gap-1">
                                <AlertTriangle className="w-3 h-3 text-[hsl(var(--chart-2))]" />
                                Assumptions
                              </div>
                              <div className="space-y-1.5">
                                {step.assumptions.map(a => {
                                  const isChallenged = challengedAssumptions[a.id];
                                  return (
                                    <div key={a.id} className="flex items-center justify-between bg-muted/30 p-1.5 rounded border border-border/50">
                                      <span className={cn("text-xs", isChallenged ? "line-through text-muted-foreground" : "text-foreground")}>
                                        {a.label}
                                      </span>
                                      <button 
                                        onClick={(e) => challengeAssumption(a.id, e)}
                                        className={cn(
                                          "text-[10px] px-2 py-0.5 rounded transition-colors font-mono uppercase tracking-wider",
                                          isChallenged 
                                            ? "bg-destructive text-destructive-foreground" 
                                            : "bg-[hsl(var(--chart-2))]/20 text-[hsl(var(--chart-2))] hover:bg-[hsl(var(--chart-2))]/30"
                                        )}
                                      >
                                        {isChallenged ? "Challenged" : "Challenge"}
                                      </button>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 border-t border-border bg-muted/10">
                <div className="text-[10px] font-mono uppercase text-muted-foreground mb-2">Open Intelligence Gap</div>
                <p className="text-sm italic text-muted-foreground">{p.openQuestions}</p>
              </div>
            </div>
          );
        })}
      </div>

      {merged && (
        <div className="bg-secondary/5 border border-secondary/20 rounded-xl p-8 shadow-sm animate-in fade-in slide-in-from-top-4">
          <h2 className="text-xl font-serif text-secondary mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Synthesized Investment Intelligence
          </h2>
          <div className="grid grid-cols-3 gap-8">
            <div>
              <div className="text-xs font-mono uppercase text-secondary/70 mb-2">Cross-Perspective Consensus</div>
              <p className="text-sm leading-relaxed text-foreground">
                All perspectives confirm Malaysia's structural attractiveness for advanced packaging investment. NexPak's financial fundamentals and the MIDA relationship provide a durable entry advantage that is unlikely to be replicated by a late-arriving co-investor.
              </p>
            </div>
            <div>
              <div className="text-xs font-mono uppercase text-[hsl(var(--chart-3))] mb-2">Critical Investment Friction</div>
              <p className="text-sm leading-relaxed text-foreground">
                The proposed Investment Act amendment (repatriation cap) directly conflicts with the fund's liquidity mandate requiring ≥70% annual repatriation rights. BIS equipment restrictions would simultaneously compress the capex plan — these two risks compound each other's severity.
              </p>
            </div>
            <div>
              <div className="text-xs font-mono uppercase text-muted-foreground mb-2">Recommended Epistemic Action</div>
              <p className="text-sm leading-relaxed text-foreground">
                Before IC approval, the KL desk must obtain a formal legal opinion on the Investment Act draft status AND secure an in-principle letter from MIDA confirming the current repatriation framework applies to the proposed structure for a minimum 5-year lock-in period.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
