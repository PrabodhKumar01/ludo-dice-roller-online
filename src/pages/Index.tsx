
import React, { useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';
import Die from '@/components/Die';
import DiceControls from '@/components/DiceControls';
import RollHistory from '@/components/RollHistory';

interface Roll {
  id: number;
  values: number[];
  timestamp: Date;
}

const Index = () => {
  const [diceValues, setDiceValues] = useState<number[]>([1]);
  const [diceCount, setDiceCount] = useState<number>(1);
  const [isRolling, setIsRolling] = useState<boolean>(false);
  const [rollHistory, setRollHistory] = useState<Roll[]>([]);
  const ludoColors = ['#E63946', '#2A9D8F', '#457B9D', '#F9C74F'];

  // Adjust dice array when count changes
  useEffect(() => {
    if (diceValues.length < diceCount) {
      // Add more dice
      setDiceValues(prev => [...prev, ...Array(diceCount - prev.length).fill(1)]);
    } else if (diceValues.length > diceCount) {
      // Remove extra dice
      setDiceValues(prev => prev.slice(0, diceCount));
    }
  }, [diceCount]);

  const rollDice = () => {
    setIsRolling(true);
    
    // Quick animation of random values
    const animationDuration = 1000;
    const frameDuration = 100;
    const frames = animationDuration / frameDuration;
    let currentFrame = 0;
    
    const rollInterval = setInterval(() => {
      if (currentFrame < frames) {
        setDiceValues(prev => 
          prev.map(() => Math.floor(Math.random() * 6) + 1)
        );
        currentFrame++;
      } else {
        clearInterval(rollInterval);
        
        // Final values
        const finalValues = Array(diceCount)
          .fill(0)
          .map(() => Math.floor(Math.random() * 6) + 1);
        
        setDiceValues(finalValues);
        setIsRolling(false);
        
        // Add to history
        const newRoll: Roll = {
          id: Date.now(),
          values: [...finalValues],
          timestamp: new Date()
        };
        
        setRollHistory(prev => [newRoll, ...prev].slice(0, 20));
        
        // Show toast for large rolls
        if (finalValues.includes(6)) {
          toast({
            title: "Lucky Roll!",
            description: "You rolled a 6! Move your piece out of the starting area.",
          });
        }
      }
    }, frameDuration);
  };

  return (
    <div className="min-h-screen bg-ludo-board flex flex-col items-center py-8 px-4">
      <h1 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-ludo-red via-ludo-blue to-ludo-green">
        Ludo Dice Roller
      </h1>
      
      <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-xl">
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {diceValues.map((value, index) => (
                <Die 
                  key={index} 
                  value={value} 
                  color={ludoColors[index % ludoColors.length]} 
                  isRolling={isRolling}
                />
              ))}
            </div>
            
            <DiceControls 
              diceCount={diceCount} 
              setDiceCount={setDiceCount} 
              rollDice={rollDice}
              isRolling={isRolling}
            />
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <RollHistory rolls={rollHistory} />
        </div>
      </div>
      
      <div className="max-w-2xl w-full bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-xl">
        <h2 className="text-2xl font-bold mb-4 text-center text-ludo-blue">How to Use</h2>
        <div className="space-y-2">
          <p>1. Select the number of dice you want to roll (1-4)</p>
          <p>2. Click the "Roll Dice!" button to get random numbers</p>
          <p>3. Use the results for your Ludo game</p>
          <p>4. Check your roll history on the right</p>
          <p className="text-sm text-muted-foreground mt-4">
            Pro tip: In Ludo, you need to roll a 6 to move a piece out of the starting area!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
