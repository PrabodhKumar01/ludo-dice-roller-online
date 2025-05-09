
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Roll {
  id: number;
  values: number[];
  timestamp: Date;
}

interface RollHistoryProps {
  rolls: Roll[];
}

const RollHistory: React.FC<RollHistoryProps> = ({ rolls }) => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  if (rolls.length === 0) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">Roll History</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground">No rolls yet. Start rolling!</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-center">Roll History</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[200px] rounded-md border p-4">
          <div className="space-y-4">
            {rolls.map((roll) => (
              <div 
                key={roll.id} 
                className="p-3 rounded-lg bg-secondary flex justify-between items-center"
              >
                <div className="flex gap-2">
                  {roll.values.map((value, idx) => (
                    <span 
                      key={idx} 
                      className="w-8 h-8 flex items-center justify-center bg-primary text-primary-foreground rounded-md font-bold"
                    >
                      {value}
                    </span>
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {formatTime(roll.timestamp)}
                </span>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default RollHistory;
