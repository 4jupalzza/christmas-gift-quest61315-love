import { Gift, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChristmasBoxProps {
  number: number;
  isGolden: boolean;
  isOpened: boolean;
  onClick: () => void;
}

const ChristmasBox = ({ number, isGolden, isOpened, onClick }: ChristmasBoxProps) => {
  return (
    <button
      onClick={onClick}
      disabled={isOpened}
      className={cn(
        "relative aspect-square rounded-lg border-4 transition-all duration-300",
        "flex flex-col items-center justify-center gap-2",
        "shadow-lg hover:shadow-2xl",
        "disabled:cursor-not-allowed disabled:opacity-60",
        isGolden && !isOpened && "bg-box-gold border-christmas-gold-light hover:bg-box-gold-hover animate-shimmer",
        isGolden && !isOpened && "bg-gradient-to-br from-box-gold via-christmas-gold-light to-box-gold",
        isGolden && !isOpened && "bg-[length:200%_100%]",
        !isGolden && !isOpened && "bg-box-regular border-primary hover:bg-box-regular-hover",
        isOpened && "bg-box-opened border-muted",
        !isOpened && "hover:scale-105 hover:-translate-y-2"
      )}
    >
      {/* Sparkle effect for golden boxes */}
      {isGolden && !isOpened && (
        <Sparkles className="absolute top-2 right-2 w-5 h-5 text-christmas-snow animate-pulse" />
      )}
      
      {/* Box number */}
      <span className={cn(
        "text-4xl font-bold",
        isOpened ? "text-muted-foreground" : "text-christmas-snow drop-shadow-lg"
      )}>
        {number}
      </span>
      
      {/* Gift icon */}
      <Gift className={cn(
        "w-8 h-8",
        isOpened ? "text-muted-foreground" : "text-christmas-snow"
      )} />
      
      {/* Opened indicator */}
      {isOpened && (
        <span className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-muted-foreground bg-box-opened/50 rounded-lg">
          OPENED
        </span>
      )}
    </button>
  );
};

export default ChristmasBox;
