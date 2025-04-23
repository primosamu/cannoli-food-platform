
import React, { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { CampaignType } from "@/types/campaign";
import CampaignPreviewHeader from "./preview/CampaignPreviewHeader";
import CampaignPreviewBody from "./preview/CampaignPreviewBody";
import CampaignFullPreviewDialog from "./preview/CampaignFullPreviewDialog";
import { Button } from "@/components/ui/button";
import { Eye, Play } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Fallback imagens fictícias para ilustrar as prévias
const fallbackImages: Record<CampaignType, string> = {
  whatsapp: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=500&q=80",
  sms: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=500&q=80",
  email: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=500&q=80",
  paid: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=500&q=80",
  rcs: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=500&q=80",
};

interface CampaignPreviewProps {
  content: string;
  type: CampaignType;
  subject?: string;
  imageUrl?: string;
  platform?: string;
}

const CampaignPreview: React.FC<CampaignPreviewProps> = ({
  content,
  type,
  subject,
  imageUrl,
  platform = "facebook",
}) => {
  const [showFullPreview, setShowFullPreview] = useState(false);
  const { toast } = useToast();

  // Substituição para prévia
  const previewContent = content
    .replace(/\{\{name\}\}/g, "Cliente")
    .replace(/\{\{restaurant\}\}/g, "Seu Restaurante")
    .replace(/\{\{discount\}\}/g, "10%")
    .replace(/\{\{code\}\}/g, "PROMO10")
    .replace(/\{\{date\}\}/g, "30/04/2025")
    .replace(/\{\{time\}\}/g, "19h");

  // Use imagem fictícia se não fornecida
  const imgToShow = imageUrl || fallbackImages[type];

  const handleActivateTest = () => {
    toast({
      title: "Teste enviado",
      description: "A campanha de teste foi enviada para o seu contato de teste.",
      duration: 4000,
    });
  };

  return (
    <Card>
      <CampaignPreviewHeader type={type} />
      <CardContent className={cn("p-4 overflow-auto max-h-[600px] bg-white")}>
        {content ? (
          <CampaignPreviewBody
            content={previewContent}
            type={type}
            subject={subject}
            imageUrl={imgToShow}
          />
        ) : (
          <div className="text-center p-8 text-muted-foreground">
            Crie sua campanha para ver o preview aqui
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between pt-4 border-t">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowFullPreview(true)}
          className="flex items-center gap-2"
        >
          <Eye className="w-4 h-4" />
          Visualizar Completo
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={handleActivateTest}
          className="flex items-center gap-2"
        >
          <Play className="w-4 h-4" />
          Ativar Teste
        </Button>
      </CardFooter>
      <CampaignFullPreviewDialog
        open={showFullPreview}
        onOpenChange={setShowFullPreview}
        content={previewContent}
        type={type}
        subject={subject}
        imageUrl={imgToShow}
      />
    </Card>
  );
};

export default CampaignPreview;
