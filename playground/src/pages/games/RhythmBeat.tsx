import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const RhythmBeat = () => {
  const [score, setScore] = useState(0);
  const [notes, setNotes] = useState<{id: number, lane: number, y: number}[]>([]);
  const [combo, setCombo] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.5) {
        setNotes(prev => [...prev, {
          id: Date.now(),
          lane: Math.floor(Math.random() * 4),
          y: 0
        }]);
      }
    }, 800);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setNotes(prev => prev
        .map(note => ({...note, y: note.y + 2}))
        .filter(note => note.y < 100)
      );
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const handleKeyPress = (lane: number) => {
    const hitNote = notes.find(n => n.lane === lane && n.y > 80 && n.y < 95);
    if (hitNote) {
      setScore(score + 100);
      setCombo(combo + 1);
      setNotes(prev => prev.filter(n => n.id !== hitNote.id));
    } else {
      setCombo(0);
    }
  };

  const lanes = ['D', 'F', 'J', 'K'];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-primary/20 p-4">
      <div className="container mx-auto max-w-4xl">
        <div className="flex items-center justify-between mb-6">
          <Link to="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Rhythm Beat</h1>
          <div>
            <p className="font-bold">Score: {score}</p>
            <p className="text-sm text-muted-foreground">Combo: {combo}x</p>
          </div>
        </div>

        <div className="relative h-[600px] bg-card border-2 border-border rounded-lg overflow-hidden">
          {/* Hit line */}
          <div className="absolute bottom-20 w-full h-2 bg-primary/50" />

          {/* Lanes */}
          <div className="relative h-full flex">
            {lanes.map((key, laneIdx) => (
              <div key={laneIdx} className="flex-1 border-r border-border/30 relative">
                {/* Notes */}
                {notes.filter(n => n.lane === laneIdx).map(note => (
                  <motion.div
                    key={note.id}
                    className="absolute w-full h-8 bg-accent rounded"
                    style={{ top: `${note.y}%` }}
                    initial={{ scale: 1 }}
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 0.3 }}
                  />
                ))}
              </div>
            ))}
          </div>

          {/* Keys */}
          <div className="absolute bottom-0 w-full flex">
            {lanes.map((key, idx) => (
              <button
                key={idx}
                onClick={() => handleKeyPress(idx)}
                className="flex-1 h-20 bg-muted/50 border-r border-border hover:bg-primary/20 transition-colors font-bold text-2xl"
              >
                {key}
              </button>
            ))}
          </div>
        </div>

        <p className="text-center mt-4 text-muted-foreground">
          Press D, F, J, K when notes reach the line
        </p>
      </div>
    </div>
  );
};

export default RhythmBeat;
