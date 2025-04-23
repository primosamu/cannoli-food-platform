
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Editor } from "@/components/ui/editor";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, Eye, Image as ImageIcon } from "lucide-react";
import CampaignPreview from "./CampaignPreview";
import CampaignFullPreviewDialog from "./preview/CampaignFullPreviewDialog";

interface CampaignContentSectionProps {
  campaignType: string;
  campaignSubject: string;
  handleSubjectChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  campaignContent: string;
  handleContentChange: (value: string) => void;
  showOptimizer: boolean;
  setShowOptimizer: (show: boolean) => void;
  translations: any;
  previewContent: string;
  showFullPreview: boolean;
  setShowFullPreview: (open: boolean) => void;
  selectedChannels: string[];
  initialTemplate?: any;
}

const CampaignContentSection: React.FC<CampaignContentSectionProps> = ({
  campaignType,
  campaignSubject,
  handleSubjectChange,
  campaignContent,
  handleContentChange,
  showOptimizer,
  setShowOptimizer,
  translations,
  previewContent,
  showFullPreview,
  setShowFullPreview,
  selectedChannels,
  initialTemplate
}) => (
  <>
    {campaignType === 'email' && (
      <div className="space-y-2">
        <Label htmlFor="subject">Assunto</Label>
        <Input 
          id="subject"
          placeholder="Assunto do Email" 
          value={campaignSubject}
          onChange={handleSubjectChange}
        />
      </div>
    )}
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label htmlFor="content">Conteúdo</Label>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setShowOptimizer(!showOptimizer)}
          >
            <ImageIcon className="h-4 w-4 mr-2" />
            {showOptimizer ? "Ocultar Otimizador" : "Otimizador de Imagem"}
          </Button>
        </div>
      </div>
      <Editor
        value={campaignContent}
        onChange={handleContentChange}
      />
    </div>
    <div>
      <CampaignPreview 
        content={previewContent}
        type={campaignType}
        subject={campaignSubject}
        platform={initialTemplate?.platform}
      />
      <div className="flex justify-between pt-4">
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
          className="flex items-center gap-2"
        >
          <Play className="w-4 h-4" />
          Enviar Teste
        </Button>
      </div>
      <CampaignFullPreviewDialog
        open={showFullPreview}
        onOpenChange={setShowFullPreview}
        content={previewContent}
        type={campaignType}
        subject={campaignSubject}
        platform={initialTemplate?.platform}
        channels={selectedChannels}
      />
    </div>
  </>
);

export default CampaignContentSection;
