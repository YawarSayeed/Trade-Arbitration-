// ============================================================
// MOCK DATA — Edit case details, scores, and copy here
// ============================================================

export const CASE = {
  id: "ARB-2026-0441",
  title: "Atlas Renewables v. Meridian Ports Authority",
  claimant: "Atlas Renewables Ltd.",
  respondent: "Meridian Ports Authority",
  disputeType:
    "International trade, infrastructure, procurement, force majeure, sovereign counterparty exposure",
  claimValue: "$420M",
  contractLawAmbiguity: "Medium-high",
  evidenceQuality: "Mixed",
  enforcementSensitivity: "High",
  strategicObjective:
    "Maximize winnability while reducing procedural and enforcement risk",
  summary:
    "A cross-border infrastructure and supply-chain dispute involving delayed port access, force majeure claims, sovereign counterparty risk, tariff disruption, and alleged breach of long-term procurement obligations. The contract seat clause is ambiguous and both parties maintain enforceable assets across multiple jurisdictions.",
};

// ---------------------------------------------------------------
// JURISDICTION SCORES — Edit numbers here
// ---------------------------------------------------------------
export type Jurisdiction = {
  id: string;
  name: string;
  flag: string;
  winnability: number;
  proceduralConfidence: number;
  enforcementConfidence: number;
  precedentAlignment: number;
  costTimeRisk: string;
  strategicRisk: string;
  riskColor: string;
  whyHelps: string[];
  whyHurts: string[];
  precedentClusters: { title: string; detail: string }[];
  tacitSignals: string[];
  proceduralRisk: string;
  enforcementConsiderations: string;
  adversaryResponse: string;
  counselNextSteps: string[];
};

export const JURISDICTIONS: Jurisdiction[] = [
  {
    id: "new-york",
    name: "New York",
    flag: "🇺🇸",
    // --- Scores ---
    winnability: 72,
    proceduralConfidence: 81,
    enforcementConfidence: 78,
    precedentAlignment: 69,
    costTimeRisk: "Medium-high",
    strategicRisk: "Medium",
    riskColor: "text-amber-400",
    // --- Deep dive content ---
    whyHelps: [
      "Strong institutional arbitration infrastructure via AAA/ICDR and JAMS",
      "Sophisticated judiciary familiar with complex commercial disputes",
      "Deep precedent base for force majeure in infrastructure contexts",
      "Respondent has identifiable asset exposure in US markets",
    ],
    whyHurts: [
      "Sovereign counterparty may invoke immunity defenses in US courts",
      "Higher litigation costs and prolonged pre-hearing motion practice",
      "Political sensitivity around infrastructure disputes may generate adverse publicity",
      "Discovery obligations may expose claimant's internal documents",
    ],
    precedentClusters: [
      {
        title: "Force majeure in US infrastructure disputes",
        detail:
          "Clusters of ICC and AAA awards have interpreted force majeure clauses narrowly in port-related infrastructure disputes, requiring specific notice timelines and mitigation evidence.",
      },
      {
        title: "Sovereign-linked commercial entity disputes",
        detail:
          "US federal courts have split on whether state-owned port authorities constitute sovereign entities under FSIA, creating enforcement uncertainty at the award-recognition stage.",
      },
      {
        title: "Tariff shock and contract frustration",
        detail:
          "Post-2018 trade disruption cases in New York arbitration have generated conflicting lines on whether tariff shock qualifies as commercial impossibility or mere hardship.",
      },
      {
        title: "Long-term procurement obligation breach",
        detail:
          "ICDR panels have consistently required claimants to demonstrate reasonable mitigation steps before awarding consequential damages in infrastructure procurement disputes.",
      },
    ],
    tacitSignals: [
      "Senior AAA/ICDR arbitrators in infrastructure disputes tend to scrutinize force majeure notice compliance rigorously",
      "US-based opposing counsel may aggressively pursue disclosure to develop affirmative defenses",
      "Prevailing party fee-shifting is uncommon, increasing cost symmetry pressure",
    ],
    proceduralRisk:
      "Risk of extended preliminary motions around jurisdiction and sovereign immunity. US discovery norms may be extrapolated even in arbitral context by opposing counsel.",
    enforcementConsiderations:
      "New York Convention enforcement is well-established. However, sovereign counterparty assets may be partially shielded under FSIA. Asset identification and tracing will be critical.",
    adversaryResponse:
      "Respondent is likely to raise FSIA sovereign immunity defenses, challenge force majeure notice compliance, and move to compel discovery to burden the claimant. Settlement leverage may be weaponized as litigation cost asymmetry grows.",
    counselNextSteps: [
      "Identify and map all Respondent asset exposure within US jurisdiction",
      "Audit force majeure notice documentation for timeline compliance",
      "Obtain senior arbitrator preference intelligence from AAA/ICDR panel rosters",
      "Assess whether discovery obligations would harm claimant's evidentiary posture",
    ],
  },
  {
    id: "london",
    name: "London",
    flag: "🇬🇧",
    winnability: 76,
    proceduralConfidence: 86,
    enforcementConfidence: 84,
    precedentAlignment: 74,
    costTimeRisk: "Medium-high",
    strategicRisk: "Low-medium",
    riskColor: "text-emerald-400",
    whyHelps: [
      "LCIA is the gold standard for complex commercial disputes globally",
      "English courts provide strong supervisory support and rare intervention",
      "Robust body of English contract law precedent on force majeure and frustration",
      "Sophisticated commercial judges available for interim relief",
    ],
    whyHurts: [
      "English law treats force majeure strictly; narrow clause language may be fatal",
      "High legal costs in London arbitration, particularly for multi-week hearings",
      "Post-Brexit enforcement uncertainty in EU member state enforcement proceedings",
      "Respondent may challenge LCIA seat jurisdiction absent express clause",
    ],
    precedentClusters: [
      {
        title: "Force majeure and frustration under English law",
        detail:
          "English courts and LCIA tribunals apply an exceptionally high threshold for force majeure. Parties must demonstrate that the triggering event was unforeseeable, beyond control, and rendered performance impossible — not merely more difficult.",
      },
      {
        title: "Port access and logistics interruption claims",
        detail:
          "A significant cluster of LCIA awards addresses port delay and access denial in long-term infrastructure agreements, often finding for claimant where documentation of denial was contemporaneous.",
      },
      {
        title: "Sovereign-linked commercial entity disputes",
        detail:
          "English courts have developed nuanced state immunity doctrine under the State Immunity Act. Commercial activity exceptions are broadly applied where respondent engaged in revenue-generating port operations.",
      },
      {
        title: "Evidence reliability in multi-jurisdiction supply-chain disputes",
        detail:
          "LCIA tribunals have emphasised documentary consistency across jurisdictions, flagging inconsistent internal records as credibility impairment factors in enforcement proceedings.",
      },
    ],
    tacitSignals: [
      "Experienced LCIA arbitrators place significant weight on commercial reasonableness of force majeure invocation",
      "London arbitration culture strongly favors settlement discussions after the first hearing day",
      "Opponent selection of UK silk may signal intent to use cross-examination as a key tactic",
    ],
    proceduralRisk:
      "Risk associated with strict pleading requirements under LCIA rules and English procedural norms. Costs budgeting obligations may create early adverse disclosure of litigation strategy.",
    enforcementConsiderations:
      "Strong enforcement infrastructure in England and Wales. New York Convention reciprocity well-established. Post-Brexit, EU-based enforcement requires domestic action in relevant member states.",
    adversaryResponse:
      "Respondent counsel may invoke state immunity as preliminary objection, apply for anti-suit injunction in home jurisdiction, and challenge the force majeure event definition under strict English law standards. Bifurcation motion likely.",
    counselNextSteps: [
      "Obtain expert opinion on force majeure clause interpretation under English law",
      "Map Respondent's asset footprint in UK and Commonwealth jurisdictions",
      "Assess availability of interim measures from English Commercial Court",
      "Prepare full-chain documentation of port access denial events",
    ],
  },
  {
    id: "singapore",
    name: "Singapore",
    flag: "🇸🇬",
    winnability: 79,
    proceduralConfidence: 88,
    enforcementConfidence: 82,
    precedentAlignment: 71,
    costTimeRisk: "Medium",
    strategicRisk: "Low",
    riskColor: "text-emerald-400",
    whyHelps: [
      "SIAC consistently ranked as top seat for international trade and infrastructure disputes",
      "Singapore courts provide world-class supervisory jurisdiction with minimal intervention",
      "Strong enforcement infrastructure across ASEAN and key Asian markets",
      "Balanced and commercially pragmatic approach to force majeure interpretation",
    ],
    whyHurts: [
      "Precedent density for force majeure in infrastructure is still growing relative to London",
      "Respondent sovereign entity may assert diplomatic relationship pressures on local proceedings",
      "Limited appellate review may reduce error-correction opportunity if tribunal misapplies law",
      "Geographic distance may increase logistical complexity for European witnesses",
    ],
    precedentClusters: [
      {
        title: "Force majeure in ASEAN infrastructure disputes",
        detail:
          "SIAC panels have generally adopted a commercially pragmatic interpretation of force majeure, requiring proof of causation and mitigation effort rather than strict impossibility.",
      },
      {
        title: "Port access and logistics interruption in Asia-Pacific",
        detail:
          "Singapore-seated arbitrations involving port infrastructure have generated a consistent cluster of awards recognizing access denial as a triggering event for long-term contract suspension.",
      },
      {
        title: "Sovereign-linked commercial entity disputes",
        detail:
          "SIAC and Singapore High Court have progressively applied commercial activity exceptions to state immunity, particularly for port and infrastructure operations generating commercial revenue.",
      },
      {
        title: "Trade disruption and supply-chain frustration",
        detail:
          "Post-pandemic SIAC awards have addressed tariff shock and supply-chain disruption claims, developing nuanced guidance on the boundary between hardship and genuine commercial frustration.",
      },
      {
        title: "Enforcement against state entities in ASEAN",
        detail:
          "Singapore has developed efficient enforcement procedures under the SICC framework, including against state-linked entities operating in the region.",
      },
    ],
    tacitSignals: [
      "SIAC arbitrators tend to be efficiency-minded; well-organized evidentiary presentation is rewarded",
      "Singapore courts are highly responsive to requests for interim preservation orders",
      "Opposing counsel may use ASEAN diplomatic networks to create pre-filing settlement pressure",
    ],
    proceduralRisk:
      "Lower procedural friction than New York or London. SIAC case management is proactive and time-efficient. Emergency arbitrator mechanism is available for urgent relief.",
    enforcementConsiderations:
      "Excellent enforcement profile across ASEAN, Greater China, and key trading partners. New York Convention membership is broad in Asia-Pacific. Enforcement against sovereign assets requires careful asset mapping.",
    adversaryResponse:
      "Respondent may initiate anti-suit proceedings in home jurisdiction, challenge scope of SIAC jurisdiction, and deploy diplomatic pressure to delay proceedings. Pre-filing settlement offers may be used to test claimant's resolve.",
    counselNextSteps: [
      "Confirm whether SIAC seat is available under governing law and contract clause",
      "Map Respondent asset exposure across ASEAN and Greater China",
      "Identify SIAC arbitrators with infrastructure and force majeure expertise",
      "Prepare emergency arbitrator application for injunctive relief if port access continues to be denied",
    ],
  },
  {
    id: "hong-kong",
    name: "Hong Kong",
    flag: "🇭🇰",
    winnability: 68,
    proceduralConfidence: 74,
    enforcementConfidence: 70,
    precedentAlignment: 66,
    costTimeRisk: "Medium",
    strategicRisk: "Medium-high",
    riskColor: "text-red-400",
    whyHelps: [
      "HKIAC is an established seat with strong regional credibility",
      "Lower cost profile than London or New York",
      "Good access to PRC-adjacent enforcement via CEPA arrangements",
      "Established common law precedent tradition under HKIAC",
    ],
    whyHurts: [
      "Post-2019 rule of law perception concerns may affect institutional credibility",
      "Mainland China enforcement of HKIAC awards has become less predictable",
      "Political sensitivity of sovereign counterparty dispute may influence proceedings",
      "PRC government interest in dispute outcome creates systemic risk",
    ],
    precedentClusters: [
      {
        title: "Force majeure under Hong Kong and PRC-influenced law",
        detail:
          "HKIAC panels have followed English law force majeure interpretation traditions, but increasing PRC legal influence creates uncertainty regarding future panel composition and reasoning.",
      },
      {
        title: "Sovereign-linked commercial disputes in Greater China",
        detail:
          "HKIAC awards against state-linked entities have faced uneven enforcement in mainland China, with recognition proceedings dependent on political-commercial context.",
      },
      {
        title: "Infrastructure and port access disputes",
        detail:
          "A smaller but growing cluster of HKIAC awards addresses port infrastructure disputes, primarily in Belt and Road Initiative contexts.",
      },
    ],
    tacitSignals: [
      "Senior arbitration practitioners advise caution on complex sovereign counterparty disputes in current Hong Kong environment",
      "HKIAC arbitrators tend to maintain strong procedural standards, but panel selection is increasingly sensitive",
      "Enforcement risk against regional sovereign-linked assets has increased materially since 2020",
    ],
    proceduralRisk:
      "Procedural standards remain high within HKIAC, but the broader institutional environment creates reputational and enforcement risk. Emergency measures are available but their execution against sovereign entities is uncertain.",
    enforcementConsiderations:
      "New York Convention enforcement is technically available, but mainland China enforcement has become less reliable. Respondent sovereign assets may be shielded through PRC-affiliated structures.",
    adversaryResponse:
      "Respondent may exploit PRC political networks to create informal pressure on proceedings. Anti-suit proceedings in home jurisdiction are likely. Post-award enforcement in mainland China will be strongly contested.",
    counselNextSteps: [
      "Obtain current intelligence on HKIAC panel composition and political risk",
      "Assess whether Respondent has enforceable assets outside PRC/HK jurisdiction",
      "Consider whether Hong Kong seat clause is binding or permissive",
      "Evaluate reputational risk of Hong Kong-seated proceedings for institutional investor clients",
    ],
  },
];

// ---------------------------------------------------------------
// FORAGING MAP NODES
// ---------------------------------------------------------------
export type ForagingNode = {
  id: string;
  label: string;
  x: number;
  y: number;
  what: string;
  why: string;
  jurisdictionImpact: { [key: string]: "strengthens" | "weakens" | "neutral" };
  evidenceNeeded: string;
  confidence: "High" | "Medium" | "Low";
  uncertainty: string;
};

export const FORAGING_NODES: ForagingNode[] = [
  {
    id: "contract-text",
    label: "Contract Text",
    x: 50,
    y: 18,
    what: "The governing contract provisions including the dispute resolution clause, governing law selection, and force majeure definition.",
    why: "The contract text is the primary source of legal obligation. Ambiguity in seat clause or governing law has direct impact on jurisdiction selection and venue challenge risk.",
    jurisdictionImpact: {
      "new-york": "neutral",
      london: "strengthens",
      singapore: "strengthens",
      "hong-kong": "neutral",
    },
    evidenceNeeded:
      "Certified copy of the master procurement agreement; all amendments; any side letters affecting dispute resolution provisions.",
    confidence: "High",
    uncertainty:
      "Clause 22.4 contains ambiguous language regarding arbitral seat. Two senior counsel have offered conflicting interpretations.",
  },
  {
    id: "governing-law",
    label: "Governing Law Ambiguity",
    x: 20,
    y: 35,
    what: "Uncertainty about which substantive law governs the contract's commercial obligations, particularly the force majeure provisions.",
    why: "Governing law determines which body of precedent applies. English law imposes a stricter force majeure threshold than Singapore law. Mismatch between seat and governing law creates complexity.",
    jurisdictionImpact: {
      "new-york": "weakens",
      london: "neutral",
      singapore: "strengthens",
      "hong-kong": "weakens",
    },
    evidenceNeeded:
      "Choice of law expert opinion; analysis of competing legal system precedent on force majeure clause language.",
    confidence: "Medium",
    uncertainty:
      "Parties have not litigated governing law point. Respondent may argue for more restrictive legal system.",
  },
  {
    id: "force-majeure",
    label: "Force Majeure History",
    x: 78,
    y: 32,
    what: "The documented history of force majeure invocations, contractual notice compliance, and mitigation efforts by both parties.",
    why: "Most jurisdictions require strict notice compliance for force majeure defenses. Gaps in notice documentation are the most common grounds for award rejection on this issue.",
    jurisdictionImpact: {
      "new-york": "neutral",
      london: "weakens",
      singapore: "strengthens",
      "hong-kong": "neutral",
    },
    evidenceNeeded:
      "All written notices of force majeure; contemporaneous evidence of access denial; mitigation log; correspondence with Respondent during disruption period.",
    confidence: "Medium",
    uncertainty:
      "Notice timeline compliance has a 14-day gap that opposing counsel will exploit. Mitigation documentation is incomplete.",
  },
  {
    id: "sovereign-counterparty",
    label: "Sovereign Counterparty Behavior",
    x: 50,
    y: 50,
    what: "The conduct of Meridian Ports Authority as a state-linked commercial entity, including evidence of political direction in commercial decisions.",
    why: "Whether the Respondent is treated as a sovereign or commercial actor has profound implications for immunity defenses, enforcement procedures, and procedural conduct during proceedings.",
    jurisdictionImpact: {
      "new-york": "weakens",
      london: "neutral",
      singapore: "strengthens",
      "hong-kong": "weakens",
    },
    evidenceNeeded:
      "Corporate structure analysis of Meridian Ports Authority; government ownership documentation; evidence of political intervention in commercial decisions.",
    confidence: "Medium",
    uncertainty:
      "MPA's legal status as sovereign or commercial entity is contested. Government ownership percentage and operational independence are disputed facts.",
  },
  {
    id: "tribunal-composition",
    label: "Tribunal Composition Risk",
    x: 22,
    y: 62,
    what: "The risk that tribunal composition — arbitrator nationality, specialization, and institutional affiliation — may disadvantage the claimant.",
    why: "In complex infrastructure disputes with sovereign counterparty exposure, arbitrator selection is a critical strategic variable. Institutional lists vary significantly in available expertise.",
    jurisdictionImpact: {
      "new-york": "neutral",
      london: "strengthens",
      singapore: "strengthens",
      "hong-kong": "weakens",
    },
    evidenceNeeded:
      "Intelligence on arbitrator track records in force majeure disputes; previous awards involving sovereign-linked counterparties; SIAC and LCIA panel roster analysis.",
    confidence: "Low",
    uncertainty:
      "Arbitrator selection intelligence is based on secondary sources. Opponent may have existing relationships with preferred panel members.",
  },
  {
    id: "enforcement-pathway",
    label: "Enforcement Pathway",
    x: 78,
    y: 62,
    what: "The available legal pathways to enforce an arbitral award against Meridian Ports Authority in jurisdictions where it holds enforceable assets.",
    why: "Winning an award is meaningless without enforcement. Asset location, sovereign immunity carve-outs, and New York Convention membership determine actual recovery prospects.",
    jurisdictionImpact: {
      "new-york": "neutral",
      london: "strengthens",
      singapore: "strengthens",
      "hong-kong": "weakens",
    },
    evidenceNeeded:
      "Asset mapping report for Respondent; legal opinion on sovereign immunity defenses in key enforcement jurisdictions; treaty analysis.",
    confidence: "Medium",
    uncertainty:
      "Asset mapping is incomplete. Respondent may have structured assets to avoid attachment in favorable jurisdictions.",
  },
  {
    id: "evidence-credibility",
    label: "Evidence Credibility",
    x: 50,
    y: 78,
    what: "The strength and admissibility of the claimant's evidentiary record across different arbitral forums with varying standards for document authentication.",
    why: "Mixed evidence quality is flagged in the case assessment. Multi-jurisdiction supply chains create authentication challenges that different institutional rules handle differently.",
    jurisdictionImpact: {
      "new-york": "neutral",
      london: "weakens",
      singapore: "neutral",
      "hong-kong": "neutral",
    },
    evidenceNeeded:
      "Authenticated shipping and port access records; certified translations; forensic accounting of losses; independent expert verification of supply-chain disruption.",
    confidence: "Low",
    uncertainty:
      "Document authentication across three jurisdictions is incomplete. Some contemporaneous records are in languages without certified translation.",
  },
  {
    id: "prior-patterns",
    label: "Prior Arbitral Patterns",
    x: 20,
    y: 88,
    what: "The track record of arbitral institutions and panels in analogous infrastructure, port access, and sovereign counterparty disputes.",
    why: "Institutional award patterns reveal implicit biases, preferred analytical frameworks, and outcome tendencies that informed venue selection.",
    jurisdictionImpact: {
      "new-york": "neutral",
      london: "strengthens",
      singapore: "strengthens",
      "hong-kong": "weakens",
    },
    evidenceNeeded:
      "Award database analysis; counsel intelligence on recent comparable awards; academic commentary on institutional trends.",
    confidence: "Medium",
    uncertainty:
      "Award databases are incomplete. Many SIAC and LCIA awards remain confidential. Patterns are inferred from public summaries.",
  },
  {
    id: "local-court-support",
    label: "Local Court Support",
    x: 80,
    y: 88,
    what: "The availability and quality of local court support for interim measures, emergency relief, and award enforcement in the seat jurisdiction.",
    why: "The supervisory court at the seat is the arbitral tribunal's procedural backstop. Court attitude to arbitration determines the practical effectiveness of emergency applications.",
    jurisdictionImpact: {
      "new-york": "neutral",
      london: "strengthens",
      singapore: "strengthens",
      "hong-kong": "neutral",
    },
    evidenceNeeded:
      "Analysis of local court arbitration decisions in past 24 months; counsel opinion on current judicial attitude to interim relief applications.",
    confidence: "High",
    uncertainty:
      "Court personnel change affects precedent reliability. Hong Kong uncertainty is elevated given institutional developments.",
  },
  {
    id: "settlement-leverage",
    label: "Settlement Leverage",
    x: 35,
    y: 70,
    what: "The factors that influence the parties' willingness to settle, including cost pressure, reputational risk, and time-to-award.",
    why: "Most international arbitrations settle before final award. Understanding the Respondent's settlement pressure points enables strategic filing and negotiation positioning.",
    jurisdictionImpact: {
      "new-york": "weakens",
      london: "strengthens",
      singapore: "strengthens",
      "hong-kong": "neutral",
    },
    evidenceNeeded:
      "Respondent financial analysis; intelligence on political pressure on Respondent from home government; assessment of reputational risk to MPA from public proceedings.",
    confidence: "Low",
    uncertainty:
      "Settlement psychology of sovereign-linked respondents is highly context-dependent. Diplomatic factors are opaque.",
  },
  {
    id: "public-sector",
    label: "Public-Sector Sensitivity",
    x: 65,
    y: 70,
    what: "The degree to which the dispute involves politically sensitive public infrastructure, government reputation, or diplomatic relationships.",
    why: "Disputes involving sovereign counterparties are subject to political dynamics that influence procedural conduct, settlement willingness, and enforcement cooperation.",
    jurisdictionImpact: {
      "new-york": "weakens",
      london: "neutral",
      singapore: "neutral",
      "hong-kong": "weakens",
    },
    evidenceNeeded:
      "Political risk analysis of Respondent's home jurisdiction; assessment of diplomatic relations between Claimant and Respondent countries.",
    confidence: "Medium",
    uncertainty:
      "Geopolitical dynamics are in flux. Trade relationship between relevant states has been strained by recent policy changes.",
  },
  {
    id: "expert-judgment",
    label: "Expert Tacit Judgment",
    x: 50,
    y: 35,
    what: "The structured capture of experienced arbitration counsel's tacit knowledge about institutional norms, panel behavior, and strategic considerations.",
    why: "Senior arbitration partners hold judgment that cannot be found in databases — about how panels actually reason, how Respondent's counsel thinks, and what evidence changes outcomes.",
    jurisdictionImpact: {
      "new-york": "neutral",
      london: "strengthens",
      singapore: "strengthens",
      "hong-kong": "weakens",
    },
    evidenceNeeded:
      "Structured interviews with 3-5 senior arbitration partners; review of opposing counsel track record; panel preference intelligence.",
    confidence: "Low",
    uncertainty:
      "Expert judgment has not been formally structured. This node represents the highest-value untapped information in the case.",
  },
];

// ---------------------------------------------------------------
// TACIT COUNSEL LAYER INSIGHTS
// ---------------------------------------------------------------
export const TACIT_INSIGHTS = [
  {
    id: "sovereign-disruption",
    title: "How tribunals weigh sovereign-linked disruption claims",
    insight:
      "Experienced arbitration panels in infrastructure disputes generally apply a heightened scrutiny standard when the Respondent is state-linked. Tribunals expect claimants to demonstrate that disruption was directional — not merely incidental to government regulatory activity — and that contemporaneous protest was made.",
    implication:
      "Claimant should compile all internal records showing that port access denial was treated as a commercial breach, not a regulatory compliance issue.",
    tag: "Institutional Judgment",
  },
  {
    id: "procedural-vs-precedent",
    title: "When procedural efficiency matters more than precedent density",
    insight:
      "In disputes where evidence quality is mixed and the record is complex, procedural predictability at the seat often matters more than the richness of local precedent. Venues with strong case management (SIAC) reduce the time available for procedural warfare by the stronger-resourced party.",
    implication:
      "Respondent's litigation resources are significantly larger. Procedural attrition is a real risk in venues with weaker case management culture.",
    tag: "Strategic Judgment",
  },
  {
    id: "local-court-settlement",
    title: "How local court support shapes settlement pressure",
    insight:
      "The credibility of emergency arbitrator applications and interim injunctive relief is strongly influenced by the local court's attitude to arbitration. Singapore courts have granted freezing orders against state-linked entities in recent disputes. This creates real settlement pressure pre-award.",
    implication:
      "Filing in Singapore with a simultaneous emergency arbitrator application can accelerate settlement discussions within the first 90 days.",
    tag: "Enforcement Intelligence",
  },
  {
    id: "force-majeure-framing",
    title: "How opposing counsel may frame force majeure and frustration",
    insight:
      "Respondent's likely defense strategy will combine: (1) strict notice deadline compliance arguments, (2) framing the access denial as regulatory necessity rather than breach, and (3) challenging the Claimant's mitigation efforts as commercially unreasonable. Each defense vector requires advance preparation.",
    implication:
      "Claimant must pre-audit the notice timeline, prepare regulatory necessity rebuttal evidence, and document mitigation steps comprehensively before filing.",
    tag: "Adversary Intelligence",
  },
  {
    id: "evidence-gaps",
    title: "Which evidence gaps could change the filing recommendation",
    insight:
      "The current recommendation favors Singapore. However, two evidence gaps could change this: (1) if the force majeure notice timeline cannot be repaired, London's stricter threshold makes it riskier; (2) if Respondent has no ASEAN-adjacent enforceable assets, Singapore's enforcement advantage diminishes.",
    implication:
      "Evidence remediation on these two issues should be completed before final filing decision is made.",
    tag: "Risk-Conditional",
  },
  {
    id: "partner-debate",
    title: "What experienced arbitration partners would debate before filing",
    insight:
      "The internal partner debate on this case will center on four questions: (1) Is the contract seat clause truly ambiguous, or are we wishful thinking? (2) Can we repair the notice gap or must we litigate around it? (3) Do we have enough on Respondent's commercial entity status to defeat sovereign immunity early? (4) What is the best-case settlement posture and when do we signal willingness to talk?",
    implication:
      "These four questions should be formally resolved before a filing decision is made. Cognisee structures this debate rather than replacing it.",
    tag: "Partner-Level Judgment",
  },
];

// ---------------------------------------------------------------
// STRESS TEST SCENARIOS
// ---------------------------------------------------------------
export type StressScenario = {
  id: string;
  label: string;
  description: string;
  scoreDeltas: {
    "new-york": { winnability: number; enforcement: number };
    london: { winnability: number; enforcement: number };
    singapore: { winnability: number; enforcement: number };
    "hong-kong": { winnability: number; enforcement: number };
  };
  impact: string;
};

export const STRESS_SCENARIOS: StressScenario[] = [
  {
    id: "evidence-improves",
    label: "Evidence quality improves",
    description: "Full authentication of all supply-chain records completed; notice gap resolved",
    scoreDeltas: {
      "new-york": { winnability: +5, enforcement: +2 },
      london: { winnability: +7, enforcement: +3 },
      singapore: { winnability: +6, enforcement: +2 },
      "hong-kong": { winnability: +4, enforcement: +1 },
    },
    impact: "Singapore retains lead. London gap closes. Recommendation unchanged.",
  },
  {
    id: "narrow-fm",
    label: "Force majeure clause is narrow",
    description: "Legal analysis confirms the FM clause requires impossibility, not mere impracticability",
    scoreDeltas: {
      "new-york": { winnability: -4, enforcement: 0 },
      london: { winnability: -8, enforcement: 0 },
      singapore: { winnability: -3, enforcement: 0 },
      "hong-kong": { winnability: -4, enforcement: 0 },
    },
    impact: "London drops materially. Singapore becomes the clear preferred seat. Proceed with caution.",
  },
  {
    id: "assets-asia",
    label: "Respondent has enforceable assets in Asia",
    description: "Asset mapping confirms significant MPA commercial holdings in Singapore and Malaysia",
    scoreDeltas: {
      "new-york": { winnability: 0, enforcement: -3 },
      london: { winnability: 0, enforcement: -2 },
      singapore: { winnability: +3, enforcement: +7 },
      "hong-kong": { winnability: 0, enforcement: +2 },
    },
    impact: "Singapore enforcement confidence surges. Recommendation strengthened materially.",
  },
  {
    id: "political-sensitivity",
    label: "Political sensitivity increases",
    description: "Diplomatic relations between relevant states deteriorate materially",
    scoreDeltas: {
      "new-york": { winnability: -3, enforcement: -5 },
      london: { winnability: 0, enforcement: 0 },
      singapore: { winnability: -2, enforcement: -1 },
      "hong-kong": { winnability: -6, enforcement: -8 },
    },
    impact: "Hong Kong becomes significantly less attractive. London gains relative standing.",
  },
  {
    id: "strict-interpretation",
    label: "Tribunal favors strict contract interpretation",
    description: "Intelligence suggests available arbitrators apply textualist contract analysis",
    scoreDeltas: {
      "new-york": { winnability: -2, enforcement: 0 },
      london: { winnability: +2, enforcement: 0 },
      singapore: { winnability: -1, enforcement: 0 },
      "hong-kong": { winnability: -3, enforcement: 0 },
    },
    impact: "London gains marginally. Does not change overall ranking if Singapore file is well-prepared.",
  },
  {
    id: "time-critical",
    label: "Time-to-award becomes critical",
    description: "Client confirms that commercial operations cannot sustain a 36+ month arbitration",
    scoreDeltas: {
      "new-york": { winnability: 0, enforcement: 0 },
      london: { winnability: 0, enforcement: 0 },
      singapore: { winnability: +4, enforcement: +2 },
      "hong-kong": { winnability: +2, enforcement: +1 },
    },
    impact: "Singapore SIAC's expedited procedure and efficient case management become decisive advantages.",
  },
];

// ---------------------------------------------------------------
// PARTNER BRIEF CONTENT
// ---------------------------------------------------------------
export const PARTNER_BRIEF = {
  title: "Preliminary Venue Strategy Brief",
  matter: "Atlas Renewables v. Meridian Ports Authority",
  date: "Prepared: June 2026",
  classification: "Privileged & Confidential — Attorney Work Product",
  sections: {
    casePosture:
      "Atlas Renewables Ltd. seeks to recover $420M in losses arising from alleged breach of long-term port procurement obligations, force majeure non-performance, and tariff disruption by Meridian Ports Authority, a state-linked commercial entity. Evidence quality is assessed as mixed. Governing law and seat clause are ambiguous. Enforcement sensitivity is high given the sovereign counterparty profile.",
    recommendedSeat: "Singapore (SIAC)",
    rationale: [
      "SIAC's strong institutional infrastructure and case management discipline reduces procedural attrition risk",
      "Singapore courts provide reliable interim measures against state-linked commercial entities",
      "Balanced force majeure interpretation standards under Singapore law are more favorable than English law strict threshold",
      "Strong enforcement infrastructure across ASEAN and key Asian commercial centers",
      "Commercially pragmatic tribunal pool with infrastructure and sovereign-commercial dispute experience",
    ],
    keyRisks: [
      "Force majeure notice timeline has a 14-day compliance gap requiring legal remediation",
      "Asset mapping for Respondent outside ASEAN is incomplete",
      "Governing law ambiguity may enable Respondent to argue for less favorable legal system",
      "Contract seat clause ambiguity creates challenge risk if Respondent contests SIAC jurisdiction",
    ],
    counterarguments: [
      "Respondent will argue FM notice non-compliance as threshold bar to recovery",
      "Sovereign immunity defense will be raised as preliminary jurisdictional objection",
      "Claimant's mitigation steps will be characterized as commercially unreasonable",
      "Respondent may argue SIAC seat unavailable absent express contractual basis",
    ],
    evidenceGaps: [
      "Force majeure notice documentation — 14-day gap requires immediate legal strategy",
      "Respondent asset mapping — ASEAN footprint partially mapped; broader regional picture incomplete",
      "Expert analysis on governing law selection — competing jurisdictions not yet formally briefed",
      "Tribunal composition intelligence — arbitrator track records not yet reviewed",
    ],
    partnerDecisionQuestions: [
      "Is Clause 22.4 truly ambiguous, or does a credible textual analysis support SIAC availability?",
      "Can the force majeure notice gap be addressed through a legal theory, or must we mitigate through evidence?",
      "Do we have sufficient commercial entity evidence to defeat a preliminary sovereign immunity objection at SIAC?",
      "What is the preferred settlement posture and at what stage should we signal willingness to discuss?",
      "Should we retain SIAC-specialist Singapore external counsel immediately, or prepare the filing in-house first?",
    ],
  },
};
