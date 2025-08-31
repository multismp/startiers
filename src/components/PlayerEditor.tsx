import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

interface PlayerEditorProps {
  player: Player | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (player: Player) => void;
  onDelete?: (playerId: string) => void;
}

const PlayerEditor = ({ player, isOpen, onClose, onSave, onDelete }: PlayerEditorProps) => {
  const [editedPlayer, setEditedPlayer] = useState<Player | null>(null);
  const [currentGamemode, setCurrentGamemode] = useState("overall");

  const gamemodes = [
    "overall", "ltms", "vanilla", "uhc", "pot", "nethop", "smp", "sword", "axe", "mace"
  ];

  const tierOptions = ["HT1", "HT2", "HT3", "HT4", "LT1", "LT2", "LT3", "LT4", "NA"];

  useEffect(() => {
    if (player) {
      setEditedPlayer({ ...player });
    }
  }, [player]);

  if (!editedPlayer) return null;

  const updateGamemodeData = (gamemode: string, field: string, value: string | number) => {
    setEditedPlayer(prev => {
      if (!prev) return null;
      
      const newData = { ...prev };
      if (!newData.gamemodeData[gamemode]) {
        newData.gamemodeData[gamemode] = {
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
      }
      
      if (field === 'points') {
        newData.gamemodeData[gamemode].points = Number(value);
      } else {
        (newData.gamemodeData[gamemode].ranks as any)[field] = value as string;
      }
      
      return newData;
    });
  };

  const handleSave = () => {
    if (editedPlayer) {
      onSave(editedPlayer);
      onClose();
    }
  };

  const handleDelete = () => {
    if (editedPlayer && onDelete) {
      onDelete(editedPlayer.id);
      onClose();
    }
  };

  const getCurrentGamemodeData = () => {
    return editedPlayer?.gamemodeData[currentGamemode] || {
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <MinecraftSkin username={editedPlayer.username} size="md" />
            Edit Player: {editedPlayer.username}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Info */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              <div>
                <Label>Username</Label>
                <Input
                  value={editedPlayer.username}
                  onChange={(e) => setEditedPlayer(prev => prev ? { ...prev, username: e.target.value } : null)}
                />
              </div>
              <div>
                <Label>Title</Label>
                <Input
                  value={editedPlayer.title}
                  onChange={(e) => setEditedPlayer(prev => prev ? { ...prev, title: e.target.value } : null)}
                />
              </div>
              <div>
                <Label>Region</Label>
                <Select
                  value={editedPlayer.region}
                  onValueChange={(value) => setEditedPlayer(prev => prev ? { ...prev, region: value } : null)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="NA">NA</SelectItem>
                    <SelectItem value="EU">EU</SelectItem>
                    <SelectItem value="AS">AS</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Gamemode Data */}
          <Card>
            <CardHeader>
              <CardTitle>Gamemode Rankings & Points</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={currentGamemode} onValueChange={setCurrentGamemode}>
                <TabsList className="grid grid-cols-5 mb-4">
                  {gamemodes.slice(0, 5).map(mode => (
                    <TabsTrigger key={mode} value={mode} className="capitalize">
                      {mode}
                    </TabsTrigger>
                  ))}
                </TabsList>
                <TabsList className="grid grid-cols-5 mb-6">
                  {gamemodes.slice(5).map(mode => (
                    <TabsTrigger key={mode} value={mode} className="capitalize">
                      {mode}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {gamemodes.map(gamemode => (
                  <TabsContent key={gamemode} value={gamemode}>
                    <div className="space-y-4">
                      <div>
                        <Label>Points for {gamemode}</Label>
                        <Input
                          type="number"
                          value={getCurrentGamemodeData().points}
                          onChange={(e) => updateGamemodeData(gamemode, 'points', e.target.value)}
                        />
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4">
                        {Object.entries(getCurrentGamemodeData().ranks).map(([rankType, rankValue]) => (
                          <div key={rankType}>
                            <Label className="capitalize">{rankType} Tier</Label>
                            <Select
                              value={rankValue}
                              onValueChange={(value) => updateGamemodeData(gamemode, rankType, value)}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {tierOptions.map(tier => (
                                  <SelectItem key={tier} value={tier}>
                                    <Badge className={`text-xs ${
                                      tier === 'HT1' ? 'bg-tier-ht1 text-black' :
                                      tier === 'HT2' ? 'bg-tier-ht2 text-black' :
                                      tier === 'HT3' ? 'bg-tier-ht3 text-black' :
                                      tier === 'HT4' ? 'bg-tier-ht4 text-white' :
                                      tier === 'LT1' ? 'bg-tier-lt1 text-white' :
                                      tier === 'LT2' ? 'bg-tier-lt2 text-white' :
                                      tier === 'LT3' ? 'bg-tier-lt3 text-white' :
                                      tier === 'LT4' ? 'bg-tier-lt4 text-white' :
                                      'bg-muted text-muted-foreground'
                                    }`}>
                                      {tier}
                                    </Badge>
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex justify-between">
            <div>
              {onDelete && (
                <Button variant="destructive" onClick={handleDelete}>
                  Delete Player
                </Button>
              )}
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button onClick={handleSave}>
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PlayerEditor;