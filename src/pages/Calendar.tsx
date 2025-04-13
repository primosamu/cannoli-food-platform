
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarIcon, Plus, Filter } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { CampaignType } from "@/types/campaign";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { DateRange } from "react-day-picker";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { useLanguage } from "@/contexts/LanguageContext";

const CalendarPage = () => {
  const { translations } = useLanguage();
  
  // Sample campaign events
  const campaignEvents = [
    {
      id: "1",
      title: "Promoção de Verão",
      type: "email" as CampaignType,
      date: new Date(2025, 3, 15), // April 15, 2025
      content: "20% de desconto nos pratos de verão"
    },
    {
      id: "2",
      title: "Especial de Fim de Semana",
      type: "whatsapp" as CampaignType,
      date: new Date(2025, 3, 20), // April 20, 2025
      content: "Sobremesa grátis com pedidos no fim de semana"
    },
    {
      id: "3",
      title: "Lançamento do Novo Menu",
      type: "paid" as CampaignType,
      date: new Date(2025, 3, 25), // April 25, 2025
      content: "Experimente nossos novos pratos!"
    }
  ];

  // State for filtering campaigns by type
  const [visibleCampaignTypes, setVisibleCampaignTypes] = useState<CampaignType[]>(["whatsapp", "sms", "email", "paid"]);
  
  // Date range for calendar view
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2025, 3, 1), // April 1, 2025
    to: new Date(2025, 3, 30)   // April 30, 2025
  });

  // Days of the week
  const days = [
    translations.mon,
    translations.tue,
    translations.wed,
    translations.thu,
    translations.fri,
    translations.sat,
    translations.sun
  ];
  
  // Function to get campaign events for a specific day
  const getCampaignsForDay = (day: number) => {
    return campaignEvents.filter(event => {
      const eventDay = event.date.getDate();
      return eventDay === day && visibleCampaignTypes.includes(event.type);
    });
  };

  // Function to get campaign color class
  const getCampaignColorClass = (type: CampaignType) => {
    switch (type) {
      case "email":
        return "bg-orange-100 text-orange-800";
      case "whatsapp":
        return "bg-green-100 text-green-800";
      case "sms":
        return "bg-blue-100 text-blue-800";
      case "paid":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Toggle campaign type filter
  const toggleCampaignTypeFilter = (value: CampaignType[]) => {
    setVisibleCampaignTypes(value);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">{translations.calendarManagement}</h2>
          <p className="text-muted-foreground">
            {translations.scheduleAndManageEvents}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <CalendarIcon className="mr-2 h-4 w-4" /> {translations.today}
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> {translations.addEvent}
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="md:w-1/4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{translations.dateRange}</CardTitle>
            </CardHeader>
            <CardContent>
              <DatePickerWithRange date={date} setDate={setDate} />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>{translations.filterCampaigns}</CardTitle>
            </CardHeader>
            <CardContent>
              <ToggleGroup 
                type="multiple" 
                defaultValue={["whatsapp", "sms", "email", "paid"]} 
                onValueChange={toggleCampaignTypeFilter}
                className="flex flex-col gap-2"
              >
                <ToggleGroupItem value="whatsapp" className="justify-start">
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div> WhatsApp
                </ToggleGroupItem>
                <ToggleGroupItem value="sms" className="justify-start">
                  <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div> SMS
                </ToggleGroupItem>
                <ToggleGroupItem value="email" className="justify-start">
                  <div className="w-3 h-3 rounded-full bg-orange-500 mr-2"></div> Email
                </ToggleGroupItem>
                <ToggleGroupItem value="paid" className="justify-start">
                  <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div> Anúncios Pagos
                </ToggleGroupItem>
              </ToggleGroup>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>{translations.upcomingCampaigns}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {campaignEvents.map((event) => (
                <div 
                  key={event.id} 
                  className={`p-2 rounded text-sm ${getCampaignColorClass(event.type)}`}
                >
                  <div className="font-medium">{event.title}</div>
                  <div className="text-xs">{event.date.toLocaleDateString()}</div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <Card className="md:w-3/4">
          <CardHeader>
            <CardTitle>{translations.april} 2025</CardTitle>
            <CardDescription>
              {translations.manageYourSchedule}
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
                  {/* Show campaign events for this day */}
                  {getCampaignsForDay(day).map((event) => (
                    <div 
                      key={event.id}
                      className={`mt-1 p-1 text-xs rounded ${getCampaignColorClass(event.type)}`}
                    >
                      {event.title}
                    </div>
                  ))}
                  {day === 15 && (
                    <div className="mt-1 p-1 text-xs bg-gray-100 text-gray-800 rounded">
                      {translations.staffMeeting} (10:00 AM)
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
    </div>
  );
};

export default CalendarPage;
