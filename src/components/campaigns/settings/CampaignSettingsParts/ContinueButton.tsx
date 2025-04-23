
import React from "react";
import { Button } from "@/components/ui/button";
import { Translations } from "@/types/language";

interface ContinueButtonProps {
  onClick: () => void;  // Simplified to a simple function with no parameters
  translations: Translations;
}

const ContinueButton: React.FC<ContinueButtonProps> = ({ onClick, translations }) => {
  return (
    <div className="flex justify-end">
      <Button 
        size="lg"
        onClick={onClick}  // Direct function call with no parameters
      >
        {translations.continueToCampaign || "Continue to Campaign Creation"}
      </Button>
    </div>
  );
};

export default ContinueButton;
