
import React from 'react';
import { Button } from "@/components/ui/button";

interface CreditPackageSelectorProps {
  packageSizes: string[];
  selectedPackage: string;
  onPackageChange: (packageSize: string) => void;
}

export const CreditPackageSelector: React.FC<CreditPackageSelectorProps> = ({
  packageSizes,
  selectedPackage,
  onPackageChange
}) => {
  return (
    <div className="grid grid-cols-3 gap-3 my-4">
      {packageSizes.map((size) => (
        <Button
          key={size}
          variant={selectedPackage === size ? "default" : "outline"}
          onClick={() => onPackageChange(size)}
          className="w-full"
        >
          {size.charAt(0).toUpperCase() + size.slice(1)}
        </Button>
      ))}
    </div>
  );
};
