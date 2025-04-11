
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarIcon, Plus } from "lucide-react";

const CalendarPage = () => {
  // Creating a grid for the calendar
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const hours = Array.from({ length: 12 }, (_, i) => i + 9); // 9AM to 8PM

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Calendar</h2>
          <p className="text-muted-foreground">
            Schedule and manage your restaurant events and reservations.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <CalendarIcon className="mr-2 h-4 w-4" /> Today
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add Event
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>April 2025</CardTitle>
          <CardDescription>
            Manage your schedule, events, and reservations.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Week day headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {days.map((day) => (
              <div key={day} className="text-center font-medium py-2">
                {day}
              </div>
            ))}
          </div>
          
          {/* Calendar days */}
          <div className="grid grid-cols-7 gap-1">
            {/* Previous month days (greyed out) */}
            {[29, 30, 31].map((day) => (
              <div key={`prev-${day}`} className="p-2 min-h-[100px] border rounded bg-gray-50 text-gray-400">
                {day}
              </div>
            ))}
            
            {/* Current month days */}
            {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => (
              <div key={day} className="p-2 min-h-[100px] border rounded hover:bg-gray-50 transition-colors">
                <div className="font-medium">{day}</div>
                {day === 15 && (
                  <div className="mt-1 p-1 text-xs bg-cannoli-100 text-cannoli-800 rounded">
                    Staff Meeting (10:00 AM)
                  </div>
                )}
              </div>
            ))}
            
            {/* Next month days (greyed out) */}
            {[1, 2, 3, 4].map((day) => (
              <div key={`next-${day}`} className="p-2 min-h-[100px] border rounded bg-gray-50 text-gray-400">
                {day}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CalendarPage;
