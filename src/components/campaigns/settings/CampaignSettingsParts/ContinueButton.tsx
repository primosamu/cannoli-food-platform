
import React from "react";
import { Button } from "@/components/ui/button";
import { TranslationsType } from "@/types/language";

interface ContinueButtonProps {
  onClick: () => void;
  translations: TranslationsType;
}

const ContinueButton: React.FC<ContinueButtonProps> = ({ onClick, translations }) => {
  return (
    <div className="flex justify-end">
      <Button 
        size="lg"
        onClick={onClick}
      >
        {translations.continue || "Continue to Campaign Creation"}
      </Button>
    </div>
  );
};

export default ContinueButton;
