
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Mail, MessageSquare, Image } from "lucide-react";

const CampaignHelpDialog: React.FC = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          className="fixed bottom-6 right-6 rounded-full h-12 w-12 shadow-lg p-0"
        >
          <Mail className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Templates de Campanha</DialogTitle>
          <DialogDescription>
            Use nossos templates prontos para criar campanhas de marketing eficazes.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <h4 className="font-medium text-sm">Tipos de Templates Disponíveis:</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <MessageSquare className="h-4 w-4 text-green-600 mr-2" />
                Templates de WhatsApp
              </li>
              <li className="flex items-center">
                <MessageSquare className="h-4 w-4 text-blue-600 mr-2" />
                Templates de SMS
              </li>
              <li className="flex items-center">
                <Mail className="h-4 w-4 text-orange-600 mr-2" />
                Templates de Email
              </li>
              <li className="flex items-center">
                <Image className="h-4 w-4 text-purple-600 mr-2" />
                Templates de Tráfego Pago
              </li>
            </ul>
          </div>
          <p className="text-sm text-muted-foreground">
            Clique em "Campanhas Predefinidas" para selecionar rapidamente uma campanha pré-configurada para necessidades comuns de marketing.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CampaignHelpDialog;
