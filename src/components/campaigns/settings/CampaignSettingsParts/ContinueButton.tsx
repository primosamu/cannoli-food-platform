
import React from "react";
import { Button } from "@/components/ui/button";
import { Translations } from "@/types/language";

interface ContinueButtonProps {
  onClick: (settings?: any) => void;  // Modified to accept an optional settings parameter
  translations: Translations;
}

const ContinueButton: React.FC<ContinueButtonProps> = ({ onClick, translations }) => {
  return (
    <div className="flex justify-end">
      <Button 
        size="lg"
        onClick={() => onClick()}  // Call onClick with no arguments
      >
        {translations.continueToCampaign || "Continue to Campaign Creation"}
      </Button>
    </div>
  );
};

export default ContinueButton;
