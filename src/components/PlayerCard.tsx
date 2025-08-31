import { Card, CardContent } from "@/components/ui/card";
import MinecraftSkin from "./MinecraftSkin";
import { Badge } from "@/components/ui/badge";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Player {
  id: string;
  username: string;
  rank?: string;
  score?: number;
}

interface PlayerCardProps {
  player: Player;
  tier: 'S' | 'A' | 'B' | 'C' | 'D';
}

const PlayerCard = ({ player, tier }: PlayerCardProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: player.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const tierColors = {
    S: "bg-tier-s text-tier-s-foreground",
    A: "bg-tier-a text-tier-a-foreground", 
    B: "bg-tier-b text-tier-b-foreground",
    C: "bg-tier-c text-tier-c-foreground",
    D: "bg-tier-d text-tier-d-foreground"
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`cursor-grab active:cursor-grabbing transition-all duration-200 hover:shadow-player ${
        isDragging ? 'opacity-50 rotate-2' : ''
      }`}
    >
      <CardContent className="p-3 flex items-center gap-3">
        <MinecraftSkin username={player.username} size="md" />
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm truncate">{player.username}</p>
          {player.rank && (
            <Badge variant="secondary" className="text-xs mt-1">
              {player.rank}
            </Badge>
          )}
        </div>
        <Badge className={`${tierColors[tier]} font-bold`}>
          {tier}
        </Badge>
      </CardContent>
    </Card>
  );
};

export default PlayerCard;