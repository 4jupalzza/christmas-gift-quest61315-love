import { useState, useRef } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Box } from "@/types/box";
import { Gift, Sparkles, Play, Square, Music } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuizDialogProps {
  box: Box | null;
  isOpen: boolean;
  onClose: () => void;
  onCorrect: (gift: string) => void;
}

const QuizDialog = ({ box, isOpen, onClose, onCorrect }: QuizDialogProps) => {
  const [answer, setAnswer] = useState("");
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [error, setError] = useState(false);
  const [playingBgm, setPlayingBgm] = useState<1 | 2 | null>(null);
  
  const bgm1Ref = useRef<HTMLAudioElement | null>(null);
  const bgm2Ref = useRef<HTMLAudioElement | null>(null);

  const stopAllBgm = () => {
    if (bgm1Ref.current) {
      bgm1Ref.current.pause();
      bgm1Ref.current.currentTime = 0;
    }
    if (bgm2Ref.current) {
      bgm2Ref.current.pause();
      bgm2Ref.current.currentTime = 0;
    }
    setPlayingBgm(null);
  };

  const toggleBgm = (bgmNumber: 1 | 2) => {
    const audioRef = bgmNumber === 1 ? bgm1Ref : bgm2Ref;
    const otherRef = bgmNumber === 1 ? bgm2Ref : bgm1Ref;
    
    // Stop the other BGM
    if (otherRef.current) {
      otherRef.current.pause();
      otherRef.current.currentTime = 0;
    }
    
    if (playingBgm === bgmNumber) {
      // Stop current BGM
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      setPlayingBgm(null);
    } else {
      // Play this BGM
      if (audioRef.current) {
        audioRef.current.play();
      }
      setPlayingBgm(bgmNumber);
    }
  };

  const handleSubmit = () => {
    if (!box) return;
    
    if (box.type === "객관식") {
      // For multiple choice, compare with 1-based index
      const correctIndex = parseInt(box.answer);
      if (selectedOption === correctIndex) {
        onCorrect(box.gift);
        setSelectedOption(null);
        setError(false);
      } else {
        setError(true);
        setTimeout(() => setError(false), 2000);
      }
    } else {
      // For subjective questions, remove spaces and convert to lowercase
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
    }
  };

  const handleClose = () => {
    stopAllBgm();
    setAnswer("");
    setSelectedOption(null);
    setError(false);
    onClose();
  };

  const isGolden = box?.isGolden || false;
  const hasBgm1 = box?.id === 29;
  const hasBgm2 = box?.id === 30;
  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className={cn(
        "sm:max-w-md border-4",
        isGolden 
          ? "bg-gradient-to-br from-box-gold via-christmas-gold-light to-box-gold border-christmas-gold-light shadow-2xl shadow-accent/50" 
          : "bg-card border-border"
      )}>
        <DialogHeader>
          <DialogTitle className={cn(
            "flex items-center gap-2 text-2xl",
            isGolden ? "text-accent-foreground" : "text-foreground"
          )}>
            {isGolden && <Sparkles className="w-6 h-6 animate-pulse" />}
            <Gift className="w-6 h-6" />
            {isGolden ? "⭐ 골드 박스 ⭐" : "신년 퀴즈"}
            {isGolden && <Sparkles className="w-6 h-6 animate-pulse" />}
          </DialogTitle>
          <DialogDescription className={cn(
            "text-base",
            isGolden ? "text-accent-foreground/90 font-medium" : "text-card-foreground/80"
          )}>
            정답을 맞춰서 선물을 받으세요!
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className={cn(
            "p-4 rounded-lg",
            isGolden 
              ? "bg-accent-foreground/10 border-2 border-accent-foreground/30" 
              : "bg-secondary"
          )}>
            <p className={cn(
              "text-lg font-medium",
              isGolden ? "text-accent-foreground" : "text-secondary-foreground"
            )}>
              {box?.question}
            </p>
          </div>
          
          {/* BGM Controls - only for BGM quiz boxes */}
          {hasBgm1 && (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={() => toggleBgm(1)}
                className={cn(
                  "w-full gap-2",
                  playingBgm === 1 
                    ? "bg-horse-gold/20 border-horse-gold text-horse-gold" 
                    : "border-border text-foreground hover:bg-secondary"
                )}
              >
                {playingBgm === 1 ? <Square className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                <Music className="w-4 h-4" />
                {playingBgm === 1 ? "BGM 1 정지" : "BGM 1 재생"}
              </Button>
              <audio ref={bgm1Ref} src="/audio/bgm1.mp3" />
            </>
          )}
          
          {hasBgm2 && (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={() => toggleBgm(2)}
                className={cn(
                  "w-full gap-2",
                  playingBgm === 2 
                    ? "bg-horse-gold/20 border-horse-gold text-horse-gold" 
                    : "border-border text-foreground hover:bg-secondary"
                )}
              >
                {playingBgm === 2 ? <Square className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                <Music className="w-4 h-4" />
                {playingBgm === 2 ? "BGM 2 정지" : "BGM 2 재생"}
              </Button>
              <audio ref={bgm2Ref} src="/audio/bgm2.mp3" />
            </>
          )}
          
          {box?.type === "객관식" ? (
            <div className="space-y-2">
              {box.options.map((option, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left h-auto py-3 px-4",
                    selectedOption === index + 1 
                      ? isGolden 
                        ? "bg-horse-bronze border-horse-gold text-horse-cream" 
                        : "bg-primary/20 border-primary text-foreground"
                      : isGolden
                        ? "border-horse-gold/50 text-horse-cream bg-horse-bronze/30 hover:bg-horse-bronze/50"
                        : "border-border text-foreground hover:bg-secondary",
                    error && selectedOption === index + 1 && "border-destructive bg-destructive/20"
                  )}
                  onClick={() => setSelectedOption(index + 1)}
                >
                  <span className="font-bold mr-2">{index + 1}.</span>
                  {option}
                </Button>
              ))}
            </div>
          ) : (
            <Input
              placeholder="답을 입력하세요..."
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              className={cn(
                error && "border-destructive",
                isGolden && "border-accent-foreground/30 bg-accent-foreground/5"
              )}
              autoFocus
            />
          )}
          
          {error && (
            <p className="text-sm text-destructive font-semibold">
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
            className={cn(
              isGolden 
                ? "bg-accent-foreground text-accent hover:bg-accent-foreground/90" 
                : "bg-primary hover:bg-primary/90"
            )}
          >
            확인
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default QuizDialog;
