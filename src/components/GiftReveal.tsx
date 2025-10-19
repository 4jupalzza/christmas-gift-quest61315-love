import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Gift } from "lucide-react";

interface GiftRevealProps {
  gift: string | null;
  isOpen: boolean;
  onClose: () => void;
}

const GiftReveal = ({ gift, isOpen, onClose }: GiftRevealProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-gradient-to-br from-accent/20 to-primary/20 border-accent">
        <div className="flex flex-col items-center justify-center space-y-6 py-8">
          <Gift className="w-20 h-20 text-accent animate-bounce" />
          <h2 className="text-3xl font-bold text-foreground">
            축하합니다! 🎉
          </h2>
          <p className="text-2xl font-semibold text-accent">
            {gift}
          </p>
          <p className="text-muted-foreground text-center">
            선물을 받으셨습니다!
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GiftReveal;
