import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const SimonSays = () => {
  const [sequence, setSequence] = useState<number[]>([]);
  const [userSequence, setUserSequence] = useState<number[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [active, setActive] = useState<number | null>(null);
  const [score, setScore] = useState(0);

  const colors = ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500'];

  const startGame = () => {
    const newSeq = [Math.floor(Math.random() * 4)];
    setSequence(newSeq);
    setUserSequence([]);
    setScore(0);
    playSequence(newSeq);
  };

  const playSequence = async (seq: number[]) => {
    setIsPlaying(true);
    for (const color of seq) {
      await new Promise(resolve => setTimeout(resolve, 500));
      setActive(color);
      await new Promise(resolve => setTimeout(resolve, 500));
      setActive(null);
    }
    setIsPlaying(false);
  };

  const handleClick = (color: number) => {
    if (isPlaying) return;
    
    const newUserSeq = [...userSequence, color];
    setUserSequence(newUserSeq);

    if (newUserSeq[newUserSeq.length - 1] !== sequence[newUserSeq.length - 1]) {
      alert('Wrong! Game Over');
      return;
    }

    if (newUserSeq.length === sequence.length) {
      const newSeq = [...sequence, Math.floor(Math.random() * 4)];
      setScore(score + 1);
      setSequence(newSeq);
      setUserSequence([]);
      setTimeout(() => playSequence(newSeq), 1000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/10 p-4">
      <div className="container mx-auto max-w-2xl">
        <div className="flex items-center justify-between mb-6">
          <Link to="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Simon Says</h1>
        </div>

        <div className="bg-card p-8 rounded-lg border text-center">
          <p className="text-2xl font-bold mb-6">Score: {score}</p>
          
          {sequence.length === 0 ? (
            <Button onClick={startGame} size="lg">Start Game</Button>
          ) : (
            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
              {colors.map((color, index) => (
                <button
                  key={index}
                  onClick={() => handleClick(index)}
                  disabled={isPlaying}
                  className={`aspect-square rounded-lg border-4 border-border transition-all ${color} ${
                    active === index ? 'brightness-150 scale-95' : 'brightness-75'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SimonSays;
