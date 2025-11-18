import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Circle, Square, Trash } from "lucide-react";
import { Link } from "react-router-dom";

interface Ball {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
}

const PhysicsSandbox = () => {
  const [balls, setBalls] = useState<Ball[]>([]);
  const [selectedShape, setSelectedShape] = useState<'circle' | 'square'>('circle');
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setBalls(prev => prev.map(ball => {
        let newX = ball.x + ball.vx;
        let newY = ball.y + ball.vy;
        let newVx = ball.vx;
        let newVy = ball.vy + 0.5; // Gravity

        // Bounce off walls
        if (newX - ball.radius < 0 || newX + ball.radius > 800) {
          newVx = -newVx * 0.8;
          newX = Math.max(ball.radius, Math.min(800 - ball.radius, newX));
        }
        if (newY + ball.radius > 600) {
          newVy = -newVy * 0.8;
          newY = 600 - ball.radius;
        }

        return { ...ball, x: newX, y: newY, vx: newVx, vy: newVy };
      }));
    }, 16);

    return () => clearInterval(interval);
  }, []);

  const addBall = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const colors = ['hsl(var(--primary))', 'hsl(var(--secondary))', 'hsl(var(--accent))'];
    
    setBalls([...balls, {
      id: Date.now(),
      x,
      y,
      vx: (Math.random() - 0.5) * 4,
      vy: Math.random() * -5,
      radius: 20 + Math.random() * 20,
      color: colors[Math.floor(Math.random() * colors.length)]
    }]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/10 p-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex items-center justify-between mb-6">
          <Link to="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Physics Sandbox</h1>
          <Button onClick={() => setBalls([])} variant="outline" size="sm">
            <Trash className="w-4 h-4 mr-2" />
            Clear
          </Button>
        </div>

        <div className="bg-card p-6 rounded-lg border">
          <div className="flex gap-2 mb-4">
            <Button
              variant={selectedShape === 'circle' ? 'default' : 'outline'}
              onClick={() => setSelectedShape('circle')}
            >
              <Circle className="w-4 h-4 mr-2" />
              Circle
            </Button>
            <Button
              variant={selectedShape === 'square' ? 'default' : 'outline'}
              onClick={() => setSelectedShape('square')}
            >
              <Square className="w-4 h-4 mr-2" />
              Square
            </Button>
          </div>

          <div
            ref={canvasRef}
            onClick={addBall}
            className="relative w-full h-[600px] bg-background border-2 border-border rounded-lg overflow-hidden cursor-crosshair"
          >
            {balls.map(ball => (
              <div
                key={ball.id}
                className="absolute rounded-full"
                style={{
                  left: ball.x - ball.radius,
                  top: ball.y - ball.radius,
                  width: ball.radius * 2,
                  height: ball.radius * 2,
                  backgroundColor: ball.color,
                  transition: 'none'
                }}
              />
            ))}

            {balls.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                Click anywhere to add bouncing balls!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhysicsSandbox;
