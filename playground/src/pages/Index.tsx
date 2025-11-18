import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Gamepad2, 
  Brain, 
  Rocket, 
  Star, 
  Trophy,
  Sparkles,
  Globe,
  Palette,
  Calculator,
  Keyboard,
  Grid3x3,
  Timer
} from "lucide-react";

import {
  Search,
  Target,
  Hash,
  Lightbulb,
  Puzzle,
  Hand,
  Grid2x2,
  ListOrdered,
  Shapes,
  Music,
  Lock,
  BookOpen,
  Atom
} from "lucide-react";

const games = [
  {
    id: "solar-system",
    title: "3D Solar System",
    description: "Explore the solar system in an interactive 3D world",
    icon: Globe,
    difficulty: "Medium",
    ageGroup: "10+",
    category: "Educational",
    gradient: "from-primary to-accent",
  },
  {
    id: "memory-match",
    title: "Memory Match",
    description: "Test your memory with colorful cards",
    icon: Brain,
    difficulty: "Easy",
    ageGroup: "6+",
    category: "Memory",
    gradient: "from-secondary to-primary-glow",
  },
  {
    id: "math-challenge",
    title: "Math Challenge",
    description: "Solve math problems as fast as you can",
    icon: Calculator,
    difficulty: "Medium",
    ageGroup: "8+",
    category: "Educational",
    gradient: "from-tertiary to-secondary",
  },
  {
    id: "typing-speed",
    title: "Typing Speed Test",
    description: "Improve your typing speed and accuracy",
    icon: Keyboard,
    difficulty: "Easy",
    ageGroup: "10+",
    category: "Skills",
    gradient: "from-accent to-primary",
  },
  {
    id: "pattern-puzzle",
    title: "Pattern Puzzle",
    description: "Complete patterns and sequences",
    icon: Grid3x3,
    difficulty: "Hard",
    ageGroup: "12+",
    category: "Logic",
    gradient: "from-primary to-secondary",
  },
  {
    id: "color-mixer",
    title: "Color Mixer Lab",
    description: "Learn about colors by mixing them",
    icon: Palette,
    difficulty: "Easy",
    ageGroup: "6+",
    category: "Creative",
    gradient: "from-tertiary to-accent",
  },
  {
    id: "word-search",
    title: "Word Search",
    description: "Find hidden words in the letter grid",
    icon: Search,
    difficulty: "Easy",
    ageGroup: "8+",
    category: "Word",
    gradient: "from-primary to-tertiary",
  },
  {
    id: "sudoku",
    title: "Sudoku",
    description: "Solve the classic number puzzle",
    icon: Hash,
    difficulty: "Hard",
    ageGroup: "12+",
    category: "Logic",
    gradient: "from-secondary to-accent",
  },
  {
    id: "quiz-master",
    title: "Quiz Master",
    description: "Test your general knowledge",
    icon: Lightbulb,
    difficulty: "Medium",
    ageGroup: "10+",
    category: "Educational",
    gradient: "from-accent to-primary",
  },
  {
    id: "geography-quiz",
    title: "Geography Quiz",
    description: "Explore the world through questions",
    icon: Globe,
    difficulty: "Medium",
    ageGroup: "10+",
    category: "Educational",
    gradient: "from-primary to-secondary",
  },
  {
    id: "space-shooter",
    title: "Space Shooter",
    description: "Defend against alien invaders",
    icon: Rocket,
    difficulty: "Medium",
    ageGroup: "10+",
    category: "Action",
    gradient: "from-tertiary to-primary",
  },
  {
    id: "puzzle-slider",
    title: "Puzzle Slider",
    description: "Arrange tiles in the correct order",
    icon: Puzzle,
    difficulty: "Medium",
    ageGroup: "8+",
    category: "Puzzle",
    gradient: "from-secondary to-tertiary",
  },
  {
    id: "simon-says",
    title: "Simon Says",
    description: "Follow the color sequence pattern",
    icon: Hand,
    difficulty: "Easy",
    ageGroup: "6+",
    category: "Memory",
    gradient: "from-accent to-secondary",
  },
  {
    id: "tic-tac-toe",
    title: "Tic Tac Toe",
    description: "Classic strategy game for two",
    icon: Grid2x2,
    difficulty: "Easy",
    ageGroup: "6+",
    category: "Strategy",
    gradient: "from-primary to-accent",
  },
  {
    id: "number-sequence",
    title: "Number Sequence",
    description: "Find the next number in the pattern",
    icon: ListOrdered,
    difficulty: "Hard",
    ageGroup: "12+",
    category: "Logic",
    gradient: "from-tertiary to-accent",
  },
  {
    id: "shape-matcher",
    title: "Shape Matcher",
    description: "Match shapes quickly under time pressure",
    icon: Shapes,
    difficulty: "Easy",
    ageGroup: "6+",
    category: "Reflex",
    gradient: "from-secondary to-primary",
  },
  {
    id: "rhythm-beat",
    title: "Rhythm Beat",
    description: "Hit the notes to the beat",
    icon: Music,
    difficulty: "Medium",
    ageGroup: "10+",
    category: "Music",
    gradient: "from-accent to-tertiary",
  },
  {
    id: "code-breaker",
    title: "Code Breaker",
    description: "Crack the secret code",
    icon: Lock,
    difficulty: "Hard",
    ageGroup: "12+",
    category: "Logic",
    gradient: "from-primary to-tertiary",
  },
  {
    id: "story-builder",
    title: "Story Builder",
    description: "Create your own adventure story",
    icon: BookOpen,
    difficulty: "Easy",
    ageGroup: "8+",
    category: "Creative",
    gradient: "from-secondary to-accent",
  },
  {
    id: "physics-sandbox",
    title: "Physics Sandbox",
    description: "Play with physics and gravity",
    icon: Atom,
    difficulty: "Medium",
    ageGroup: "10+",
    category: "Science",
    gradient: "from-tertiary to-primary",
  },
];

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");

  const categories = ["All", "Educational", "Memory", "Skills", "Logic", "Creative", "Word", "Action", "Puzzle", "Strategy", "Reflex", "Music", "Science"];
  const difficulties = ["All", "Easy", "Medium", "Hard"];

  const filteredGames = games.filter(game => {
    const matchesCategory = selectedCategory === "All" || game.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === "All" || game.difficulty === selectedDifficulty;
    return matchesCategory && matchesDifficulty;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/10">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Gamepad2 className="w-8 h-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Maner Central School
                </h1>
                <p className="text-sm text-muted-foreground">Learning Through Play</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-tertiary" />
              <span className="font-semibold text-foreground">0 Points</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <Sparkles className="w-6 h-6 text-tertiary animate-pulse" />
            <Badge variant="secondary" className="text-sm">
              20+ Educational Games
            </Badge>
            <Sparkles className="w-6 h-6 text-tertiary animate-pulse" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
            Play, Learn & Grow
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our collection of interactive games designed for all age groups.
            From simple puzzles to 3D worlds, there's something for everyone!
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-center"
        >
          <div className="flex flex-wrap gap-2 justify-center">
            <span className="text-sm font-medium text-muted-foreground mr-2">Category:</span>
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="transition-all"
              >
                {category}
              </Button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            <span className="text-sm font-medium text-muted-foreground mr-2">Difficulty:</span>
            {difficulties.map((difficulty) => (
              <Button
                key={difficulty}
                variant={selectedDifficulty === difficulty ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedDifficulty(difficulty)}
                className="transition-all"
              >
                {difficulty}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Games Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredGames.map((game, index) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <Link to={`/games/${game.id}`}>
                <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-primary/50">
                  <div className={`h-32 bg-gradient-to-br ${game.gradient} relative overflow-hidden`}>
                    <motion.div
                      className="absolute inset-0 opacity-0 group-hover:opacity-20"
                      animate={{
                        background: [
                          "radial-gradient(circle at 0% 0%, white 0%, transparent 50%)",
                          "radial-gradient(circle at 100% 100%, white 0%, transparent 50%)",
                          "radial-gradient(circle at 0% 0%, white 0%, transparent 50%)",
                        ],
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <game.icon className="w-16 h-16 text-white opacity-80 group-hover:scale-110 transition-transform duration-300" />
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {game.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {game.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2">
                        <Badge variant="outline" className="text-xs">
                          {game.ageGroup}
                        </Badge>
                        <Badge 
                          variant={
                            game.difficulty === "Easy" 
                              ? "secondary" 
                              : game.difficulty === "Medium" 
                              ? "default" 
                              : "destructive"
                          }
                          className="text-xs"
                        >
                          {game.difficulty}
                        </Badge>
                      </div>
                      <Star className="w-5 h-5 text-muted-foreground group-hover:text-tertiary transition-colors" />
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {filteredGames.length === 0 && (
          <div className="text-center py-12">
            <Rocket className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-lg text-muted-foreground">
              No games found with the selected filters. Try different options!
            </p>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="border-t mt-20 bg-card/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          <p>© 2024 Maner Central School. All rights reserved.</p>
          <p className="mt-2">Learning made fun for all age groups!</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
