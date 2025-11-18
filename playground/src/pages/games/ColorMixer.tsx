import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { ArrowLeft, Palette, RotateCcw } from "lucide-react";
import { Link } from "react-router-dom";

const ColorMixer = () => {
  const [red, setRed] = useState(128);
  const [green, setGreen] = useState(128);
  const [blue, setBlue] = useState(128);
  const [savedColors, setSavedColors] = useState<string[]>([]);

  const currentColor = `rgb(${red}, ${green}, ${blue})`;
  const hexColor = `#${red.toString(16).padStart(2, "0")}${green.toString(16).padStart(2, "0")}${blue.toString(16).padStart(2, "0")}`;

  const saveColor = () => {
    if (savedColors.length < 12 && !savedColors.includes(hexColor)) {
      setSavedColors([...savedColors, hexColor]);
    }
  };

  const resetColors = () => {
    setRed(128);
    setGreen(128);
    setBlue(128);
  };

  const presetColors = [
    { name: "Red", r: 255, g: 0, b: 0 },
    { name: "Green", r: 0, g: 255, b: 0 },
    { name: "Blue", r: 0, g: 0, b: 255 },
    { name: "Yellow", r: 255, g: 255, b: 0 },
    { name: "Purple", r: 128, g: 0, b: 128 },
    { name: "Orange", r: 255, g: 165, b: 0 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-tertiary/10 to-accent/10 p-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link to="/">
            <Button variant="ghost">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-tertiary to-accent bg-clip-text text-transparent">
            Color Mixer Lab
          </h1>
          <div className="w-20" />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Color Display */}
          <Card className="p-8">
            <motion.div
              className="w-full aspect-square rounded-2xl shadow-2xl mb-6"
              style={{ backgroundColor: currentColor }}
              animate={{ backgroundColor: currentColor }}
            />
            <div className="text-center space-y-2">
              <p className="text-2xl font-bold">{hexColor}</p>
              <p className="text-sm text-muted-foreground">
                RGB({red}, {green}, {blue})
              </p>
            </div>
            <div className="flex gap-2 mt-6">
              <Button onClick={saveColor} className="flex-1">
                <Palette className="w-4 h-4 mr-2" />
                Save Color
              </Button>
              <Button onClick={resetColors} variant="outline">
                <RotateCcw className="w-4 h-4" />
              </Button>
            </div>
          </Card>

          {/* Controls */}
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <div className="w-4 h-4 bg-red-500 rounded" />
                Red: {red}
              </h3>
              <Slider
                value={[red]}
                onValueChange={(value) => setRed(value[0])}
                max={255}
                step={1}
                className="mb-6"
              />

              <h3 className="font-bold mb-4 flex items-center gap-2">
                <div className="w-4 h-4 bg-green-500 rounded" />
                Green: {green}
              </h3>
              <Slider
                value={[green]}
                onValueChange={(value) => setGreen(value[0])}
                max={255}
                step={1}
                className="mb-6"
              />

              <h3 className="font-bold mb-4 flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-500 rounded" />
                Blue: {blue}
              </h3>
              <Slider
                value={[blue]}
                onValueChange={(value) => setBlue(value[0])}
                max={255}
                step={1}
              />
            </Card>

            <Card className="p-6">
              <h3 className="font-bold mb-4">Quick Presets</h3>
              <div className="grid grid-cols-3 gap-3">
                {presetColors.map((color) => (
                  <Button
                    key={color.name}
                    variant="outline"
                    onClick={() => {
                      setRed(color.r);
                      setGreen(color.g);
                      setBlue(color.b);
                    }}
                    className="h-auto py-3"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <div
                        className="w-8 h-8 rounded"
                        style={{ backgroundColor: `rgb(${color.r}, ${color.g}, ${color.b})` }}
                      />
                      <span className="text-xs">{color.name}</span>
                    </div>
                  </Button>
                ))}
              </div>
            </Card>
          </div>
        </div>

        {/* Saved Colors */}
        {savedColors.length > 0 && (
          <Card className="mt-6 p-6">
            <h3 className="font-bold mb-4">Your Saved Colors</h3>
            <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-3">
              {savedColors.map((color, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="aspect-square rounded-lg shadow-md cursor-pointer hover:scale-110 transition-transform"
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ColorMixer;
