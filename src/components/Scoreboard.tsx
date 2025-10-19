import { Sparkles, Trophy, Gift } from "lucide-react";
import { cn } from "@/lib/utils";

interface ScoreboardProps {
  openedGoldenGifts: string[];
  unopenedGoldenGifts: string[];
  totalGoldenBoxes: number;
}

const Scoreboard = ({ openedGoldenGifts, unopenedGoldenGifts, totalGoldenBoxes }: ScoreboardProps) => {
  return (
    <div className="w-full bg-card border-t-4 border-accent py-4 px-6">
      <div className="max-w-7xl mx-auto space-y-4">
        {/* Unopened Golden Gifts Preview */}
        <div>
          <div className="flex items-center gap-3 mb-3">
            <Gift className="w-6 h-6 text-accent animate-pulse" />
            <h2 className="text-xl font-bold text-accent">
              숨겨진 골드 박스 선물
            </h2>
            <Sparkles className="w-6 h-6 text-accent animate-pulse" />
            <span className="text-lg text-muted-foreground ml-auto">
              {unopenedGoldenGifts.length > 0 ? `🎁 ${unopenedGoldenGifts.length}개의 골드 박스가 숨어있습니다!` : ""}
            </span>
          </div>
          
          <div className="flex flex-wrap gap-3">
            {unopenedGoldenGifts.length === 0 ? (
              <p className="text-muted-foreground text-lg">
                🎉 모든 골드 박스를 발견했습니다!
              </p>
            ) : (
              unopenedGoldenGifts.map((gift, index) => (
                <div
                  key={index}
                  className={cn(
                    "px-4 py-2 rounded-lg",
                    "bg-gradient-to-r from-accent/30 to-accent/20",
                    "border-2 border-accent/60",
                    "text-foreground font-medium text-lg",
                    "animate-shimmer bg-[length:200%_100%]"
                  )}
                >
                  {gift}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Opened Golden Gifts */}
        {openedGoldenGifts.length > 0 && (
          <div>
            <div className="flex items-center gap-3 mb-3">
              <Trophy className="w-6 h-6 text-accent" />
              <h2 className="text-xl font-bold text-accent">
                획득한 골드 박스 선물
              </h2>
            </div>
            
            <div className="flex flex-wrap gap-3">
              {openedGoldenGifts.map((gift, index) => (
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
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Scoreboard;
