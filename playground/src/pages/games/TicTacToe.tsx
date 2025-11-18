import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, RotateCcw } from "lucide-react";
import { Link } from "react-router-dom";

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState<string | null>(null);

  const checkWinner = (squares: (string | null)[]) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];

    for (const [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (index: number) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);

    const gameWinner = checkWinner(newBoard);
    if (gameWinner) setWinner(gameWinner);
  };

  const reset = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
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
          <h1 className="text-3xl font-bold">Tic Tac Toe</h1>
          <Button onClick={reset} variant="outline" size="sm">
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
        </div>

        <div className="bg-card p-8 rounded-lg border">
          <p className="text-center text-xl font-bold mb-6">
            {winner ? `Winner: ${winner}` : `Next: ${isXNext ? 'X' : 'O'}`}
          </p>

          <div className="grid grid-cols-3 gap-3 max-w-md mx-auto">
            {board.map((cell, index) => (
              <button
                key={index}
                onClick={() => handleClick(index)}
                className="aspect-square text-5xl font-bold border-2 border-border rounded-lg bg-background hover:bg-muted transition-colors"
              >
                {cell}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicTacToe;
