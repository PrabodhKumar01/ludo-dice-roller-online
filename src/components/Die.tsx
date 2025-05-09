
import React from 'react';
import { Dice1, Dice2, Dice3, Dice4, Dice5, Dice6 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DieProps {
  value: number;
  color: string;
  isRolling: boolean;
}

const Die: React.FC<DieProps> = ({ value, color, isRolling }) => {
  const getDiceIcon = () => {
    switch (value) {
      case 1:
        return <Dice1 className="w-full h-full" />;
      case 2:
        return <Dice2 className="w-full h-full" />;
      case 3:
        return <Dice3 className="w-full h-full" />;
      case 4:
        return <Dice4 className="w-full h-full" />;
      case 5:
        return <Dice5 className="w-full h-full" />;
      case 6:
        return <Dice6 className="w-full h-full" />;
      default:
        return <Dice1 className="w-full h-full" />;
    }
  };

  return (
    <div
      className={cn(
        "w-16 h-16 md:w-20 md:h-20 rounded-lg flex items-center justify-center text-white shadow-lg",
        isRolling && "animate-dice-roll"
      )}
      style={{ backgroundColor: color }}
    >
      {getDiceIcon()}
    </div>
  );
};

export default Die;
