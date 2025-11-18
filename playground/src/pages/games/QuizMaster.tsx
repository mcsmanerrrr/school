import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle, XCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const QuizMaster = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const questions = [
    {
      question: "What is the capital of France?",
      options: ["London", "Berlin", "Paris", "Madrid"],
      correct: 2
    },
    {
      question: "What is 7 × 8?",
      options: ["54", "56", "58", "60"],
      correct: 1
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Venus", "Mars", "Jupiter", "Saturn"],
      correct: 1
    },
    {
      question: "What is the largest ocean on Earth?",
      options: ["Atlantic", "Indian", "Arctic", "Pacific"],
      correct: 3
    },
    {
      question: "Who wrote 'Romeo and Juliet'?",
      options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
      correct: 1
    }
  ];

  const handleAnswer = (index: number) => {
    setSelectedAnswer(index);
    setTimeout(() => {
      if (index === questions[currentQuestion].correct) {
        setScore(score + 1);
      }
      
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        setShowResult(true);
      }
    }, 1000);
  };

  const restart = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
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
          <h1 className="text-3xl font-bold">Quiz Master</h1>
        </div>

        {!showResult ? (
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-card p-8 rounded-lg border"
          >
            <div className="mb-6">
              <p className="text-sm text-muted-foreground mb-2">
                Question {currentQuestion + 1} of {questions.length}
              </p>
              <h2 className="text-2xl font-bold mb-6">{questions[currentQuestion].question}</h2>
            </div>

            <div className="space-y-3">
              {questions[currentQuestion].options.map((option, index) => (
                <Button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  disabled={selectedAnswer !== null}
                  variant="outline"
                  className={`w-full justify-start text-left h-auto p-4 ${
                    selectedAnswer === index
                      ? index === questions[currentQuestion].correct
                        ? 'bg-green-500/20 border-green-500'
                        : 'bg-destructive/20 border-destructive'
                      : ''
                  }`}
                >
                  {option}
                  {selectedAnswer === index && (
                    index === questions[currentQuestion].correct
                      ? <CheckCircle className="ml-auto w-5 h-5 text-green-500" />
                      : <XCircle className="ml-auto w-5 h-5 text-destructive" />
                  )}
                </Button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card p-8 rounded-lg border text-center"
          >
            <h2 className="text-3xl font-bold mb-4">Quiz Complete!</h2>
            <p className="text-5xl font-bold text-primary mb-6">
              {score} / {questions.length}
            </p>
            <Button onClick={restart}>Try Again</Button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default QuizMaster;
