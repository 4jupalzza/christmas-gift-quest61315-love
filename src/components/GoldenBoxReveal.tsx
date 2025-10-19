import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Sparkles, Trophy } from "lucide-react";

interface GoldenBoxRevealProps {
  isOpen: boolean;
  onClose: () => void;
}

const GoldenBoxReveal = ({ isOpen, onClose }: GoldenBoxRevealProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-gradient-to-br from-accent via-christmas-gold-light to-accent border-accent animate-pulse">
        <div className="flex flex-col items-center justify-center space-y-6 py-8">
          <div className="relative">
            <Trophy className="w-24 h-24 text-accent-foreground animate-bounce" />
            <Sparkles className="absolute -top-2 -right-2 w-8 h-8 text-accent-foreground animate-spin" />
            <Sparkles className="absolute -bottom-2 -left-2 w-8 h-8 text-accent-foreground animate-spin" style={{ animationDelay: "0.5s" }} />
          </div>
          <h2 className="text-4xl font-bold text-accent-foreground animate-bounce">
            🎉 골드 박스 발견! 🎉
          </h2>
          <p className="text-xl font-semibold text-accent-foreground text-center">
            축하합니다!<br />
            특별한 선물을 받으셨습니다!
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GoldenBoxReveal;
