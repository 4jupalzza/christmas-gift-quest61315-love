import { useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Sparkles, Diamond } from "lucide-react";
import confetti from "canvas-confetti";

interface SpecialBoxRevealProps {
  isOpen: boolean;
  onClose: () => void;
}

const SpecialBoxReveal = ({ isOpen, onClose }: SpecialBoxRevealProps) => {
  useEffect(() => {
    if (!isOpen) return;

    const duration = 2500;
    const animationEnd = Date.now() + duration;
    const defaults = { 
      startVelocity: 30, 
      spread: 360, 
      ticks: 60, 
      zIndex: 0,
      colors: ['#C0C0C0', '#E5E4E2', '#A0A0A0', '#D4D4D4', '#B8B8B8']
    };

    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        clearInterval(interval);
        return;
      }

      const particleCount = 50 * (timeLeft / duration);

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);

    return () => clearInterval(interval);
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-gradient-to-br from-platinum via-platinum-light to-platinum border-4 border-platinum-light shadow-2xl shadow-platinum/50">
        <div className="flex flex-col items-center justify-center space-y-6 py-8">
          <div className="relative">
            <Diamond className="w-24 h-24 text-platinum-dark animate-bounce" />
            <Sparkles className="absolute -top-2 -right-2 w-8 h-8 text-platinum-dark animate-spin" />
            <Sparkles className="absolute -bottom-2 -left-2 w-8 h-8 text-platinum-dark animate-spin" style={{ animationDelay: "0.5s" }} />
            <Sparkles className="absolute top-1/2 -right-4 w-6 h-6 text-platinum-dark animate-pulse" style={{ animationDelay: "0.25s" }} />
            <Sparkles className="absolute top-1/2 -left-4 w-6 h-6 text-platinum-dark animate-pulse" style={{ animationDelay: "0.75s" }} />
          </div>
          <h2 className="text-4xl font-bold text-platinum-dark animate-bounce drop-shadow-lg">
            💎 스페셜 박스 발견! 💎
          </h2>
          <p className="text-xl font-semibold text-platinum-dark text-center">
            와!! 축하합니다!!<br />
            비밀의 스페셜 선물을 받으셨습니다!
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SpecialBoxReveal;
