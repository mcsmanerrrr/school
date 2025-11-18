import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Trophy, Timer } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const operations = ["+", "-", "×", "÷"] as const;

const MathChallenge = () => {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [operation, setOperation] = useState<typeof operations[number]>("+");
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isPlaying, setIsPlaying] = useState(false);
  const [streak, setStreak] = useState(0);
  const { toast } = useToast();

  const generateQuestion = () => {
    const op = operations[Math.floor(Math.random() * operations.length)];
    let n1, n2;

    switch (op) {
      case "+":
      case "-":
        n1 = Math.floor(Math.random() * 50) + 1;
        n2 = Math.floor(Math.random() * 50) + 1;
        break;
      case "×":
        n1 = Math.floor(Math.random() * 12) + 1;
        n2 = Math.floor(Math.random() * 12) + 1;
        break;
      case "÷":
        n2 = Math.floor(Math.random() * 10) + 1;
        n1 = n2 * (Math.floor(Math.random() * 10) + 1);
        break;
    }

    setNum1(n1);
    setNum2(n2);
    setOperation(op);
    setAnswer("");
  };

  const calculateCorrectAnswer = () => {
    switch (operation) {
      case "+":
        return num1 + num2;
      case "-":
        return num1 - num2;
      case "×":
        return num1 * num2;
      case "÷":
        return num1 / num2;
    }
  };

  const checkAnswer = () => {
    const userAnswer = parseFloat(answer);
    const correctAnswer = calculateCorrectAnswer();

    if (userAnswer === correctAnswer) {
      setScore((prev) => prev + (10 + streak * 5));
      setStreak((prev) => prev + 1);
      toast({
        title: "✅ Correct!",
        description: `+${10 + streak * 5} points! Streak: ${streak + 1}`,
      });
      generateQuestion();
    } else {
      setStreak(0);
      toast({
        title: "❌ Wrong!",
        description: `The answer was ${correctAnswer}. Streak reset!`,
        variant: "destructive",
      });
      generateQuestion();
    }
  };

  const startGame = () => {
    setIsPlaying(true);
    setScore(0);
    setStreak(0);
    setTimeLeft(60);
    generateQuestion();
  };

  useEffect(() => {
    if (isPlaying && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setIsPlaying(false);
      toast({
        title: "⏰ Time's Up!",
        description: `Final Score: ${score} points!`,
      });
    }
  }, [isPlaying, timeLeft, score, toast]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-tertiary/10 to-secondary/10 p-4">
      <div className="container mx-auto max-w-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link to="/">
            <Button variant="ghost">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-tertiary to-secondary bg-clip-text text-transparent">
            Math Challenge
          </h1>
          <div className="w-20" />
        </div>

        {/* Stats */}
        <div className="flex gap-4 justify-center mb-8">
          <Card className="p-4 flex items-center gap-2">
            <Trophy className="w-6 h-6 text-tertiary" />
            <div>
              <div className="text-2xl font-bold text-primary">{score}</div>
              <div className="text-xs text-muted-foreground">Score</div>
            </div>
          </Card>
          <Card className="p-4 flex items-center gap-2">
            <Timer className="w-6 h-6 text-primary" />
            <div>
              <div className="text-2xl font-bold text-primary">{timeLeft}s</div>
              <div className="text-xs text-muted-foreground">Time Left</div>
            </div>
          </Card>
          <Card className="p-4 flex items-center gap-2">
            <div>
              <div className="text-2xl font-bold text-secondary">🔥 {streak}</div>
              <div className="text-xs text-muted-foreground">Streak</div>
            </div>
          </Card>
        </div>

        {/* Game Area */}
        {!isPlaying ? (
          <Card className="p-12 text-center">
            <h2 className="text-4xl font-bold mb-4">Ready to Challenge Your Math Skills?</h2>
            <p className="text-muted-foreground mb-8">
              Solve as many math problems as you can in 60 seconds!
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
            <Card className="p-12">
              <div className="text-center mb-8">
                <motion.div
                  key={`${num1}-${operation}-${num2}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-6xl font-bold mb-8 text-foreground"
                >
                  {num1} {operation} {num2} = ?
                </motion.div>
              </div>

              <div className="flex gap-4 items-center justify-center">
                <Input
                  type="number"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && checkAnswer()}
                  placeholder="Your answer"
                  className="text-2xl text-center max-w-xs h-16"
                  autoFocus
                />
                <Button size="lg" onClick={checkAnswer} className="h-16 px-8">
                  Submit
                </Button>
              </div>

              {streak > 2 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center mt-6 text-secondary font-bold"
                >
                  🔥 {streak}x Streak! Keep going!
                </motion.div>
              )}
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default MathChallenge;
