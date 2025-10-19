import { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import ChristmasBox from "@/components/ChristmasBox";
import QuizDialog from "@/components/QuizDialog";
import GiftReveal from "@/components/GiftReveal";
import GoldenBoxReveal from "@/components/GoldenBoxReveal";
import Scoreboard from "@/components/Scoreboard";
import { Box, BoxState } from "@/types/box";
import boxesData from "@/data/boxes.json";
import { Snowflake } from "lucide-react";

const Index = () => {
  const [boxes, setBoxes] = useState<Box[]>([]);
  const [boxStates, setBoxStates] = useState<BoxState[]>([]);
  const [selectedBox, setSelectedBox] = useState<Box | null>(null);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [revealedGift, setRevealedGift] = useState<string | null>(null);
  const [isGiftOpen, setIsGiftOpen] = useState(false);
  const [isGoldenReveal, setIsGoldenReveal] = useState(false);

  // Initialize and shuffle boxes on mount
  useEffect(() => {
    const shuffled = [...boxesData].sort(() => Math.random() - 0.5);
    setBoxes(shuffled);
    setBoxStates(shuffled.map(box => ({ id: box.id, isOpened: false })));
  }, []);

  const handleBoxClick = (box: Box) => {
    const state = boxStates.find(s => s.id === box.id);
    if (state?.isOpened) return;
    
    setSelectedBox(box);
    setIsQuizOpen(true);
  };

  const handleCorrectAnswer = (gift: string) => {
    if (!selectedBox) return;
    
    const isGolden = selectedBox.isGolden;
    
    // Update box state
    setBoxStates(prev => 
      prev.map(state => 
        state.id === selectedBox.id 
          ? { ...state, isOpened: true } 
          : state
      )
    );
    
    // Close quiz dialog
    setIsQuizOpen(false);
    
    // Trigger confetti
    const duration = isGolden ? 5000 : 3000;
    const end = Date.now() + duration;

    const colors = isGolden ? ['#EAB308', '#FCD34D', '#FBBF24'] : ['#DC2626', '#16A34A', '#EAB308'];
    
    (function frame() {
      confetti({
        particleCount: isGolden ? 5 : 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      });
      confetti({
        particleCount: isGolden ? 5 : 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
    
    // Show golden box reveal first if it's golden
    if (isGolden) {
      setTimeout(() => {
        setIsGoldenReveal(true);
      }, 500);
      
      setTimeout(() => {
        setIsGoldenReveal(false);
        setRevealedGift(gift);
        setIsGiftOpen(true);
      }, 3000);
    } else {
      // Show gift reveal directly for regular boxes
      setTimeout(() => {
        setRevealedGift(gift);
        setIsGiftOpen(true);
      }, 500);
    }
  };

  const totalGoldenBoxes = boxes.filter(box => box.isGolden).length;
  const openedGoldenGifts = boxes
    .filter(box => {
      const state = boxStates.find(s => s.id === box.id);
      return box.isGolden && state?.isOpened;
    })
    .map(box => box.gift);

  return (
    <div className="min-h-screen w-full flex flex-col bg-gradient-to-br from-background via-secondary to-background relative overflow-hidden">
      {/* Snowflake decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <Snowflake className="absolute top-[10%] left-[15%] w-8 h-8 text-christmas-snow/30 animate-float" />
        <Snowflake className="absolute top-[20%] right-[20%] w-6 h-6 text-christmas-snow/20 animate-float" style={{ animationDelay: "1s" }} />
        <Snowflake className="absolute top-[60%] left-[10%] w-10 h-10 text-christmas-snow/25 animate-float" style={{ animationDelay: "2s" }} />
        <Snowflake className="absolute top-[70%] right-[15%] w-7 h-7 text-christmas-snow/30 animate-float" style={{ animationDelay: "1.5s" }} />
      </div>

      {/* Header */}
      <header className="py-6 px-8 text-center relative z-10">
        <h1 className="text-5xl font-bold text-foreground mb-2 drop-shadow-lg">
          🎄 크리스마스 어드벤트 캘린더 🎄
        </h1>
        <p className="text-xl text-foreground/80">
          상자를 열고 퀴즈를 풀어 선물을 받으세요!
        </p>
      </header>

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center px-8 pb-4 relative z-10">
        <div className="w-full max-w-6xl">
          <div className="grid grid-cols-5 gap-4">
            {boxes.map((box, index) => {
              const state = boxStates.find(s => s.id === box.id);
              return (
                <ChristmasBox
                  key={box.id}
                  number={index + 1}
                  position={index + 1}
                  isOpened={state?.isOpened || false}
                  onClick={() => handleBoxClick(box)}
                />
              );
            })}
          </div>
        </div>
      </main>

      {/* Scoreboard */}
      <Scoreboard 
        openedGoldenGifts={openedGoldenGifts}
        totalGoldenBoxes={totalGoldenBoxes}
      />

      {/* Dialogs */}
      <QuizDialog
        box={selectedBox}
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        onCorrect={handleCorrectAnswer}
      />

      <GoldenBoxReveal
        isOpen={isGoldenReveal}
        onClose={() => setIsGoldenReveal(false)}
      />

      <GiftReveal
        gift={revealedGift}
        isOpen={isGiftOpen}
        onClose={() => {
          setIsGiftOpen(false);
          setRevealedGift(null);
          setSelectedBox(null);
        }}
      />
    </div>
  );
};

export default Index;
