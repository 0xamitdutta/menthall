"use client";

import * as React from 'react';
import { Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';

// Your mock data here...
const availableTimes: { [key: string]: string[] } = {
  '2024-09-05': ['10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '05:00 PM'],
  '2024-09-06': ['09:00 AM', '04:00 PM'],
  '2024-09-09': ['10:00 AM', '11:30 AM', '01:00 PM'],
};


export const BookingSection = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date('2024-09-05'));
  const [selectedTime, setSelectedTime] = React.useState<string | undefined>();

  const dayString = date ? date.toISOString().split('T')[0] : '';
  const timesForSelectedDate = availableTimes[dayString] || [];

  React.useEffect(() => {
    setSelectedTime(undefined);
  }, [date]);

  return (
    <Card className="shadow-lg rounded-4xl border-0">
      <CardHeader>
        <CardTitle className="text-xl">Book a Session</CardTitle>
        <CardDescription>Select a date and time that works for you.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* THIS IS THE FIX: A simple wrapper to contain the Calendar */}
        <div className="flex justify-center">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
            defaultMonth={new Date('2024-09-01')}
            disabled={(d) => !availableTimes[d.toISOString().split('T')[0]]}
          />
        </div>

        {date && (
          <div className='min-w-0'>
            <div className="flex items-center gap-2 mb-4">
               <h3 className="font-semibold text-md">Available Slots</h3>
               <Badge variant="secondary">{timesForSelectedDate.length} slots</Badge>
            </div>
            {timesForSelectedDate.length > 0 ? (
               <RadioGroup
                value={selectedTime}
                onValueChange={setSelectedTime}
                className="grid grid-cols-[repeat(auto-fit,minmax(110px,1fr))] gap-3"
              >
                {timesForSelectedDate.map((time) => (
                  <div key={time}>
                    <RadioGroupItem value={time} id={time} className="sr-only" />
                    <Label
                      htmlFor={time}
                      className={`flex items-center justify-center gap-2 rounded-md border-2 p-3 font-semibold hover:border-blue-500 cursor-pointer transition-colors ${selectedTime === time ? 'border-blue-600 bg-blue-50' : 'border-gray-200'}`}
                    >
                      <Clock className="h-4 w-4" />
                      {time}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            ) : (
              <p className="text-sm text-center text-gray-500 py-4">No available slots for this date.</p>
            )}
          </div>
        )}
        <Button
            size="lg"
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-lg transition-transform hover:scale-105"
            disabled={!selectedTime}
        >
          Book for {selectedTime || '...'}
        </Button>
      </CardContent>
    </Card>
  );
};