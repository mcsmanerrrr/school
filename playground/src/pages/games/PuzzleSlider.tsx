import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Shuffle } from "lucide-react";
import { Link } from "react-router-dom";

const PuzzleSlider = () => {
  const [tiles, setTiles] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);

  useEffect(() => {
    shuffle();
  }, []);

  const shuffle = () => {
    const nums = [1, 2, 3, 4, 5, 6, 7, 8, 0];
    for (let i = nums.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [nums[i], nums[j]] = [nums[j], nums[i]];
    }
    setTiles(nums);
    setMoves(0);
  };

  const moveTile = (index: number) => {
    const emptyIndex = tiles.indexOf(0);
    const row = Math.floor(index / 3);
    const col = index % 3;
    const emptyRow = Math.floor(emptyIndex / 3);
    const emptyCol = emptyIndex % 3;

    if ((Math.abs(row - emptyRow) === 1 && col === emptyCol) ||
        (Math.abs(col - emptyCol) === 1 && row === emptyRow)) {
      const newTiles = [...tiles];
      [newTiles[index], newTiles[emptyIndex]] = [newTiles[emptyIndex], newTiles[index]];
      setTiles(newTiles);
      setMoves(moves + 1);
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
          <h1 className="text-3xl font-bold">Puzzle Slider</h1>
          <Button onClick={shuffle} variant="outline" size="sm">
            <Shuffle className="w-4 h-4 mr-2" />
            Shuffle
          </Button>
        </div>

        <div className="bg-card p-8 rounded-lg border">
          <p className="text-center mb-4 font-bold">Moves: {moves}</p>
          <div className="grid grid-cols-3 gap-2 max-w-md mx-auto">
            {tiles.map((tile, index) => (
              <button
                key={index}
                onClick={() => moveTile(index)}
                className={`aspect-square text-3xl font-bold rounded-lg border-2 transition-all ${
                  tile === 0
                    ? 'bg-background border-border'
                    : 'bg-primary text-primary-foreground border-primary hover:scale-105'
                }`}
              >
                {tile !== 0 && tile}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PuzzleSlider;
