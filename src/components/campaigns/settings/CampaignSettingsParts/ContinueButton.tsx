
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRightCircle } from "lucide-react";

interface ContinueButtonProps {
  onClick: () => void;
  translations: any;
}

const ContinueButton: React.FC<ContinueButtonProps> = ({ onClick, translations }) => (
  <div className="flex justify-end">
    <Button onClick={onClick} className="flex items-center gap-2">
      {translations.continueToCampaign || "Continue to Campaign Editor"}
      <ArrowRightCircle className="h-4 w-4" />
    </Button>
  </div>
);

export default ContinueButton;
