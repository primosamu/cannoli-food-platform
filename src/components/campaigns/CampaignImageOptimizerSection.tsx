
import React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, Image as ImageIcon, RotateCw, Wand2, Palette, SunMedium, Contrast } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import type { ImageOptimizerTranslations } from "@/types/language/image-optimizer";

interface CampaignImageOptimizerSectionProps {
  show: boolean;
  onClose: () => void;
  translations: ImageOptimizerTranslations;
  hasImage: boolean;
  setHasImage: (v: boolean) => void;
  brightness: number[];
  setBrightness: (v: number[]) => void;
  contrast: number[];
  setContrast: (v: number[]) => void;
  saturation: number[];
  setSaturation: (v: number[]) => void;
  sharpness: number[];
  setSharpness: (v: number[]) => void;
  currentFilter: string;
  setCurrentFilter: (v: string) => void;
  activeImageTab: string;
  setActiveImageTab: (v: string) => void;
  isOptimizing: boolean;
  handleOptimizeWithAI: () => void;
  handleUploadClick: () => void;
}

const filters = [
  { id: "none", name: "Normal", className: "" },
  { id: "vivid", name: "Vivid", className: "brightness-110 saturate-125" },
  { id: "warm", name: "Warm", className: "brightness-105 saturate-110 sepia-30" },
  { id: "cool", name: "Cool", className: "brightness-100 saturate-90 hue-rotate-15" },
  { id: "bw", name: "B&W", className: "grayscale" },
  { id: "vintage", name: "Vintage", className: "sepia-50 contrast-75 brightness-90" }
];

function cn(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

const CampaignImageOptimizerSection: React.FC<CampaignImageOptimizerSectionProps> = ({
  show,
  onClose,
  translations,
  hasImage,
  setHasImage,
  brightness,
  setBrightness,
  contrast,
  setContrast,
  saturation,
  setSaturation,
  sharpness,
  setSharpness,
  currentFilter,
  setCurrentFilter,
  activeImageTab,
  setActiveImageTab,
  isOptimizing,
  handleOptimizeWithAI,
  handleUploadClick,
}) => {
  if (!show) return null;
  return (
    <div className="border border-border rounded-md p-4 space-y-4 bg-background relative z-10">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">{translations.imageOptimizer}</h3>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleUploadClick}>
            <Upload className="h-4 w-4 mr-1" /> {translations.upload}
          </Button>
          <Button variant="ghost" size="sm" onClick={onClose}>
            Fechar
          </Button>
        </div>
      </div>
      <div className={cn(
        "relative w-full h-48 rounded-md overflow-hidden bg-gray-100 flex items-center justify-center transition-all",
        hasImage ? filters.find(f => f.id === currentFilter)?.className : ""
      )}>
        {hasImage ? (
          <div className="absolute inset-0 bg-gradient-to-r from-amber-100/30 to-orange-200/30 flex items-center justify-center">
            <div className="w-full h-full bg-[url('/placeholder.svg')] bg-cover bg-center opacity-90" />
          </div>
        ) : (
          <div className="flex flex-col items-center text-muted-foreground">
            <ImageIcon className="h-8 w-8 mb-2" />
            <p>{translations.uploadImage}</p>
          </div>
        )}
      </div>
      {hasImage && (
        <Tabs value={activeImageTab} onValueChange={setActiveImageTab} className="w-full">
          <TabsList className="w-full grid grid-cols-2">
            <TabsTrigger value="basic">
              <SunMedium className="h-4 w-4 mr-2" />
              {translations.basic}
            </TabsTrigger>
            <TabsTrigger value="filters">
              <Palette className="h-4 w-4 mr-2" />
              {translations.filters}
            </TabsTrigger>
          </TabsList>
          <TabsContent value="basic" className="space-y-4 mt-4">
            <div className="space-y-3">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <SunMedium className="h-4 w-4 text-primary" />
                    <Label htmlFor="brightness">{translations.brightness}</Label>
                  </div>
                  <span className="text-sm">{brightness[0]}%</span>
                </div>
                <Slider 
                  id="brightness" 
                  min={0} 
                  max={200} 
                  step={1} 
                  value={brightness} 
                  onValueChange={setBrightness} 
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Contrast className="h-4 w-4 text-primary" />
                    <Label htmlFor="contrast">{translations.contrast}</Label>
                  </div>
                  <span className="text-sm">{contrast[0]}%</span>
                </div>
                <Slider 
                  id="contrast" 
                  min={0} 
                  max={200} 
                  step={1} 
                  value={contrast} 
                  onValueChange={setContrast} 
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Palette className="h-4 w-4 text-primary" />
                    <Label htmlFor="saturation">{translations.saturation}</Label>
                  </div>
                  <span className="text-sm">{saturation[0]}%</span>
                </div>
                <Slider 
                  id="saturation" 
                  min={0} 
                  max={200} 
                  step={1} 
                  value={saturation} 
                  onValueChange={setSaturation} 
                />
              </div>
            </div>
          </TabsContent>
          <TabsContent value="filters" className="space-y-4 mt-4">
            <div className="grid grid-cols-3 gap-2">
              {filters.map(filter => (
                <div 
                  key={filter.id}
                  onClick={() => setCurrentFilter(filter.id)}
                  className={cn(
                    "relative cursor-pointer h-20 rounded-md overflow-hidden bg-muted flex items-center justify-center border-2",
                    currentFilter === filter.id ? "border-primary" : "border-transparent",
                    filter.className
                  )}
                >
                  <div className="absolute inset-0 bg-[url('/placeholder.svg')] bg-cover bg-center opacity-60" />
                  <span className="relative z-10 text-xs font-medium bg-background/60 px-2 py-1 rounded">
                    {filter.name}
                  </span>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      )}
      <div className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={() => {
            setBrightness([100]);
            setContrast([100]);
            setSaturation([100]);
            setSharpness([0]);
            setCurrentFilter("none");
          }}
          disabled={!hasImage}
        >
          <RotateCw className="mr-2 h-4 w-4" /> {translations.reset}
        </Button>
        <Button 
          onClick={handleOptimizeWithAI} 
          disabled={isOptimizing}
        >
          {isOptimizing ? (
            <>
              <span className="animate-spin mr-2">⌛</span> {translations.optimizing}
            </>
          ) : (
            <>
              <Wand2 className="mr-2 h-4 w-4" /> {translations.optimizeWithAI}
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default CampaignImageOptimizerSection;
