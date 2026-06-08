import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Layout } from "@/components/layout";
import { OnboardingModal } from "@/components/onboarding-modal";

import Dashboard from "@/pages/dashboard";
import Jurisdictions from "@/pages/jurisdictions";
import ForagingMap from "@/pages/foraging-map";
import TacitCounsel from "@/pages/tacit-counsel";
import Recommendation from "@/pages/recommendation";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/jurisdictions" component={Jurisdictions} />
      <Route path="/foraging-map" component={ForagingMap} />
      <Route path="/tacit-counsel" component={TacitCounsel} />
      <Route path="/recommendation" component={Recommendation} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Layout>
            <Router />
          </Layout>
          <OnboardingModal />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
