import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import MinecraftSkin from "./MinecraftSkin";

interface Player {
  id: string;
  username: string;
  title: string;
  region: string;
  gamemodeData: {
    [gamemode: string]: {
      points: number;
      ranks: {
        ltms: string;
        vanilla: string;
        uhc: string;
        pot: string;
        nethop: string;
        smp: string;
        sword: string;
        axe: string;
        mace: string;
      };
    };
  };
}

interface PlayerRankingProps {
  player: Player;
  position: number;
  currentGamemode: string;
  isAdmin?: boolean;
  onEdit?: (player: Player) => void;
}

const PlayerRanking = ({ player, position, currentGamemode, isAdmin, onEdit }: PlayerRankingProps) => {
  const getTierBadgeStyle = (rank: string) => {
    const tierColors: { [key: string]: string } = {
      'HT1': 'bg-tier-ht1 text-black',
      'HT2': 'bg-tier-ht2 text-black', 
      'HT3': 'bg-tier-ht3 text-black',
      'HT4': 'bg-tier-ht4 text-white',
      'LT1': 'bg-tier-lt1 text-white',
      'LT2': 'bg-tier-lt2 text-white',
      'LT3': 'bg-tier-lt3 text-white',
      'LT4': 'bg-tier-lt4 text-white',
      'NA': 'bg-muted text-muted-foreground'
    };
    return tierColors[rank] || 'bg-muted text-muted-foreground';
  };

  const getPositionBadge = () => {
    if (position <= 3) {
      const colors = {
        1: 'bg-rank-1 text-black',
        2: 'bg-rank-2 text-black',
        3: 'bg-rank-3 text-white'
      };
      return (
        <div className={`w-8 h-8 rounded-full ${colors[position as keyof typeof colors]} flex items-center justify-center font-bold text-sm`}>
          {position}
        </div>
      );
    }
    return (
      <div className="w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center font-bold text-sm">
        {position}
      </div>
    );
  };

  const getCurrentGamemodeData = () => {
    return player.gamemodeData[currentGamemode] || {
      points: 0,
      ranks: {
        ltms: "NA",
        vanilla: "NA",
        uhc: "NA", 
        pot: "NA",
        nethop: "NA",
        smp: "NA",
        sword: "NA",
        axe: "NA",
        mace: "NA"
      }
    };
  };

  const gamemodeData = getCurrentGamemodeData();
  const currentRanks = gamemodeData.ranks;

  const getRegionBadge = () => {
    const regionColors = {
      'NA': 'bg-blue-600 text-white',
      'EU': 'bg-green-600 text-white',
      'AS': 'bg-purple-600 text-white'
    };
    return regionColors[player.region as keyof typeof regionColors] || 'bg-muted text-muted-foreground';
  };

  return (
    <Card className="border border-border bg-card hover:bg-accent/50 transition-colors">
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          {/* Position */}
          {getPositionBadge()}
          
          {/* Avatar & Info */}
          <div className="flex items-center gap-3 flex-1">
            <MinecraftSkin username={player.username} size="lg" />
            <div>
              <h3 className="font-bold text-lg">{player.username}</h3>
              <p className="text-sm text-muted-foreground">{player.title}</p>
              <p className="text-xs text-primary">({gamemodeData.points} points)</p>
            </div>
          </div>

          {/* Region Badge */}
          <Badge className={`${getRegionBadge()} font-semibold`}>
            {player.region}
          </Badge>

          {/* Tier Rankings */}
          <div className="flex gap-1 flex-wrap">
            <Badge className={`text-xs px-2 py-1 ${getTierBadgeStyle(currentRanks.ltms)}`}>
              {currentRanks.ltms}
            </Badge>
            <Badge className={`text-xs px-2 py-1 ${getTierBadgeStyle(currentRanks.vanilla)}`}>
              {currentRanks.vanilla}
            </Badge>
            <Badge className={`text-xs px-2 py-1 ${getTierBadgeStyle(currentRanks.uhc)}`}>
              {currentRanks.uhc}
            </Badge>
            <Badge className={`text-xs px-2 py-1 ${getTierBadgeStyle(currentRanks.pot)}`}>
              {currentRanks.pot}
            </Badge>
            <Badge className={`text-xs px-2 py-1 ${getTierBadgeStyle(currentRanks.nethop)}`}>
              {currentRanks.nethop}
            </Badge>
            <Badge className={`text-xs px-2 py-1 ${getTierBadgeStyle(currentRanks.sword)}`}>
              {currentRanks.sword}
            </Badge>
            <Badge className={`text-xs px-2 py-1 ${getTierBadgeStyle(currentRanks.axe)}`}>
              {currentRanks.axe}
            </Badge>
            <Badge className={`text-xs px-2 py-1 ${getTierBadgeStyle(currentRanks.mace)}`}>
              {currentRanks.mace}
            </Badge>
          </div>

          {/* Edit Button for Admins */}
          {isAdmin && onEdit && (
            <Button variant="outline" size="sm" onClick={() => onEdit(player)}>
              Edit
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PlayerRanking;