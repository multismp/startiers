import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trophy, Sword, Axe, Shield, Crown, Flame, Users, Diamond } from "lucide-react";

interface MCTiersTabsProps {
  children: React.ReactNode;
  onGamemodeChange?: (gamemode: string) => void;
}

const MCTiersTabs = ({ children, onGamemodeChange }: MCTiersTabsProps) => {
  const gamemodes = [
    { id: "overall", label: "Overall", icon: Trophy, description: "Top players across all categories" },
    { id: "ltms", label: "LTMs", icon: Crown, description: "Limited Time Modes" },
    { id: "vanilla", label: "Vanilla", icon: Diamond, description: "Pure Minecraft PvP" },
    { id: "uhc", label: "UHC", icon: Flame, description: "Ultra Hardcore" },
    { id: "pot", label: "Pot", icon: Shield, description: "Potion PvP" },
    { id: "nethop", label: "NethOP", icon: Users, description: "Nether OP PvP" },
    { id: "smp", label: "SMP", icon: Users, description: "Survival Multiplayer" },
    { id: "sword", label: "Sword", icon: Sword, description: "Sword Combat" },
    { id: "axe", label: "Axe", icon: Axe, description: "Axe Combat" },
    { id: "mace", label: "Mace", icon: Shield, description: "Mace Combat" }
  ];

  return (
    <div className="w-full">
      <Tabs defaultValue="overall" className="w-full" onValueChange={onGamemodeChange}>
        {/* Horizontal scrollable tabs */}
        <div className="border-b border-border mb-6">
          <TabsList className="w-full justify-start h-auto p-0 bg-transparent overflow-x-auto">
            <div className="flex gap-1 p-1 min-w-max">
              {gamemodes.map((mode) => {
                const IconComponent = mode.icon;
                return (
                  <TabsTrigger 
                    key={mode.id} 
                    value={mode.id}
                    className="flex items-center gap-2 px-4 py-2 rounded-t-lg border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-primary/10 hover:bg-accent/50 transition-colors"
                  >
                    <IconComponent className="w-4 h-4" />
                    {mode.label}
                  </TabsTrigger>
                );
              })}
            </div>
          </TabsList>
        </div>
        
        {gamemodes.map((mode) => (
          <TabsContent key={mode.id} value={mode.id} className="mt-0">
            <div className="mb-6">
              <h1 className="text-3xl font-bold mb-2">{mode.label} Rankings</h1>
              <p className="text-muted-foreground">{mode.description}</p>
            </div>
            {children}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default MCTiersTabs;