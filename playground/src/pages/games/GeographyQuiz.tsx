import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const GeographyQuiz = () => {
  const [score, setScore] = useState(0);
  const [currentQ, setCurrentQ] = useState(0);
  const [answered, setAnswered] = useState(false);

  const questions = [
    { q: "What is the capital of Japan?", options: ["Tokyo", "Seoul", "Beijing", "Bangkok"], ans: 0 },
    { q: "Which country has the most population?", options: ["USA", "India", "China", "Brazil"], ans: 2 },
    { q: "Mount Everest is located in?", options: ["Nepal", "India", "China", "Bhutan"], ans: 0 },
    { q: "Which is the largest desert?", options: ["Gobi", "Sahara", "Arabian", "Antarctic"], ans: 3 },
  ];

  const handleAnswer = (idx: number) => {
    if (answered) return;
    setAnswered(true);
    if (idx === questions[currentQ].ans) setScore(score + 1);
    setTimeout(() => {
      if (currentQ < questions.length - 1) {
        setCurrentQ(currentQ + 1);
        setAnswered(false);
      }
    }, 1500);
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
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <MapPin className="w-8 h-8 text-primary" />
            Geography Quiz
          </h1>
        </div>

        <motion.div
          key={currentQ}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-card p-8 rounded-lg border"
        >
          <p className="text-sm text-muted-foreground mb-4">Score: {score}/{questions.length}</p>
          <h2 className="text-2xl font-bold mb-6">{questions[currentQ].q}</h2>
          <div className="space-y-3">
            {questions[currentQ].options.map((opt, idx) => (
              <Button
                key={idx}
                onClick={() => handleAnswer(idx)}
                variant="outline"
                className="w-full justify-start h-auto p-4"
              >
                {opt}
              </Button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default GeographyQuiz;
