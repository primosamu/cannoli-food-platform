
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar as CalendarIcon, BarChart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CampaignEvent } from "@/types/campaign";
import { addDays } from "date-fns";
import { useLanguage } from "@/contexts/LanguageContext";

interface CampaignCalendarProps {
  events?: CampaignEvent[];
  onViewReport?: (campaignId: string) => void;
  onViewCampaign?: (campaignId: string) => void;
}

export const CampaignCalendar: React.FC<CampaignCalendarProps> = ({
  events = generateSampleEvents(),
  onViewReport,
  onViewCampaign
}) => {
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(new Date());
  const { translations } = useLanguage();
  
  const getEventsForSelectedDate = () => {
    if (!selectedDate) return [];
    
    return events.filter(event => {
      const eventDate = new Date(event.startDate);
      return (
        eventDate.getDate() === selectedDate.getDate() &&
        eventDate.getMonth() === selectedDate.getMonth() &&
        eventDate.getFullYear() === selectedDate.getFullYear()
      );
    });
  };
  
  const getDaysWithEvents = () => {
    const daysWithEvents: Record<string, boolean> = {};
    
    events.forEach(event => {
      const date = new Date(event.startDate);
      const dateString = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
      daysWithEvents[dateString] = true;
    });
    
    return daysWithEvents;
  };
  
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'whatsapp':
        return 'bg-green-100 text-green-800';
      case 'sms':
        return 'bg-blue-100 text-blue-800';
      case 'email':
        return 'bg-orange-100 text-orange-800';
      case 'paid':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Calendário de Campanhas</CardTitle>
        <CardDescription>
          Visualize e gerencie suas campanhas de marketing agendadas
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x">
          <div className="p-6">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border shadow"
              modifiers={{
                hasEvent: (date) => {
                  const dateString = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
                  return !!getDaysWithEvents()[dateString];
                }
              }}
              modifiersStyles={{
                hasEvent: {
                  fontWeight: "bold",
                  backgroundColor: "#ede9fe",
                  color: "#7c3aed",
                }
              }}
            />
          </div>
          <div className="p-6 md:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium flex items-center gap-2">
                <CalendarIcon className="h-4 w-4" />
                {selectedDate ? (
                  <span>
                    Eventos em {selectedDate.toLocaleDateString('pt-BR', { 
                      weekday: 'long', 
                      month: 'long', 
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </span>
                ) : (
                  <span>Selecione uma data</span>
                )}
              </h3>
            </div>
            
            <div className="space-y-4">
              {getEventsForSelectedDate().length > 0 ? (
                getEventsForSelectedDate().map((event) => (
                  <div key={event.id} className="border rounded-lg p-4 shadow-sm">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{event.title}</h4>
                        <p className="text-sm text-muted-foreground">{event.description}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge className={getTypeColor(event.type)}>
                            {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            {new Date(event.startDate).toLocaleTimeString('pt-BR', {
                              hour: 'numeric',
                              minute: '2-digit'
                            })}
                          </span>
                        </div>
                      </div>
                      <div className="space-x-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => onViewCampaign?.(event.campaignId)}
                        >
                          Visualizar
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => onViewReport?.(event.campaignId)}
                        >
                          <BarChart className="h-4 w-4 mr-1" /> Relatório
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  {selectedDate ? (
                    <p>Não há campanhas agendadas para este dia</p>
                  ) : (
                    <p>Selecione uma data para visualizar as campanhas agendadas</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Helper function to generate sample events
function generateSampleEvents(): CampaignEvent[] {
  const now = new Date();
  
  return [
    {
      id: "evt-1",
      campaignId: "camp-1",
      title: "Promoção de Fim de Semana",
      description: "Campanha de WhatsApp para promoções de fim de semana",
      startDate: addDays(now, 2),
      type: "whatsapp"
    },
    {
      id: "evt-2",
      campaignId: "camp-2",
      title: "Newsletter Mensal",
      description: "Newsletter mensal regular para todos os assinantes",
      startDate: addDays(now, 5),
      type: "email"
    },
    {
      id: "evt-3",
      campaignId: "camp-3",
      title: "Lançamento do Novo Menu",
      description: "Anuncio de nossos novos itens sazonais do menu",
      startDate: addDays(now, -2),
      type: "sms"
    },
    {
      id: "evt-4",
      campaignId: "camp-4",
      title: "Programa de Fidelidade",
      description: "Ofertas especiais para nossos clientes fiéis",
      startDate: now,
      type: "whatsapp"
    },
    {
      id: "evt-5",
      campaignId: "camp-5",
      title: "Campanha de Anúncios em Redes Sociais",
      description: "Posts promovidos no Instagram e Facebook",
      startDate: addDays(now, 3),
      type: "paid"
    }
  ];
}
