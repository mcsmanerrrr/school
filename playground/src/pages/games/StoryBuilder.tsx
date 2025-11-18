import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

const StoryBuilder = () => {
  const [story, setStory] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState(0);

  const prompts = [
    { question: "Who is the main character?", options: ["A brave knight", "A curious scientist", "A clever fox", "A young wizard"] },
    { question: "Where does the story take place?", options: ["In a magical forest", "On a distant planet", "In an underwater city", "In a medieval castle"] },
    { question: "What is their goal?", options: ["To find a treasure", "To save the kingdom", "To discover the truth", "To learn magic"] },
    { question: "What obstacle do they face?", options: ["A fierce dragon", "A mysterious riddle", "A powerful enemy", "A dangerous storm"] },
    { question: "How does it end?", options: ["They succeed heroically", "They make a new friend", "They learn a lesson", "They return home wiser"] }
  ];

  const handleChoice = (choice: string) => {
    setStory([...story, choice]);
    if (currentStep < prompts.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const reset = () => {
    setStory([]);
    setCurrentStep(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/10 p-4">
      <div className="container mx-auto max-w-3xl">
        <div className="flex items-center justify-between mb-6">
          <Link to="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <BookOpen className="w-8 h-8 text-primary" />
            Story Builder
          </h1>
        </div>

        <div className="bg-card p-8 rounded-lg border">
          {currentStep < prompts.length ? (
            <>
              <h2 className="text-2xl font-bold mb-6">{prompts[currentStep].question}</h2>
              <div className="space-y-3">
                {prompts[currentStep].options.map((option, idx) => (
                  <Button
                    key={idx}
                    onClick={() => handleChoice(option)}
                    variant="outline"
                    className="w-full justify-start text-left h-auto p-4"
                  >
                    {option}
                  </Button>
                ))}
              </div>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold mb-6 text-center text-primary">Your Story</h2>
              <div className="prose prose-lg max-w-none mb-6">
                <p className="leading-relaxed">
                  Once upon a time, there was <strong>{story[0]}</strong>.
                  They lived <strong>{story[1]}</strong>.
                  Their greatest wish was <strong>{story[2]}</strong>.
                  But they faced <strong>{story[3]}</strong>.
                  In the end, <strong>{story[4]}</strong>.
                </p>
              </div>
              <div className="flex gap-4">
                <Button onClick={reset} className="flex-1">Create New Story</Button>
              </div>
            </>
          )}

          {story.length > 0 && currentStep < prompts.length && (
            <div className="mt-6 p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">Your story so far:</p>
              <p className="mt-2">{story.join(' → ')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StoryBuilder;
