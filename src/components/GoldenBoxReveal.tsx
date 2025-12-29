import { useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Sparkles, Trophy } from "lucide-react";
import confetti from "canvas-confetti";

interface GoldenBoxRevealProps {
  isOpen: boolean;
  onClose: () => void;
}

const GoldenBoxReveal = ({ isOpen, onClose }: GoldenBoxRevealProps) => {
  useEffect(() => {
    if (!isOpen) return;

    const duration = 2500;
    const animationEnd = Date.now() + duration;
    const defaults = { 
      startVelocity: 30, 
      spread: 360, 
      ticks: 60, 
      zIndex: 0,
      colors: ['#EAB308', '#FCD34D', '#FBBF24', '#F59E0B']
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
      <DialogContent className="sm:max-w-lg bg-gradient-to-br from-box-gold via-horse-gold-light to-box-gold border-4 border-horse-gold-light shadow-2xl shadow-accent/50">
        <div className="flex flex-col items-center justify-center space-y-6 py-8">
          <div>
            <Trophy className="w-24 h-24 text-accent-foreground animate-bounce" />
          </div>
          <h2 className="text-4xl font-bold text-accent-foreground animate-bounce drop-shadow-lg text-center">
            🎉 골드박스를 발견했습니다! 🎉
          </h2>
          <p className="text-xl font-semibold text-accent-foreground text-center">
            더 어려운 문제와 더 큰 선물이 기다리고 있습니다!
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GoldenBoxReveal;
