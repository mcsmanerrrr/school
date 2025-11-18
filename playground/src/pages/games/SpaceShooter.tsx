import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Rocket } from "lucide-react";
import { Link } from "react-router-dom";

const SpaceShooter = () => {
  const [score, setScore] = useState(0);
  const [playerX, setPlayerX] = useState(50);
  const [enemies, setEnemies] = useState<{id: number, x: number, y: number}[]>([]);
  const [bullets, setBullets] = useState<{id: number, x: number, y: number}[]>([]);
  const gameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') setPlayerX(Math.max(0, playerX - 5));
      if (e.key === 'ArrowRight') setPlayerX(Math.min(90, playerX + 5));
      if (e.key === ' ') {
        setBullets(prev => [...prev, { id: Date.now(), x: playerX + 2.5, y: 80 }]);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [playerX]);

  useEffect(() => {
    const interval = setInterval(() => {
      setEnemies(prev => {
        const updated = prev.map(e => ({ ...e, y: e.y + 2 })).filter(e => e.y < 100);
        if (Math.random() > 0.7) {
          updated.push({ id: Date.now(), x: Math.random() * 90, y: 0 });
        }
        return updated;
      });

      setBullets(prev => prev.map(b => ({ ...b, y: b.y - 5 })).filter(b => b.y > 0));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    bullets.forEach(bullet => {
      enemies.forEach(enemy => {
        const distance = Math.sqrt(Math.pow(bullet.x - enemy.x, 2) + Math.pow(bullet.y - enemy.y, 2));
        if (distance < 5) {
          setEnemies(prev => prev.filter(e => e.id !== enemy.id));
          setBullets(prev => prev.filter(b => b.id !== bullet.id));
          setScore(s => s + 10);
        }
      });
    });
  }, [bullets, enemies]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#000] to-[#001] p-4">
      <div className="container mx-auto max-w-4xl">
        <div className="flex items-center justify-between mb-6">
          <Link to="/">
            <Button variant="ghost" size="sm" className="text-white">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-white flex items-center gap-2">
            <Rocket className="w-8 h-8" />
            Space Shooter
          </h1>
          <p className="text-white font-bold">Score: {score}</p>
        </div>

        <div ref={gameRef} className="relative w-full h-[600px] bg-black/50 border-2 border-primary rounded-lg overflow-hidden">
          {/* Player */}
          <div
            className="absolute w-10 h-10 bg-primary rounded-full transition-all"
            style={{ left: `${playerX}%`, bottom: '20px' }}
          />

          {/* Enemies */}
          {enemies.map(enemy => (
            <div
              key={enemy.id}
              className="absolute w-8 h-8 bg-destructive rounded-sm"
              style={{ left: `${enemy.x}%`, top: `${enemy.y}%` }}
            />
          ))}

          {/* Bullets */}
          {bullets.map(bullet => (
            <div
              key={bullet.id}
              className="absolute w-2 h-4 bg-accent rounded-full"
              style={{ left: `${bullet.x}%`, top: `${bullet.y}%` }}
            />
          ))}
        </div>

        <p className="text-center text-white mt-4">Use Arrow Keys to move, Space to shoot</p>
      </div>
    </div>
  );
};

export default SpaceShooter;
