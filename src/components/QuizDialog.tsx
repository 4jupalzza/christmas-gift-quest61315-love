import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Box } from "@/types/box";
import { Gift } from "lucide-react";

interface QuizDialogProps {
  box: Box | null;
  isOpen: boolean;
  onClose: () => void;
  onCorrect: (gift: string) => void;
}

const QuizDialog = ({ box, isOpen, onClose, onCorrect }: QuizDialogProps) => {
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = () => {
    if (!box) return;
    
    // Remove spaces and convert to lowercase for comparison
    const normalizedAnswer = answer.trim().toLowerCase().replace(/\s+/g, "");
    const normalizedCorrect = box.answer.toLowerCase().replace(/\s+/g, "");
    
    if (normalizedAnswer === normalizedCorrect) {
      onCorrect(box.gift);
      setAnswer("");
      setError(false);
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  const handleClose = () => {
    setAnswer("");
    setError(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md bg-card border-border">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl text-foreground">
            <Gift className="w-6 h-6 text-accent" />
            {box?.isGolden ? "⭐ 골드 박스 ⭐" : "크리스마스 퀴즈"}
          </DialogTitle>
          <DialogDescription className="text-base text-card-foreground/80">
            정답을 맞춰서 선물을 받으세요!
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="p-4 bg-secondary rounded-lg">
            <p className="text-lg font-medium text-secondary-foreground">
              {box?.question}
            </p>
          </div>
          
          <Input
            placeholder="답을 입력하세요..."
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            className={error ? "border-destructive" : ""}
            autoFocus
          />
          
          {error && (
            <p className="text-sm text-destructive">
              틀렸습니다! 다시 시도해보세요.
            </p>
          )}
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            취소
          </Button>
          <Button 
            onClick={handleSubmit}
            className="bg-primary hover:bg-primary/90"
          >
            확인
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default QuizDialog;
