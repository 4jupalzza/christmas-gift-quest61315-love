import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface ScoreboardProps {
  unopenedGoldenGifts: string[];
}

const Scoreboard = ({ unopenedGoldenGifts }: ScoreboardProps) => {
  return (
    <div className="w-full bg-card border-t-4 border-accent py-4 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-3">
          <Sparkles className="w-6 h-6 text-accent animate-pulse" />
          <h2 className="text-xl font-bold text-accent">
            남은 골드 박스 선물
          </h2>
          <Sparkles className="w-6 h-6 text-accent animate-pulse" />
        </div>
        
        <div className="flex flex-wrap gap-3">
          {unopenedGoldenGifts.length === 0 ? (
            <p className="text-muted-foreground text-lg">
              🎉 모든 골드 박스를 열었습니다!
            </p>
          ) : (
            unopenedGoldenGifts.map((gift, index) => (
              <div
                key={index}
                className={cn(
                  "px-4 py-2 rounded-lg",
                  "bg-gradient-to-r from-accent/20 to-accent/10",
                  "border-2 border-accent/50",
                  "text-foreground font-medium text-lg",
                  "animate-float"
                )}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {gift}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Scoreboard;
