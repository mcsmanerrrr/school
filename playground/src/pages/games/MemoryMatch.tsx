import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, RotateCcw, Trophy } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const emojis = ["🎮", "🎨", "🚀", "🌟", "🎭", "🎪", "🎯", "🎲"];

interface CardType {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const MemoryMatch = () => {
  const [cards, setCards] = useState<CardType[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const { toast } = useToast();

  const initializeGame = () => {
    const gameEmojis = [...emojis, ...emojis];
    const shuffled = gameEmojis
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({
        id: index,
        emoji,
        isFlipped: false,
        isMatched: false,
      }));
    setCards(shuffled);
    setFlippedCards([]);
    setMoves(0);
    setMatches(0);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [first, second] = flippedCards;
      const firstCard = cards[first];
      const secondCard = cards[second];

      if (firstCard.emoji === secondCard.emoji) {
        setTimeout(() => {
          setCards((prev) =>
            prev.map((card) =>
              card.id === first || card.id === second
                ? { ...card, isMatched: true }
                : card
            )
          );
          setMatches((prev) => prev + 1);
          setFlippedCards([]);
          
          if (matches + 1 === emojis.length) {
            toast({
              title: "🎉 Congratulations!",
              description: `You won in ${moves + 1} moves!`,
            });
          }
        }, 500);
      } else {
        setTimeout(() => {
          setCards((prev) =>
            prev.map((card) =>
              card.id === first || card.id === second
                ? { ...card, isFlipped: false }
                : card
            )
          );
          setFlippedCards([]);
        }, 1000);
      }
    }
  }, [flippedCards, cards, matches, moves, toast]);

  const handleCardClick = (id: number) => {
    if (flippedCards.length === 2 || flippedCards.includes(id)) return;
    
    const card = cards[id];
    if (card.isMatched) return;

    setCards((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isFlipped: true } : c))
    );
    
    const newFlipped = [...flippedCards, id];
    setFlippedCards(newFlipped);
    
    if (newFlipped.length === 2) {
      setMoves((prev) => prev + 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/10 to-primary/10 p-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link to="/">
            <Button variant="ghost">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
            Memory Match
          </h1>
          <Button variant="outline" onClick={initializeGame}>
            <RotateCcw className="w-4 h-4 mr-2" />
            Restart
          </Button>
        </div>

        {/* Stats */}
        <div className="flex gap-4 justify-center mb-8">
          <Card className="p-4 flex items-center gap-2">
            <span className="text-2xl font-bold text-primary">{moves}</span>
            <span className="text-sm text-muted-foreground">Moves</span>
          </Card>
          <Card className="p-4 flex items-center gap-2">
            <Trophy className="w-6 h-6 text-tertiary" />
            <span className="text-2xl font-bold text-primary">{matches}</span>
            <span className="text-sm text-muted-foreground">/ {emojis.length}</span>
          </Card>
        </div>

        {/* Game Grid */}
        <div className="grid grid-cols-4 gap-4">
          <AnimatePresence>
            {cards.map((card) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: card.id * 0.05 }}
              >
                <Card
                  className={`aspect-square flex items-center justify-center text-6xl cursor-pointer transition-all duration-300 ${
                    card.isMatched
                      ? "bg-gradient-to-br from-secondary to-secondary/50 border-secondary"
                      : card.isFlipped
                      ? "bg-gradient-to-br from-primary to-primary/50 border-primary"
                      : "bg-card hover:shadow-lg hover:scale-105"
                  }`}
                  onClick={() => handleCardClick(card.id)}
                >
                  <motion.div
                    initial={false}
                    animate={{
                      rotateY: card.isFlipped || card.isMatched ? 0 : 180,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {card.isFlipped || card.isMatched ? (
                      <span>{card.emoji}</span>
                    ) : (
                      <span className="text-4xl text-muted-foreground">?</span>
                    )}
                  </motion.div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default MemoryMatch;
