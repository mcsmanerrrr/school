import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const CodeBreaker = () => {
  const [code, setCode] = useState<number[]>([]);
  const [guess, setGuess] = useState<number[]>([0, 0, 0, 0]);
  const [attempts, setAttempts] = useState<{guess: number[], correct: number, position: number}[]>([]);
  const [won, setWon] = useState(false);

  useEffect(() => {
    const newCode = Array(4).fill(0).map(() => Math.floor(Math.random() * 6));
    setCode(newCode);
  }, []);

  const submitGuess = () => {
    let correct = 0;
    let position = 0;
    
    guess.forEach((num, idx) => {
      if (num === code[idx]) {
        position++;
      } else if (code.includes(num)) {
        correct++;
      }
    });

    setAttempts([...attempts, { guess: [...guess], correct, position }]);

    if (position === 4) {
      setWon(true);
    }
  };

  const updateGuess = (index: number, value: number) => {
    const newGuess = [...guess];
    newGuess[index] = value;
    setGuess(newGuess);
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
          <h1 className="text-3xl font-bold">Code Breaker</h1>
        </div>

        <div className="bg-card p-8 rounded-lg border">
          <p className="text-sm text-muted-foreground mb-6">
            Crack the 4-digit code! Each digit is 0-5. 
            • Correct = Right number, wrong position
            • Position = Right number, right position
          </p>

          {!won ? (
            <>
              <div className="flex gap-2 mb-6">
                {guess.map((num, idx) => (
                  <select
                    key={idx}
                    value={num}
                    onChange={(e) => updateGuess(idx, parseInt(e.target.value))}
                    className="flex-1 p-4 text-center text-2xl font-bold border-2 border-border rounded-lg bg-background"
                  >
                    {[0, 1, 2, 3, 4, 5].map(n => (
                      <option key={n} value={n}>{n}</option>
                    ))}
                  </select>
                ))}
              </div>

              <Button onClick={submitGuess} className="w-full mb-6">Submit Guess</Button>

              <div className="space-y-2">
                {attempts.map((attempt, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-3 bg-muted rounded-lg">
                    <div className="flex gap-2">
                      {attempt.guess.map((num, i) => (
                        <div key={i} className="w-10 h-10 flex items-center justify-center bg-background rounded font-bold">
                          {num}
                        </div>
                      ))}
                    </div>
                    <div className="text-sm">
                      <span className="text-primary font-bold">✓ {attempt.position}</span>
                      {' | '}
                      <span className="text-secondary font-bold">◐ {attempt.correct}</span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center">
              <p className="text-3xl font-bold text-primary mb-4">You Won! 🎉</p>
              <p className="text-xl mb-4">Code: {code.join(' ')}</p>
              <p className="text-muted-foreground mb-6">Attempts: {attempts.length}</p>
              <Button onClick={() => window.location.reload()}>Play Again</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CodeBreaker;
