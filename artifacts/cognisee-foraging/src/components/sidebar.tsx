import { useLocation } from "wouter";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Globe2,
  Network,
  BrainCircuit,
  Award,
} from "lucide-react";

export function Sidebar() {
  const [location, setLocation] = useLocation();

  const links = [
    { href: "/", label: "Case Overview", icon: LayoutDashboard },
    { href: "/jurisdictions", label: "Venue Analysis", icon: Globe2 },
    { href: "/foraging-map", label: "Foraging Map", icon: Network },
    { href: "/tacit-counsel", label: "Tacit Counsel Layer", icon: BrainCircuit },
    { href: "/recommendation", label: "Strategic Recommendation", icon: Award },
  ];

  return (
    <aside className="w-64 border-r border-border bg-sidebar h-full flex flex-col shrink-0">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-border">
        <div>
          <h1 className="font-serif text-lg font-semibold tracking-tight text-primary">
            Cognisee
          </h1>
          <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
            Epistemic Foraging
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        <div className="text-xs font-mono uppercase text-muted-foreground mb-4 px-2 tracking-wider">
          Arbitration Venue Strategy
        </div>
        {links.map((link) => {
          const isActive = location === link.href;
          const Icon = link.icon;
          return (
            <button
              key={link.href}
              onClick={() => setLocation(link.href)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors text-left",
                isActive
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}
            >
              <Icon
                className={cn(
                  "w-4 h-4",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}
              />
              {link.label}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border space-y-1">
        <div className="text-xs text-muted-foreground font-mono">
          Atlas Renewables v. MPA
        </div>
        <div className="text-xs text-muted-foreground font-mono">
          ARB-2026-0441 · Privileged
        </div>
      </div>
    </aside>
  );
}
