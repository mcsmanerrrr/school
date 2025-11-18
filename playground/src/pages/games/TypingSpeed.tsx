import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const sentences = [
  "The quick brown fox jumps over the lazy dog.",
  "Learning to type fast improves your productivity.",
  "Practice makes perfect in everything you do.",
  "Technology shapes the future of education.",
  "Never stop learning and growing every day.",
];

const TypingSpeed = () => {
  const [currentText, setCurrentText] = useState("");
  const [inputText, setInputText] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [correctChars, setCorrectChars] = useState(0);
  const [totalChars, setTotalChars] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const startGame = () => {
    setIsPlaying(true);
    setTimeLeft(30);
    setCurrentText(sentences[Math.floor(Math.random() * sentences.length)]);
    setInputText("");
    setCorrectChars(0);
    setTotalChars(0);
    setWpm(0);
    setAccuracy(100);
    inputRef.current?.focus();
  };

  useEffect(() => {
    if (isPlaying && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setIsPlaying(false);
    }
  }, [isPlaying, timeLeft]);

  const handleInput = (value: string) => {
    if (!isPlaying) return;
    
    setInputText(value);
    setTotalChars(value.length);

    let correct = 0;
    for (let i = 0; i < value.length; i++) {
      if (value[i] === currentText[i]) {
        correct++;
      }
    }
    setCorrectChars(correct);
    
    const acc = value.length > 0 ? (correct / value.length) * 100 : 100;
    setAccuracy(Math.round(acc));

    const wordsTyped = value.trim().split(" ").length;
    const timeElapsed = (30 - timeLeft) / 60;
    const calculatedWpm = timeElapsed > 0 ? Math.round(wordsTyped / timeElapsed) : 0;
    setWpm(calculatedWpm);

    if (value === currentText) {
      setCurrentText(sentences[Math.floor(Math.random() * sentences.length)]);
      setInputText("");
    }
  };

  const getCharColor = (index: number) => {
    if (index >= inputText.length) return "text-muted-foreground";
    return inputText[index] === currentText[index] ? "text-secondary" : "text-destructive";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/10 to-primary/10 p-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link to="/">
            <Button variant="ghost">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
            Typing Speed Test
          </h1>
          <div className="w-20" />
        </div>

        {/* Stats */}
        <div className="flex gap-4 justify-center mb-8">
          <Card className="p-4 flex-1 text-center">
            <div className="text-3xl font-bold text-primary">{wpm}</div>
            <div className="text-sm text-muted-foreground">WPM</div>
          </Card>
          <Card className="p-4 flex-1 text-center">
            <div className="text-3xl font-bold text-secondary">{accuracy}%</div>
            <div className="text-sm text-muted-foreground">Accuracy</div>
          </Card>
          <Card className="p-4 flex-1 text-center">
            <div className="text-3xl font-bold text-accent">{timeLeft}s</div>
            <div className="text-sm text-muted-foreground">Time Left</div>
          </Card>
        </div>

        {/* Game Area */}
        {!isPlaying && timeLeft === 30 ? (
          <Card className="p-12 text-center">
            <Zap className="w-16 h-16 mx-auto mb-4 text-accent" />
            <h2 className="text-4xl font-bold mb-4">Test Your Typing Speed!</h2>
            <p className="text-muted-foreground mb-8">
              Type the sentences as fast and accurately as you can in 30 seconds.
            </p>
            <Button size="lg" onClick={startGame} className="text-lg px-8">
              Start Test
            </Button>
          </Card>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Card className="p-8">
              <div className="mb-6">
                <p className="text-2xl leading-relaxed font-mono">
                  {currentText.split("").map((char, index) => (
                    <span key={index} className={getCharColor(index)}>
                      {char}
                    </span>
                  ))}
                </p>
              </div>
              
              <input
                ref={inputRef}
                type="text"
                value={inputText}
                onChange={(e) => handleInput(e.target.value)}
                disabled={!isPlaying}
                className="w-full p-4 text-xl border-2 rounded-lg focus:outline-none focus:border-primary bg-background"
                placeholder={isPlaying ? "Start typing..." : "Click 'Start Test' to begin"}
              />

              {!isPlaying && timeLeft === 0 && (
                <div className="mt-6 text-center">
                  <h3 className="text-2xl font-bold mb-2">Test Complete!</h3>
                  <p className="text-muted-foreground mb-4">
                    You typed at {wpm} WPM with {accuracy}% accuracy!
                  </p>
                  <Button onClick={startGame}>Try Again</Button>
                </div>
              )}
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default TypingSpeed;
