import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SolarSystem from "./pages/games/SolarSystem";
import MemoryMatch from "./pages/games/MemoryMatch";
import MathChallenge from "./pages/games/MathChallenge";
import TypingSpeed from "./pages/games/TypingSpeed";
import PatternPuzzle from "./pages/games/PatternPuzzle";
import ColorMixer from "./pages/games/ColorMixer";
import WordSearch from "./pages/games/WordSearch";
import Sudoku from "./pages/games/Sudoku";
import QuizMaster from "./pages/games/QuizMaster";
import GeographyQuiz from "./pages/games/GeographyQuiz";
import SpaceShooter from "./pages/games/SpaceShooter";
import PuzzleSlider from "./pages/games/PuzzleSlider";
import SimonSays from "./pages/games/SimonSays";
import TicTacToe from "./pages/games/TicTacToe";
import NumberSequence from "./pages/games/NumberSequence";
import ShapeMatcher from "./pages/games/ShapeMatcher";
import RhythmBeat from "./pages/games/RhythmBeat";
import CodeBreaker from "./pages/games/CodeBreaker";
import StoryBuilder from "./pages/games/StoryBuilder";
import PhysicsSandbox from "./pages/games/PhysicsSandbox";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/games/solar-system" element={<SolarSystem />} />
          <Route path="/games/memory-match" element={<MemoryMatch />} />
          <Route path="/games/math-challenge" element={<MathChallenge />} />
          <Route path="/games/typing-speed" element={<TypingSpeed />} />
          <Route path="/games/pattern-puzzle" element={<PatternPuzzle />} />
          <Route path="/games/color-mixer" element={<ColorMixer />} />
          <Route path="/games/word-search" element={<WordSearch />} />
          <Route path="/games/sudoku" element={<Sudoku />} />
          <Route path="/games/quiz-master" element={<QuizMaster />} />
          <Route path="/games/geography-quiz" element={<GeographyQuiz />} />
          <Route path="/games/space-shooter" element={<SpaceShooter />} />
          <Route path="/games/puzzle-slider" element={<PuzzleSlider />} />
          <Route path="/games/simon-says" element={<SimonSays />} />
          <Route path="/games/tic-tac-toe" element={<TicTacToe />} />
          <Route path="/games/number-sequence" element={<NumberSequence />} />
          <Route path="/games/shape-matcher" element={<ShapeMatcher />} />
          <Route path="/games/rhythm-beat" element={<RhythmBeat />} />
          <Route path="/games/code-breaker" element={<CodeBreaker />} />
          <Route path="/games/story-builder" element={<StoryBuilder />} />
          <Route path="/games/physics-sandbox" element={<PhysicsSandbox />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
