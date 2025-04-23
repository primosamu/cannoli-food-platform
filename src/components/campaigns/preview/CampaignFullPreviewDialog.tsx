
import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { CampaignType } from "@/types/campaign";
import CampaignPreviewBody from "./CampaignPreviewBody";

interface CampaignFullPreviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  content: string;
  type: CampaignType;
  subject?: string;
  imageUrl?: string;
  platform?: string;
}

const CampaignFullPreviewDialog: React.FC<CampaignFullPreviewDialogProps> = ({
  open,
  onOpenChange,
  content,
  type,
  subject,
  imageUrl,
  platform
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-screen overflow-y-auto">
        <div className="py-4">
          <CampaignPreviewBody
            content={content}
            type={type}
            subject={subject}
            imageUrl={imageUrl}
            isFull={true}
            platform={platform}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CampaignFullPreviewDialog;
