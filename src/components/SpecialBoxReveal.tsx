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
    <Dialog open={isOpen}>
      <DialogContent 
        className="sm:max-w-xl bg-gradient-to-br from-platinum via-platinum-light to-platinum border-4 border-platinum-light shadow-2xl shadow-platinum/50 [&>button]:hidden"
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <div className="flex flex-col items-center justify-center space-y-6 py-8">
          <div>
            <Diamond className="w-24 h-24 text-platinum-dark animate-bounce" />
          </div>
          <h2 className="text-4xl font-bold text-platinum-dark animate-bounce drop-shadow-lg text-center">
            💎 스페셜 박스를 발견했습니다! 💎
          </h2>
          <p className="text-xl font-semibold text-platinum-dark text-center">
            특별한 선물이 기다리고 있습니다!<br />
            모두 집중해주세요!
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SpecialBoxReveal;
