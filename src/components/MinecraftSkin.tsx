import { useState } from "react";
import { Card } from "@/components/ui/card";

interface MinecraftSkinProps {
  username: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const MinecraftSkin = ({ username, size = "md", className = "" }: MinecraftSkinProps) => {
  const [imageError, setImageError] = useState(false);
  
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-16 h-16", 
    lg: "w-24 h-24"
  };

  const skinUrl = `https://mc-heads.net/avatar/${username}`;
  const fallbackUrl = "https://mc-heads.net/avatar/steve";

  return (
    <Card className={`${sizeClasses[size]} p-1 bg-muted overflow-hidden ${className}`}>
      <img
        src={imageError ? fallbackUrl : skinUrl}
        alt={`${username}'s Minecraft skin`}
        className="w-full h-full object-cover pixelated"
        onError={() => setImageError(true)}
        style={{ imageRendering: 'pixelated' }}
      />
    </Card>
  );
};

export default MinecraftSkin;