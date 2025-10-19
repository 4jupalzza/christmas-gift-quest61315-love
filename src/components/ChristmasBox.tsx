import { Gift } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChristmasBoxProps {
  number: number;
  position: number;
  isOpened: boolean;
  onClick: () => void;
}

const ChristmasBox = ({ number, position, isOpened, onClick }: ChristmasBoxProps) => {
  // Checkerboard pattern: alternate red and green based on position
  const isRedBox = (Math.floor((position - 1) / 5) + (position - 1)) % 2 === 0;
  
  return (
    <button
      onClick={onClick}
      disabled={isOpened}
      className={cn(
        "relative aspect-square rounded-lg border-4 transition-all duration-300",
        "flex flex-col items-center justify-center gap-2",
        "shadow-lg hover:shadow-2xl",
        "disabled:cursor-not-allowed disabled:opacity-60",
        !isOpened && isRedBox && "bg-box-regular border-primary hover:bg-box-regular-hover",
        !isOpened && !isRedBox && "bg-secondary border-secondary-foreground hover:bg-secondary/80",
        isOpened && "bg-box-opened border-muted",
        !isOpened && "hover:scale-105 hover:-translate-y-2"
      )}
    >
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
