import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const NumberSequence = () => {
  const [sequence, setSequence] = useState<number[]>([]);
  const [userAnswer, setUserAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    generateSequence();
  }, []);

  const generateSequence = () => {
    const types = ['arithmetic', 'geometric', 'fibonacci'];
    const type = types[Math.floor(Math.random() * types.length)];
    
    let seq: number[] = [];
    if (type === 'arithmetic') {
      const start = Math.floor(Math.random() * 10);
      const diff = Math.floor(Math.random() * 5) + 1;
      seq = Array(4).fill(0).map((_, i) => start + i * diff);
    } else if (type === 'geometric') {
      const start = Math.floor(Math.random() * 3) + 1;
      const ratio = Math.floor(Math.random() * 3) + 2;
      seq = Array(4).fill(0).map((_, i) => start * Math.pow(ratio, i));
    } else {
      seq = [1, 1];
      for (let i = 2; i < 4; i++) {
        seq.push(seq[i-1] + seq[i-2]);
      }
    }
    
    setSequence(seq);
    setUserAnswer("");
    setFeedback("");
  };

  const checkAnswer = () => {
    const correct = sequence[sequence.length - 1] + (sequence[1] - sequence[0]);
    if (parseInt(userAnswer) === correct) {
      setScore(score + 1);
      setFeedback("Correct! 🎉");
      setTimeout(generateSequence, 1500);
    } else {
      setFeedback(`Wrong! Correct answer: ${correct}`);
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
          <h1 className="text-3xl font-bold">Number Sequence</h1>
        </div>

        <div className="bg-card p-8 rounded-lg border">
          <p className="text-center text-xl font-bold mb-6">Score: {score}</p>
          
          <div className="flex justify-center gap-4 mb-6">
            {sequence.map((num, i) => (
              <div key={i} className="w-16 h-16 flex items-center justify-center bg-primary text-primary-foreground rounded-lg text-2xl font-bold">
                {num}
              </div>
            ))}
            <div className="w-16 h-16 flex items-center justify-center border-2 border-dashed border-primary rounded-lg text-2xl font-bold">
              ?
            </div>
          </div>

          <div className="flex gap-2">
            <input
              type="number"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              className="flex-1 px-4 py-2 border border-border rounded-lg bg-background"
              placeholder="Enter next number"
            />
            <Button onClick={checkAnswer}>Submit</Button>
          </div>

          {feedback && (
            <p className={`text-center mt-4 font-bold ${
              feedback.includes('Correct') ? 'text-green-500' : 'text-destructive'
            }`}>
              {feedback}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default NumberSequence;
