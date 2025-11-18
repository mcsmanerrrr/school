import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const colors = ["#E27B58", "#4A90E2", "#4FD0E7", "#FAD5A5", "#C88B3A"];

const PatternPuzzle = () => {
  const [pattern, setPattern] = useState<number[]>([]);
  const [userPattern, setUserPattern] = useState<number[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [showPattern, setShowPattern] = useState(false);
  const { toast } = useToast();

  const generatePattern = (length: number) => {
    const newPattern: number[] = [];
    for (let i = 0; i < length; i++) {
      newPattern.push(Math.floor(Math.random() * colors.length));
    }
    return newPattern;
  };

  const startGame = () => {
    setIsPlaying(true);
    setLevel(1);
    setScore(0);
    startLevel(1);
  };

  const startLevel = (lvl: number) => {
    const newPattern = generatePattern(lvl + 2);
    setPattern(newPattern);
    setUserPattern([]);
    setShowPattern(true);

    setTimeout(() => {
      setShowPattern(false);
    }, (lvl + 2) * 1000);
  };

  const handleColorClick = (colorIndex: number) => {
    if (showPattern || !isPlaying) return;

    const newUserPattern = [...userPattern, colorIndex];
    setUserPattern(newUserPattern);

    if (newUserPattern.length === pattern.length) {
      checkPattern(newUserPattern);
    }
  };

  const checkPattern = (userPat: number[]) => {
    const isCorrect = userPat.every((color, index) => color === pattern[index]);

    if (isCorrect) {
      const points = level * 10;
      setScore((prev) => prev + points);
      toast({
        title: "✨ Perfect!",
        description: `+${points} points! Level ${level + 1}`,
      });
      setLevel((prev) => prev + 1);
      setTimeout(() => startLevel(level + 1), 1000);
    } else {
      setIsPlaying(false);
      toast({
        title: "💔 Game Over!",
        description: `Final Score: ${score} points. You reached level ${level}!`,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/10 to-secondary/10 p-4">
      <div className="container mx-auto max-w-3xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link to="/">
            <Button variant="ghost">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Pattern Puzzle
          </h1>
          <div className="w-20" />
        </div>

        {/* Stats */}
        <div className="flex gap-4 justify-center mb-8">
          <Card className="p-4 flex items-center gap-2">
            <Star className="w-6 h-6 text-primary" />
            <div>
              <div className="text-2xl font-bold text-primary">{score}</div>
              <div className="text-xs text-muted-foreground">Score</div>
            </div>
          </Card>
          <Card className="p-4 flex items-center gap-2">
            <div>
              <div className="text-2xl font-bold text-secondary">Level {level}</div>
              <div className="text-xs text-muted-foreground">Current Level</div>
            </div>
          </Card>
        </div>

        {/* Game Area */}
        {!isPlaying ? (
          <Card className="p-12 text-center">
            <h2 className="text-4xl font-bold mb-4">Remember the Pattern!</h2>
            <p className="text-muted-foreground mb-8">
              Watch the pattern carefully, then repeat it by clicking the colors in the same order.
              Each level adds more colors to remember!
            </p>
            <Button size="lg" onClick={startGame} className="text-lg px-8">
              Start Game
            </Button>
          </Card>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Card className="p-8">
              {showPattern && (
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-primary mb-2">Watch carefully! 👀</h3>
                  <p className="text-muted-foreground">Memorize this pattern...</p>
                </div>
              )}

              {!showPattern && (
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-secondary mb-2">Your turn! ✨</h3>
                  <p className="text-muted-foreground">
                    Click the colors: {userPattern.length} / {pattern.length}
                  </p>
                </div>
              )}

              <div className="grid grid-cols-5 gap-4 mb-6">
                {colors.map((color, index) => (
                  <motion.button
                    key={index}
                    className="aspect-square rounded-lg shadow-lg transition-all"
                    style={{ backgroundColor: color }}
                    onClick={() => handleColorClick(index)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    animate={
                      showPattern && pattern.includes(index)
                        ? { scale: [1, 1.1, 1], opacity: [1, 0.7, 1] }
                        : {}
                    }
                    transition={{
                      duration: 0.5,
                      delay: showPattern ? pattern.indexOf(index) * 0.6 : 0,
                    }}
                  />
                ))}
              </div>

              {/* User Pattern Display */}
              {!showPattern && (
                <div className="flex gap-2 justify-center">
                  {userPattern.map((colorIndex, index) => (
                    <motion.div
                      key={index}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-12 h-12 rounded-lg shadow-md"
                      style={{ backgroundColor: colors[colorIndex] }}
                    />
                  ))}
                </div>
              )}
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default PatternPuzzle;
