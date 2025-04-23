
import React from "react";
import { Button } from "@/components/ui/button";
import { Translations } from "@/types/language";

interface ContinueButtonProps {
  onClick: (settings?: any) => void;
  translations: Translations;
}

const ContinueButton: React.FC<ContinueButtonProps> = ({ onClick, translations }) => {
  return (
    <div className="flex justify-end">
      <Button 
        size="lg"
        onClick={() => onClick()} // Pass empty object if no settings are provided
      >
        {translations.continueToCampaign || "Continue to Campaign Creation"}
      </Button>
    </div>
  );
};

export default ContinueButton;
