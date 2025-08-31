import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PlayerCard from "./PlayerCard";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";

interface Player {
  id: string;
  username: string;
  rank?: string;
  score?: number;
}

interface TierListProps {
  tier: 'S' | 'A' | 'B' | 'C' | 'D';
  players: Player[];
  title: string;
}

const TierList = ({ tier, players, title }: TierListProps) => {
  const { setNodeRef } = useDroppable({
    id: tier,
  });

  const tierStyles = {
    S: "border-tier-s/30 bg-tier-s/5",
    A: "border-tier-a/30 bg-tier-a/5", 
    B: "border-tier-b/30 bg-tier-b/5",
    C: "border-tier-c/30 bg-tier-c/5",
    D: "border-tier-d/30 bg-tier-d/5"
  };

  const tierBadgeStyles = {
    S: "bg-tier-s text-background",
    A: "bg-tier-a text-background",
    B: "bg-tier-b text-background", 
    C: "bg-tier-c text-background",
    D: "bg-tier-d text-background"
  };

  return (
    <Card className={`${tierStyles[tier]} border-2`}>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded-full ${tierBadgeStyles[tier]} flex items-center justify-center font-bold text-lg`}>
            {tier}
          </div>
          {title}
          <span className="text-sm text-muted-foreground ml-auto">
            ({players.length})
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent
        ref={setNodeRef}
        className="min-h-[120px] space-y-2"
      >
        <SortableContext items={players.map(p => p.id)} strategy={verticalListSortingStrategy}>
          {players.map((player) => (
            <PlayerCard key={player.id} player={player} tier={tier} />
          ))}
        </SortableContext>
        {players.length === 0 && (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            Drop players here
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TierList;