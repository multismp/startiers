import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Sword, Pickaxe, Building, Crown } from "lucide-react";

interface GamemodeTabsProps {
  children: React.ReactNode;
  onGamemodeChange?: (gamemode: string) => void;
}

const GamemodeTabs = ({ children, onGamemodeChange }: GamemodeTabsProps) => {
  const gamemodes = [
    { id: "survival", label: "Survival", icon: Pickaxe, color: "bg-minecraft-dirt" },
    { id: "creative", label: "Creative", icon: Building, color: "bg-minecraft-diamond" },
    { id: "pvp", label: "PvP", icon: Sword, color: "bg-destructive" },
    { id: "skyblock", label: "Skyblock", icon: Crown, color: "bg-minecraft-gold" }
  ];

  return (
    <Tabs defaultValue="survival" className="w-full" onValueChange={onGamemodeChange}>
      <TabsList className="grid w-full grid-cols-4 mb-6">
        {gamemodes.map((mode) => {
          const IconComponent = mode.icon;
          return (
            <TabsTrigger 
              key={mode.id} 
              value={mode.id}
              className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <IconComponent className="w-4 h-4" />
              {mode.label}
            </TabsTrigger>
          );
        })}
      </TabsList>
      
      {gamemodes.map((mode) => (
        <TabsContent key={mode.id} value={mode.id} className="mt-0">
          <div className="mb-4">
            <Badge variant="secondary" className="mb-2">
              {mode.label} Rankings
            </Badge>
          </div>
          {children}
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default GamemodeTabs;