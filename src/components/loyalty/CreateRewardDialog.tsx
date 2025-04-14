
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar as CalendarIcon, Award, Upload, ImageIcon } from "lucide-react";
import { DatePicker } from "@/components/ui/date-picker";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface CreateRewardDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateRewardDialog: React.FC<CreateRewardDialogProps> = ({
  isOpen,
  onClose,
}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [pointCost, setPointCost] = useState(100);
  const [category, setCategory] = useState<string>("discount");
  const [limitedTime, setLimitedTime] = useState(false);
  const [expiryDate, setExpiryDate] = useState<Date | undefined>(undefined);
  const [limitedQuantity, setLimitedQuantity] = useState(false);
  const [availableQuantity, setAvailableQuantity] = useState(100);
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  const handleSubmit = () => {
    if (!name || !description) {
      toast.error("Por favor, preencha pelo menos o nome e a descrição da recompensa.");
      return;
    }
    
    const newReward = {
      id: `reward_${Date.now()}`,
      name,
      description,
      pointCost,
      active: true,
      category,
      limitedTime,
      expiryDate: limitedTime ? expiryDate : undefined,
      redemptionCount: 0,
      availableQuantity: limitedQuantity ? availableQuantity : undefined,
      imageUrl
    };
    
    console.log("Nova recompensa:", newReward);
    toast.success(`Recompensa "${name}" criada com sucesso!`);
    onClose();
    resetForm();
  };
  
  const resetForm = () => {
    setName("");
    setDescription("");
    setPointCost(100);
    setCategory("discount");
    setLimitedTime(false);
    setExpiryDate(undefined);
    setLimitedQuantity(false);
    setAvailableQuantity(100);
    setImageUrl(undefined);
    setImagePreview(null);
  };
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setImagePreview(result);
      setImageUrl("/placeholder.svg"); // Normalmente seria o URL após upload para o servidor
    };
    reader.readAsDataURL(file);
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Criar Nova Recompensa</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="reward-name">Nome da Recompensa</Label>
              <Input
                id="reward-name"
                placeholder="Ex: Sobremesa Grátis"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor="reward-description">Descrição</Label>
              <Textarea
                id="reward-description"
                placeholder="Descreva a recompensa em detalhes..."
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor="reward-points">Custo em Pontos</Label>
              <Input
                id="reward-points"
                type="number"
                min="1"
                value={pointCost}
                onChange={(e) => setPointCost(parseInt(e.target.value) || 0)}
              />
            </div>
            
            <div>
              <Label htmlFor="reward-category">Categoria</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="discount">Desconto</SelectItem>
                  <SelectItem value="freebie">Brinde</SelectItem>
                  <SelectItem value="exclusive">Exclusivo</SelectItem>
                  <SelectItem value="experience">Experiência</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="limited-time">Tempo Limitado</Label>
              <Switch
                id="limited-time"
                checked={limitedTime}
                onCheckedChange={setLimitedTime}
              />
            </div>
            
            {limitedTime && (
              <div>
                <Label htmlFor="expiry-date">Data de Expiração</Label>
                <div className="mt-1">
                  <DatePicker 
                    date={expiryDate} 
                    setDate={setExpiryDate} 
                    disabled={(date) => date < new Date()}
                  />
                </div>
              </div>
            )}
            
            <div className="flex items-center justify-between">
              <Label htmlFor="limited-quantity">Quantidade Limitada</Label>
              <Switch
                id="limited-quantity"
                checked={limitedQuantity}
                onCheckedChange={setLimitedQuantity}
              />
            </div>
            
            {limitedQuantity && (
              <div>
                <Label htmlFor="available-quantity">Quantidade Disponível</Label>
                <Input
                  id="available-quantity"
                  type="number"
                  min="1"
                  value={availableQuantity}
                  onChange={(e) => setAvailableQuantity(parseInt(e.target.value) || 0)}
                />
              </div>
            )}
            
            <div>
              <Label htmlFor="reward-image">Imagem da Recompensa</Label>
              <div className="mt-1">
                <div className="flex items-center gap-4">
                  <div 
                    className={cn(
                      "border rounded-md h-24 w-24 flex items-center justify-center overflow-hidden",
                      !imagePreview && "bg-muted"
                    )}
                  >
                    {imagePreview ? (
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        className="h-full w-full object-cover" 
                      />
                    ) : (
                      <ImageIcon className="h-8 w-8 text-muted-foreground" />
                    )}
                  </div>
                  <div>
                    <Label htmlFor="image-upload" className="cursor-pointer">
                      <div className="flex items-center gap-2 border rounded-md px-4 py-2 bg-muted/30 hover:bg-muted/50">
                        <Upload className="h-4 w-4" />
                        <span>Carregar imagem</span>
                      </div>
                    </Label>
                    <Input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Formatos: JPG, PNG. Tamanho máx. 2MB
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <DialogFooter className="pt-4">
          <Button variant="outline" onClick={() => {
            onClose();
            resetForm();
          }}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit}>
            <Award className="h-4 w-4 mr-2" />
            Criar Recompensa
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
