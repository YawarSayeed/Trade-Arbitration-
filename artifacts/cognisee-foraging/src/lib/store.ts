import { create } from "zustand";

interface ArbitrationState {
  selectedJurisdiction: string | null;
  setSelectedJurisdiction: (id: string | null) => void;

  activeView: "score" | "reasoning";
  setActiveView: (v: "score" | "reasoning") => void;

  stressTestOpen: boolean;
  setStressTestOpen: (v: boolean) => void;

  activeStressScenarios: string[];
  toggleStressScenario: (id: string) => void;

  counterargsOpen: boolean;
  setCounterargsOpen: (v: boolean) => void;

  compareModeOpen: boolean;
  setCompareModeOpen: (v: boolean) => void;

  partnerBriefOpen: boolean;
  setPartnerBriefOpen: (v: boolean) => void;

  selectedForagingNode: string | null;
  setSelectedForagingNode: (id: string | null) => void;

  hasSeenOnboarding: boolean;
  setHasSeenOnboarding: (v: boolean) => void;
}

export const useStore = create<ArbitrationState>((set) => ({
  selectedJurisdiction: null,
  setSelectedJurisdiction: (id) => set({ selectedJurisdiction: id }),

  activeView: "score",
  setActiveView: (v) => set({ activeView: v }),

  stressTestOpen: false,
  setStressTestOpen: (v) => set({ stressTestOpen: v }),

  activeStressScenarios: [],
  toggleStressScenario: (id) =>
    set((s) => ({
      activeStressScenarios: s.activeStressScenarios.includes(id)
        ? s.activeStressScenarios.filter((x) => x !== id)
        : [...s.activeStressScenarios, id],
    })),

  counterargsOpen: false,
  setCounterargsOpen: (v) => set({ counterargsOpen: v }),

  compareModeOpen: false,
  setCompareModeOpen: (v) => set({ compareModeOpen: v }),

  partnerBriefOpen: false,
  setPartnerBriefOpen: (v) => set({ partnerBriefOpen: v }),

  selectedForagingNode: null,
  setSelectedForagingNode: (id) => set({ selectedForagingNode: id }),

  hasSeenOnboarding: localStorage.getItem("cognisee_arb_onboarding") === "true",
  setHasSeenOnboarding: (v) => {
    localStorage.setItem("cognisee_arb_onboarding", v ? "true" : "false");
    set({ hasSeenOnboarding: v });
  },
}));
