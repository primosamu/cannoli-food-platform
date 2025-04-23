
import React from "react";
import { Button } from "@/components/ui/button";
import { Translations } from "@/types/language";

interface ContinueButtonProps {
  onClick: (settings?: any) => void;  // Accept optional settings parameter
  translations: Translations;
  settings?: any; // Optional settings object to pass to onClick
}

const ContinueButton: React.FC<ContinueButtonProps> = ({ onClick, translations, settings }) => {
  return (
    <div className="flex justify-end">
      <Button 
        size="lg"
        onClick={() => onClick(settings)}  // Pass settings to onClick function
      >
        {translations.continueToCampaign || "Continue to Campaign Creation"}
      </Button>
    </div>
  );
};

export default ContinueButton;
