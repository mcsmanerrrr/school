import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const WordSearch = () => {
  const [grid, setGrid] = useState<string[][]>([]);
  const [words] = useState(["SCHOOL", "LEARN", "BOOK", "MATH", "SCIENCE"]);
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [selecting, setSelecting] = useState(false);
  const [selectedCells, setSelectedCells] = useState<[number, number][]>([]);

  useEffect(() => {
    generateGrid();
  }, []);

  const generateGrid = () => {
    const size = 10;
    const newGrid = Array(size).fill(0).map(() => 
      Array(size).fill(0).map(() => String.fromCharCode(65 + Math.floor(Math.random() * 26)))
    );
    
    words.forEach(word => {
      const direction = Math.random() > 0.5 ? 'horizontal' : 'vertical';
      let placed = false;
      
      while (!placed) {
        const row = Math.floor(Math.random() * size);
        const col = Math.floor(Math.random() * size);
        
        if (direction === 'horizontal' && col + word.length <= size) {
          for (let i = 0; i < word.length; i++) {
            newGrid[row][col + i] = word[i];
          }
          placed = true;
        } else if (direction === 'vertical' && row + word.length <= size) {
          for (let i = 0; i < word.length; i++) {
            newGrid[row + i][col] = word[i];
          }
          placed = true;
        }
      }
    });
    
    setGrid(newGrid);
  };

  const handleCellClick = (row: number, col: number) => {
    if (!selecting) {
      setSelecting(true);
      setSelectedCells([[row, col] as [number, number]]);
    } else {
      const newSelected: [number, number][] = [...selectedCells, [row, col] as [number, number]];
      setSelectedCells(newSelected);
      checkWord(newSelected);
    }
  };

  const checkWord = (cells: [number, number][]) => {
    const word = cells.map(([r, c]) => grid[r][c]).join('');
    if (words.includes(word) && !foundWords.includes(word)) {
      setFoundWords([...foundWords, word]);
      setSelectedCells([]);
      setSelecting(false);
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
          <h1 className="text-3xl font-bold">Word Search</h1>
        </div>

        <div className="grid md:grid-cols-[1fr,250px] gap-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-card p-6 rounded-lg border"
          >
            <div className="grid grid-cols-10 gap-1">
              {grid.map((row, rowIndex) =>
                row.map((cell, colIndex) => (
                  <button
                    key={`${rowIndex}-${colIndex}`}
                    onClick={() => handleCellClick(rowIndex, colIndex)}
                    className={`w-full aspect-square flex items-center justify-center text-sm font-bold border rounded transition-colors
                      ${selectedCells.some(([r, c]) => r === rowIndex && c === colIndex)
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-background hover:bg-muted'
                      }`}
                  >
                    {cell}
                  </button>
                ))
              )}
            </div>
          </motion.div>

          <div className="bg-card p-6 rounded-lg border h-fit">
            <h3 className="font-bold mb-4">Find These Words:</h3>
            <ul className="space-y-2">
              {words.map(word => (
                <li
                  key={word}
                  className={`font-medium ${
                    foundWords.includes(word)
                      ? 'text-primary line-through'
                      : 'text-foreground'
                  }`}
                >
                  {word}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WordSearch;
