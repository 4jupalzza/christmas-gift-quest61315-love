import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Gift, Trophy, Diamond } from "lucide-react";
import { cn } from "@/lib/utils";

interface GiftRevealProps {
  gift: string | null;
  isOpen: boolean;
  onClose: () => void;
  isGolden?: boolean;
  isSpecial?: boolean;
}

const GiftReveal = ({ gift, isOpen, onClose, isGolden = false, isSpecial = false }: GiftRevealProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={cn(
        "sm:max-w-md border-2",
        isSpecial 
          ? "bg-gradient-to-br from-platinum via-platinum-light to-platinum border-platinum-light"
          : isGolden 
            ? "bg-gradient-to-br from-box-gold via-horse-gold-light to-box-gold border-horse-gold-light"
            : "bg-card border-border"
      )}>
        <div className="flex flex-col items-center justify-center space-y-6 py-8">
          {isSpecial ? (
            <Diamond className="w-20 h-20 text-platinum-dark animate-bounce" />
          ) : isGolden ? (
            <Trophy className="w-20 h-20 text-accent-foreground animate-bounce" />
          ) : (
            <Gift className="w-20 h-20 text-primary animate-bounce" />
          )}
          <h2 className={cn(
            "text-3xl font-bold",
            isSpecial ? "text-platinum-dark" : isGolden ? "text-accent-foreground" : "text-foreground"
          )}>
            축하합니다! 🎉
          </h2>
          <p className={cn(
            "text-2xl font-semibold",
            isSpecial ? "text-platinum-dark" : isGolden ? "text-accent-foreground" : "text-primary"
          )}>
            {gift}
          </p>
          <p className={cn(
            "text-center",
            isSpecial ? "text-platinum-dark/70" : isGolden ? "text-accent-foreground/70" : "text-muted-foreground"
          )}>
            선물을 받으셨습니다!
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GiftReveal;
