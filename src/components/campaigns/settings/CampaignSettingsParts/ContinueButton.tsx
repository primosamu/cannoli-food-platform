
import React from "react";
import { Button } from "@/components/ui/button";
import { Translations } from "@/types/language";

interface ContinueButtonProps {
  onClick: (settings: any) => void;
  translations: Translations;
  settings?: any; // Add a settings prop to receive from parent
}

const ContinueButton: React.FC<ContinueButtonProps> = ({ onClick, translations, settings = {} }) => {
  return (
    <div className="flex justify-end">
      <Button 
        size="lg"
        onClick={() => onClick(settings)} // Pass the settings to the onClick handler
      >
        {translations.continueToCampaign || "Continue to Campaign Creation"}
      </Button>
    </div>
  );
};

export default ContinueButton;
