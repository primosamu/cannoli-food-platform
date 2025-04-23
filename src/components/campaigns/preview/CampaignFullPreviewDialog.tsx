
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import CampaignPreviewBody from "./CampaignPreviewBody";
import { CampaignType } from "@/types/campaign";

interface CampaignFullPreviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  content: string;
  type: CampaignType;
  subject?: string;
  imageUrl?: string;
}

const CampaignFullPreviewDialog: React.FC<CampaignFullPreviewDialogProps> = ({
  open,
  onOpenChange,
  content,
  type,
  subject,
  imageUrl,
}) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="max-w-2xl w-full">
      <DialogHeader>
        <DialogTitle>Pré-visualização Completa</DialogTitle>
        <DialogDescription>Veja como seu cliente receberá esta campanha.</DialogDescription>
      </DialogHeader>
      <div className="py-4 px-2 max-h-[75vh] overflow-auto">
        <CampaignPreviewBody
          content={content}
          type={type}
          subject={subject}
          imageUrl={imageUrl}
          isFull={true}
        />
      </div>
    </DialogContent>
  </Dialog>
);

export default CampaignFullPreviewDialog;
