
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface DiceControlsProps {
  diceCount: number;
  setDiceCount: (count: number) => void;
  rollDice: () => void;
  isRolling: boolean;
}

const DiceControls: React.FC<DiceControlsProps> = ({ 
  diceCount, 
  setDiceCount, 
  rollDice,
  isRolling 
}) => {
  const handleDiceCountChange = (count: number) => {
    if (count >= 1 && count <= 4) {
      setDiceCount(count);
    }
  };

  return (
    <div className="flex flex-col gap-4 items-center">
      <div className="flex items-center gap-4">
        <Button 
          variant="outline"
          onClick={() => handleDiceCountChange(diceCount - 1)}
          disabled={diceCount <= 1 || isRolling}
          className="h-10 w-10 rounded-full p-0"
        >
          -
        </Button>
        <span className="text-xl font-bold">{diceCount} {diceCount === 1 ? 'Die' : 'Dice'}</span>
        <Button 
          variant="outline"
          onClick={() => handleDiceCountChange(diceCount + 1)}
          disabled={diceCount >= 4 || isRolling}
          className="h-10 w-10 rounded-full p-0"
        >
          +
        </Button>
      </div>
      <Button
        className={cn(
          "px-8 py-6 text-lg font-bold rounded-full shadow-lg transition-transform hover:scale-105",
          "bg-gradient-to-r from-ludo-red via-ludo-yellow to-ludo-green text-white"
        )}
        onClick={rollDice}
        disabled={isRolling}
      >
        {isRolling ? 'Rolling...' : 'Roll Dice!'}
      </Button>
    </div>
  );
};

export default DiceControls;
