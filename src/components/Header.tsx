import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Settings, Home, BarChart3, MessageCircle, Users } from "lucide-react";

interface HeaderProps {
  onSearch?: (query: string) => void;
  isAdmin?: boolean;
  onAdminAction?: () => void;
}

const Header = ({ onSearch, isAdmin, onAdminAction }: HeaderProps) => {
  return (
    <header className="bg-background border-b border-border">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo & Navigation */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="text-2xl font-bold text-primary">MCTIERS</div>
            </div>
            
            <nav className="hidden md:flex items-center gap-4">
              <Button variant="ghost" size="sm" className="flex items-center gap-2">
                <Home className="w-4 h-4" />
                Home
              </Button>
              <Button variant="ghost" size="sm" className="flex items-center gap-2 text-primary">
                <BarChart3 className="w-4 h-4" />
                Rankings
              </Button>
              <Button variant="ghost" size="sm" className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4" />
                Discord
              </Button>
            </nav>
          </div>

          {/* Search & Actions */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search player..."
                className="pl-9 w-64 bg-muted border-border"
                onChange={(e) => onSearch?.(e.target.value)}
              />
            </div>
            
            <Badge className="bg-primary text-primary-foreground">
              PVP CLUB
            </Badge>
            
            <div className="text-sm text-muted-foreground hidden lg:block">
              SERVER IP: <span className="text-foreground font-mono">mcpvp.club</span>
            </div>
            
            <Button variant="ghost" size="sm">
              <Settings className="w-4 h-4" />
            </Button>
            
            <Button size="sm" className="bg-primary hover:bg-primary/90" onClick={onAdminAction}>
              <Users className="w-4 h-4 mr-2" />
              {isAdmin ? "Admin ✓" : "Admin"}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;