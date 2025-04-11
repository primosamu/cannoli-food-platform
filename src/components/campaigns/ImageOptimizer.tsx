
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Wand2, Upload, RotateCw } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface ImageOptimizerProps {
  onImageOptimized?: (imageUrl: string) => void;
}

const ImageOptimizer: React.FC<ImageOptimizerProps> = ({ onImageOptimized }) => {
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [brightness, setBrightness] = useState([100]);
  const [contrast, setContrast] = useState([100]);
  const [saturation, setSaturation] = useState([100]);
  
  const { toast } = useToast();
  
  const handleOptimizeWithAI = () => {
    setIsOptimizing(true);
    
    toast({
      title: "Otimizando imagem",
      description: "Sua imagem está sendo otimizada com IA...",
    });
    
    // Simulate AI processing
    setTimeout(() => {
      // Set some random "optimized" values
      setBrightness([110]);
      setContrast([105]);
      setSaturation([115]);
      
      setIsOptimizing(false);
      
      toast({
        title: "Imagem otimizada",
        description: "Sua imagem foi otimizada com sucesso",
      });
      
      if (onImageOptimized) {
        onImageOptimized("optimized-image.jpg");
      }
    }, 2000);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Otimizador de Imagem</h3>
          <Button variant="ghost" size="sm">
            <Upload className="h-4 w-4 mr-1" /> Enviar imagem
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="w-full h-48 rounded-md bg-gray-200 flex items-center justify-center">
          <p className="text-muted-foreground">Prévia da imagem</p>
        </div>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="brightness">Brilho</Label>
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
              <Label htmlFor="contrast">Contraste</Label>
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
              <Label htmlFor="saturation">Saturação</Label>
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
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={() => {
            setBrightness([100]);
            setContrast([100]);
            setSaturation([100]);
          }}
        >
          <RotateCw className="mr-2 h-4 w-4" /> Redefinir
        </Button>
        <Button onClick={handleOptimizeWithAI} disabled={isOptimizing}>
          {isOptimizing ? (
            <>
              <span className="animate-spin mr-2">⌛</span> Otimizando...
            </>
          ) : (
            <>
              <Wand2 className="mr-2 h-4 w-4" /> Otimizar com IA
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ImageOptimizer;
