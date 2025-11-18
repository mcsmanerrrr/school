import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, RotateCcw } from "lucide-react";
import { Link } from "react-router-dom";

const Sudoku = () => {
  const [grid, setGrid] = useState<number[][]>([]);
  const [initial, setInitial] = useState<boolean[][]>([]);

  useEffect(() => {
    generatePuzzle();
  }, []);

  const generatePuzzle = () => {
    const solution = [
      [5, 3, 4, 6, 7, 8, 9, 1, 2],
      [6, 7, 2, 1, 9, 5, 3, 4, 8],
      [1, 9, 8, 3, 4, 2, 5, 6, 7],
      [8, 5, 9, 7, 6, 1, 4, 2, 3],
      [4, 2, 6, 8, 5, 3, 7, 9, 1],
      [7, 1, 3, 9, 2, 4, 8, 5, 6],
      [9, 6, 1, 5, 3, 7, 2, 8, 4],
      [2, 8, 7, 4, 1, 9, 6, 3, 5],
      [3, 4, 5, 2, 8, 6, 1, 7, 9]
    ];

    const puzzle = solution.map(row => [...row]);
    const initialState = Array(9).fill(0).map(() => Array(9).fill(false));
    
    for (let i = 0; i < 40; i++) {
      const row = Math.floor(Math.random() * 9);
      const col = Math.floor(Math.random() * 9);
      puzzle[row][col] = 0;
      initialState[row][col] = false;
    }

    solution.forEach((row, i) => {
      row.forEach((val, j) => {
        if (puzzle[i][j] !== 0) initialState[i][j] = true;
      });
    });

    setGrid(puzzle);
    setInitial(initialState);
  };

  const handleChange = (row: number, col: number, value: string) => {
    if (initial[row][col]) return;
    const newGrid = [...grid];
    newGrid[row][col] = value ? parseInt(value) : 0;
    setGrid(newGrid);
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
          <h1 className="text-3xl font-bold">Sudoku</h1>
          <Button onClick={generatePuzzle} variant="outline" size="sm">
            <RotateCcw className="w-4 h-4 mr-2" />
            New
          </Button>
        </div>

        <div className="bg-card p-6 rounded-lg border">
          <div className="grid grid-cols-9 gap-0 border-2 border-border">
            {grid.map((row, rowIndex) =>
              row.map((cell, colIndex) => (
                <input
                  key={`${rowIndex}-${colIndex}`}
                  type="text"
                  maxLength={1}
                  value={cell || ''}
                  onChange={(e) => handleChange(rowIndex, colIndex, e.target.value)}
                  className={`w-full aspect-square text-center font-bold text-lg border border-border/50
                    ${initial[rowIndex][colIndex] ? 'bg-muted' : 'bg-background'}
                    ${colIndex % 3 === 2 && colIndex !== 8 ? 'border-r-2' : ''}
                    ${rowIndex % 3 === 2 && rowIndex !== 8 ? 'border-b-2' : ''}
                    focus:outline-none focus:bg-primary/10`}
                  readOnly={initial[rowIndex][colIndex]}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sudoku;
