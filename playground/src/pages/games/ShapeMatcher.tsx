import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const ShapeMatcher = () => {
  const shapes = ['circle', 'square', 'triangle', 'star'];
  const [targetShape, setTargetShape] = useState('');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    setTargetShape(shapes[Math.floor(Math.random() * shapes.length)]);
  }, []);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const handleClick = (shape: string) => {
    if (timeLeft === 0) return;
    
    if (shape === targetShape) {
      setScore(score + 1);
      setTargetShape(shapes[Math.floor(Math.random() * shapes.length)]);
    } else {
      setScore(Math.max(0, score - 1));
    }
  };

  const renderShape = (shape: string, size: number = 100) => {
    const baseClass = `cursor-pointer transition-transform hover:scale-110`;
    
    switch(shape) {
      case 'circle':
        return <div className={`${baseClass} bg-primary rounded-full`} style={{width: size, height: size}} />;
      case 'square':
        return <div className={`${baseClass} bg-secondary`} style={{width: size, height: size}} />;
      case 'triangle':
        return <div className={`${baseClass}`} style={{
          width: 0,
          height: 0,
          borderLeft: `${size/2}px solid transparent`,
          borderRight: `${size/2}px solid transparent`,
          borderBottom: `${size}px solid hsl(var(--accent))`
        }} />;
      case 'star':
        return <div className={`${baseClass} text-6xl`}>⭐</div>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/10 p-4">
      <div className="container mx-auto max-w-4xl">
        <div className="flex items-center justify-between mb-6">
          <Link to="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Shape Matcher</h1>
        </div>

        <div className="bg-card p-8 rounded-lg border">
          <div className="flex justify-between mb-6">
            <p className="text-xl font-bold">Score: {score}</p>
            <p className="text-xl font-bold">Time: {timeLeft}s</p>
          </div>

          {timeLeft > 0 ? (
            <>
              <div className="text-center mb-8">
                <p className="text-lg mb-4">Click the:</p>
                <p className="text-3xl font-bold text-primary capitalize">{targetShape}</p>
              </div>

              <div className="grid grid-cols-4 gap-8 justify-items-center">
                {shapes.map(shape => (
                  <div key={shape} onClick={() => handleClick(shape)}>
                    {renderShape(shape)}
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center">
              <p className="text-3xl font-bold mb-4">Game Over!</p>
              <p className="text-2xl mb-6">Final Score: {score}</p>
              <Button onClick={() => window.location.reload()}>Play Again</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShapeMatcher;
