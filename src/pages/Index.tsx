import { useState } from "react";
import Header from "@/components/Header";
import MCTiersTabs from "@/components/MCTiersTabs";
import PlayerRanking from "@/components/PlayerRanking";
import AdminLogin from "@/components/AdminLogin";
import PlayerEditor from "@/components/PlayerEditor";
import { useAdmin } from "@/hooks/useAdmin";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

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

const Index = () => {
  const { isAdmin, isLoginOpen, setIsLoginOpen, login, logout, requireAdmin } = useAdmin();
  const [searchQuery, setSearchQuery] = useState("");
  const [newPlayer, setNewPlayer] = useState({ username: "", region: "NA" });
  const [currentGamemode, setCurrentGamemode] = useState("overall");
  const [editingPlayer, setEditingPlayer] = useState<Player | null>(null);

  const [players, setPlayers] = useState<Player[]>([
    {
      id: "1",
      username: "Marlowww",
      title: "Combat Grandmaster",
      region: "NA",
      gamemodeData: {
        overall: {
          points: 405,
          ranks: {
            ltms: "HT1",
            vanilla: "HT1",
            uhc: "HT1",
            pot: "LT1",
            nethop: "LT1",
            smp: "HT1",
            sword: "HT1",
            axe: "HT1",
            mace: "HT1"
          }
        },
        ltms: {
          points: 150,
          ranks: {
            ltms: "HT1",
            vanilla: "NA",
            uhc: "NA",
            pot: "NA",
            nethop: "NA",
            smp: "NA",
            sword: "NA",
            axe: "NA",
            mace: "NA"
          }
        }
      }
    },
    {
      id: "2",
      username: "ItzRealMe",
      title: "Combat Master",
      region: "NA",
      gamemodeData: {
        overall: {
          points: 330,
          ranks: {
            ltms: "HT1",
            vanilla: "HT1",
            uhc: "HT1",
            pot: "HT2",
            nethop: "LT2",
            smp: "LT2",
            sword: "HT2",
            axe: "HT1",
            mace: "LT2"
          }
        }
      }
    },
    {
      id: "3",
      username: "Swight",
      title: "Combat Master",
      region: "NA",
      gamemodeData: {
        overall: {
          points: 260,
          ranks: {
            ltms: "HT1",
            vanilla: "LT2",
            uhc: "LT2",
            pot: "HT3",
            nethop: "HT3",
            smp: "NA",
            sword: "HT3",
            axe: "LT2",
            mace: "HT3"
          }
        }
      }
    }
  ]);

  const addPlayer = () => {
    if (!requireAdmin()) return;
    if (!newPlayer.username.trim()) return;

    const player: Player = {
      id: Date.now().toString(),
      username: newPlayer.username.trim(),
      title: "New Player",
      region: newPlayer.region,
      gamemodeData: {
        overall: {
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
        }
      }
    };

    setPlayers(prev => [...prev, player]);
    setNewPlayer({ username: "", region: "NA" });
  };

  const handleEditPlayer = (player: Player) => {
    if (!requireAdmin()) return;
    setEditingPlayer(player);
  };

  const handleSavePlayer = (updatedPlayer: Player) => {
    setPlayers(prev => prev.map(p => p.id === updatedPlayer.id ? updatedPlayer : p));
  };

  const handleDeletePlayer = (playerId: string) => {
    setPlayers(prev => prev.filter(p => p.id !== playerId));
  };

  const handleAdminAction = () => {
    if (isAdmin) {
      logout();
    } else {
      setIsLoginOpen(true);
    }
  };

  const getPlayersByGamemode = () => {
    return players
      .filter(player =>
        player.username.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .sort((a, b) => {
        const aData = a.gamemodeData[currentGamemode];
        const bData = b.gamemodeData[currentGamemode];
        const aPoints = aData?.points || 0;
        const bPoints = bData?.points || 0;
        return bPoints - aPoints;
      });
  };

  const filteredPlayers = getPlayersByGamemode();

  return (
    <div className="min-h-screen bg-background">
      <Header 
        onSearch={setSearchQuery} 
        isAdmin={isAdmin}
        onAdminAction={handleAdminAction}
      />
      
      <div className="container mx-auto px-4 py-6">
        {/* Add Player Section - Only for Admins */}
        {isAdmin && (
          <Card className="mb-6 border-primary/20">
            <CardContent className="p-4">
              <div className="flex gap-3 items-end">
                <div className="flex-1">
                  <label className="text-sm font-medium mb-2 block">Add New Player</label>
                  <Input
                    placeholder="Minecraft username"
                    value={newPlayer.username}
                    onChange={(e) => setNewPlayer(prev => ({ ...prev, username: e.target.value }))}
                    onKeyPress={(e) => e.key === 'Enter' && addPlayer()}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Region</label>
                  <select 
                    className="px-3 py-2 bg-muted border border-border rounded-md"
                    value={newPlayer.region}
                    onChange={(e) => setNewPlayer(prev => ({ ...prev, region: e.target.value }))}
                  >
                    <option value="NA">NA</option>
                    <option value="EU">EU</option>
                    <option value="AS">AS</option>
                  </select>
                </div>
                <Button onClick={addPlayer} className="bg-primary hover:bg-primary/90">
                  Add Player
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Gamemode Tabs with Rankings */}
        <MCTiersTabs onGamemodeChange={setCurrentGamemode}>
          <div className="space-y-3">
            {filteredPlayers.map((player, index) => (
              <PlayerRanking
                key={player.id}
                player={player}
                position={index + 1}
                currentGamemode={currentGamemode}
                isAdmin={isAdmin}
                onEdit={handleEditPlayer}
              />
            ))}
          </div>
        </MCTiersTabs>
      </div>

      {/* Admin Login Modal */}
      <AdminLogin
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLogin={login}
      />

      {/* Player Editor Modal */}
      <PlayerEditor
        player={editingPlayer}
        isOpen={!!editingPlayer}
        onClose={() => setEditingPlayer(null)}
        onSave={handleSavePlayer}
        onDelete={handleDeletePlayer}
      />
    </div>
  );
};

export default Index;
