
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import {
  Wand2,
  Upload,
  RotateCw,
  Image as ImageIcon,
  SunMedium,
  Contrast,
  Palette,
  Sparkles,
  SaveIcon,
  MinusCircle,
  PlusCircle,
  Filter
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ImageOptimizerProps {
  onImageOptimized?: (imageUrl: string) => void;
}

const ImageOptimizer: React.FC<ImageOptimizerProps> = ({ onImageOptimized }) => {
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");
  const [brightness, setBrightness] = useState([100]);
  const [contrast, setContrast] = useState([100]);
  const [saturation, setSaturation] = useState([100]);
  const [sharpness, setSharpness] = useState([0]);
  const [hue, setHue] = useState([0]);
  const [currentFilter, setCurrentFilter] = useState("none");
  const [hasImage, setHasImage] = useState(false);
  
  const { toast } = useToast();
  
  const filters = [
    { id: "none", name: "Normal", className: "" },
    { id: "vivid", name: "Vivid", className: "brightness-110 saturate-125" },
    { id: "warm", name: "Warm", className: "brightness-105 saturate-110 sepia-30" },
    { id: "cool", name: "Cool", className: "brightness-100 saturate-90 hue-rotate-15" },
    { id: "bw", name: "B&W", className: "grayscale" },
    { id: "vintage", name: "Vintage", className: "sepia-50 contrast-75 brightness-90" }
  ];

  const presets = [
    { 
      name: "Vivid Food", 
      description: "Makes food photos pop",
      values: {
        brightness: 110,
        contrast: 115,
        saturation: 125,
        sharpness: 20,
        hue: 0,
        filter: "vivid"
      }
    },
    { 
      name: "Menu Ready", 
      description: "Perfect for menu photos",
      values: {
        brightness: 105,
        contrast: 110,
        saturation: 115,
        sharpness: 15,
        hue: 5,
        filter: "warm"
      }
    },
    { 
      name: "Professional", 
      description: "Clean, professional look",
      values: {
        brightness: 100,
        contrast: 105,
        saturation: 100,
        sharpness: 10,
        hue: 0,
        filter: "none"
      }
    },
  ];
  
  const handleOptimizeWithAI = () => {
    setIsOptimizing(true);
    
    toast({
      title: "Otimizando imagem",
      description: "Sua imagem está sendo otimizada com IA...",
    });
    
    // Simulate AI processing
    setTimeout(() => {
      // Set some "optimized" values based on food photography best practices
      setBrightness([110]);
      setContrast([115]);
      setSaturation([120]);
      setSharpness([15]);
      setCurrentFilter("vivid");
      
      setIsOptimizing(false);
      setHasImage(true);
      
      toast({
        title: "Imagem otimizada",
        description: "Sua imagem foi otimizada com sucesso",
      });
      
      if (onImageOptimized) {
        onImageOptimized("optimized-image.jpg");
      }
    }, 2000);
  };

  const handleUploadClick = () => {
    // Simulate file upload
    toast({
      title: "Upload completo",
      description: "Sua imagem foi carregada com sucesso",
    });
    setHasImage(true);
  };
  
  const handlePresetSelect = (preset: typeof presets[0]) => {
    setBrightness([preset.values.brightness]);
    setContrast([preset.values.contrast]);
    setSaturation([preset.values.saturation]);
    setSharpness([preset.values.sharpness]);
    setHue([preset.values.hue]);
    setCurrentFilter(preset.values.filter);
    
    toast({
      title: `Preset ${preset.name} aplicado`,
      description: preset.description,
    });
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Otimizador de Imagem</h3>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleUploadClick}>
              <Upload className="h-4 w-4 mr-1" /> Enviar
            </Button>
            <Button variant="ghost" size="sm" onClick={() => {
              if (hasImage) {
                setHasImage(false);
                setBrightness([100]);
                setContrast([100]);
                setSaturation([100]);
                setSharpness([0]);
                setHue([0]);
                setCurrentFilter("none");
              }
            }}>
              <MinusCircle className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6 pt-0">
        {/* Preview area with filter class applied */}
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
              <p>Carregue uma imagem para começar</p>
            </div>
          )}
          
          {hasImage && (
            <Badge className="absolute top-2 left-2 bg-background/80 text-foreground">
              {filters.find(f => f.id === currentFilter)?.name || "Normal"}
            </Badge>
          )}
        </div>
        
        {hasImage && (
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full grid grid-cols-3">
              <TabsTrigger value="basic">
                <SunMedium className="h-4 w-4 mr-2" />
                Básico
              </TabsTrigger>
              <TabsTrigger value="filters">
                <Filter className="h-4 w-4 mr-2" />
                Filtros
              </TabsTrigger>
              <TabsTrigger value="presets">
                <Sparkles className="h-4 w-4 mr-2" />
                Presets
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="basic" className="space-y-4 mt-4">
              <div className="space-y-3">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <SunMedium className="h-4 w-4 text-primary" />
                      <Label htmlFor="brightness">Brilho</Label>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-6 w-6 p-0" 
                        onClick={() => setBrightness([Math.max(0, brightness[0] - 5)])}
                      >
                        <MinusCircle className="h-3 w-3" />
                      </Button>
                      <span className="text-sm w-8 text-center">{brightness[0]}%</span>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-6 w-6 p-0" 
                        onClick={() => setBrightness([Math.min(200, brightness[0] + 5)])}
                      >
                        <PlusCircle className="h-3 w-3" />
                      </Button>
                    </div>
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
                      <Label htmlFor="contrast">Contraste</Label>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="h-6 w-6 p-0" 
                        onClick={() => setContrast([Math.max(0, contrast[0] - 5)])}
                      >
                        <MinusCircle className="h-3 w-3" />
                      </Button>
                      <span className="text-sm w-8 text-center">{contrast[0]}%</span>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-6 w-6 p-0" 
                        onClick={() => setContrast([Math.min(200, contrast[0] + 5)])}
                      >
                        <PlusCircle className="h-3 w-3" />
                      </Button>
                    </div>
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
                      <Label htmlFor="saturation">Saturação</Label>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-6 w-6 p-0" 
                        onClick={() => setSaturation([Math.max(0, saturation[0] - 5)])}
                      >
                        <MinusCircle className="h-3 w-3" />
                      </Button>
                      <span className="text-sm w-8 text-center">{saturation[0]}%</span>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-6 w-6 p-0" 
                        onClick={() => setSaturation([Math.min(200, saturation[0] + 5)])}
                      >
                        <PlusCircle className="h-3 w-3" />
                      </Button>
                    </div>
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
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Filter className="h-4 w-4 text-primary" />
                      <Label htmlFor="sharpness">Nitidez</Label>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-6 w-6 p-0" 
                        onClick={() => setSharpness([Math.max(0, sharpness[0] - 5)])}
                      >
                        <MinusCircle className="h-3 w-3" />
                      </Button>
                      <span className="text-sm w-8 text-center">{sharpness[0]}%</span>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-6 w-6 p-0" 
                        onClick={() => setSharpness([Math.min(100, sharpness[0] + 5)])}
                      >
                        <PlusCircle className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <Slider 
                    id="sharpness" 
                    min={0} 
                    max={100} 
                    step={1} 
                    value={sharpness} 
                    onValueChange={setSharpness} 
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
            
            <TabsContent value="presets" className="space-y-4 mt-4">
              <div className="space-y-2">
                {presets.map((preset, index) => (
                  <div 
                    key={index}
                    onClick={() => handlePresetSelect(preset)}
                    className="flex justify-between items-center p-3 rounded-md hover:bg-muted cursor-pointer"
                  >
                    <div>
                      <h4 className="font-medium">{preset.name}</h4>
                      <p className="text-xs text-muted-foreground">{preset.description}</p>
                    </div>
                    <Button size="sm" variant="ghost" className="flex-shrink-0">
                      Apply
                    </Button>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        )}
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4 pb-4">
        <Button 
          variant="outline" 
          onClick={() => {
            setBrightness([100]);
            setContrast([100]);
            setSaturation([100]);
            setSharpness([0]);
            setHue([0]);
            setCurrentFilter("none");
          }}
          disabled={!hasImage}
        >
          <RotateCw className="mr-2 h-4 w-4" /> Redefinir
        </Button>
        <div className="flex gap-2">
          <Button 
            variant="outline"
            disabled={!hasImage}
            onClick={() => {
              toast({
                title: "Imagem salva",
                description: "Sua imagem foi salva com sucesso",
              });
            }}
          >
            <SaveIcon className="mr-2 h-4 w-4" /> Salvar
          </Button>
          <Button 
            onClick={handleOptimizeWithAI} 
            disabled={isOptimizing}
            className="relative overflow-hidden"
          >
            {isOptimizing ? (
              <>
                <span className="animate-spin mr-2">⌛</span> Otimizando...
              </>
            ) : (
              <>
                <Wand2 className="mr-2 h-4 w-4" /> Otimizar com IA
                <div className="absolute top-0 right-0 h-full w-12 bg-gradient-to-l from-primary/10 to-transparent" />
              </>
            )}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

// Add the utility function for classes
function cn(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

export default ImageOptimizer;
