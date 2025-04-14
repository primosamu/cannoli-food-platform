
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Save, PlusCircle, MinusCircle } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { sampleLoyaltyMembers } from "@/data/sampleLoyaltyData";
import { toast } from "sonner";

interface ManualAdjustmentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  selectedMember?: any;
}

export const ManualAdjustmentDialog: React.FC<ManualAdjustmentDialogProps> = ({
  isOpen,
  onClose,
  selectedMember,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);
  const [adjustmentType, setAdjustmentType] = useState<"add" | "subtract">("add");
  const [points, setPoints] = useState(0);
  const [reason, setReason] = useState("");
  
  // Initialize selected member ID if one is provided
  useEffect(() => {
    if (selectedMember) {
      setSelectedMemberId(selectedMember.id);
    }
  }, [selectedMember]);
  
  const filteredMembers = sampleLoyaltyMembers.filter(member => 
    member.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.customerEmail.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const selectedMemberData = sampleLoyaltyMembers.find(member => member.id === selectedMemberId);
  
  const handleSubmit = () => {
    if (!selectedMemberId || points <= 0 || !reason) {
      toast.error("Por favor, preencha todos os campos obrigatórios.");
      return;
    }
    
    const adjustment = {
      memberId: selectedMemberId,
      memberName: selectedMemberData?.customerName,
      adjustmentType,
      points,
      reason,
      timestamp: new Date()
    };
    
    console.log("Ajuste manual:", adjustment);
    
    const pointsWithSign = adjustmentType === "add" ? points : -points;
    const action = adjustmentType === "add" ? "adicionados a" : "subtraídos de";
    
    toast.success(`${points} pontos ${action} ${selectedMemberData?.customerName}`);
    onClose();
    resetForm();
  };
  
  const resetForm = () => {
    setSearchQuery("");
    setSelectedMemberId(null);
    setAdjustmentType("add");
    setPoints(0);
    setReason("");
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="flex">
              <PlusCircle className="h-5 w-5 text-green-500" />
              <MinusCircle className="h-5 w-5 text-red-500 -ml-1" />
            </div>
            Ajuste Manual de Pontos
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label>Selecionar Membro</Label>
            <Input 
              placeholder="Buscar por nome ou e-mail..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="mb-2"
            />
            
            <div className="border rounded-md h-[180px] overflow-hidden">
              <ScrollArea className="h-full">
                {filteredMembers.length > 0 ? (
                  filteredMembers.map((member) => (
                    <div 
                      key={member.id} 
                      className={`flex items-center space-x-4 p-3 cursor-pointer hover:bg-muted transition-colors ${selectedMemberId === member.id ? 'bg-muted' : ''}`}
                      onClick={() => setSelectedMemberId(member.id)}
                    >
                      <Avatar>
                        <AvatarFallback>
                          {member.customerName.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{member.customerName}</p>
                        <p className="text-sm text-muted-foreground truncate">{member.customerEmail}</p>
                      </div>
                      <div className="text-sm font-medium">
                        {member.currentPoints} pontos
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center text-muted-foreground">
                    Nenhum membro encontrado
                  </div>
                )}
              </ScrollArea>
            </div>
          </div>
          
          {selectedMember && (
            <>
              <div>
                <Label className="mb-2 block">Tipo de Ajuste</Label>
                <RadioGroup 
                  value={adjustmentType} 
                  onValueChange={(value) => setAdjustmentType(value as "add" | "subtract")}
                  className="flex space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="add" id="add-points" />
                    <Label htmlFor="add-points">Adicionar pontos</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="subtract" id="subtract-points" />
                    <Label htmlFor="subtract-points">Subtrair pontos</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div>
                <Label htmlFor="points">Quantidade de Pontos</Label>
                <Input
                  id="points"
                  type="number"
                  min="1"
                  value={points}
                  onChange={(e) => setPoints(parseInt(e.target.value) || 0)}
                />
              </div>
              
              <div>
                <Label htmlFor="reason">Motivo</Label>
                <Select value={reason} onValueChange={setReason}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um motivo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bonus">Bônus especial</SelectItem>
                    <SelectItem value="correction">Correção de erro</SelectItem>
                    <SelectItem value="promotion">Promoção</SelectItem>
                    <SelectItem value="compensation">Compensação</SelectItem>
                    <SelectItem value="expiry_extension">Extensão de validade</SelectItem>
                    <SelectItem value="customer_service">Atendimento ao cliente</SelectItem>
                    <SelectItem value="other">Outro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {reason === "other" && (
                <div>
                  <Label htmlFor="custom-reason">Motivo Personalizado</Label>
                  <Textarea
                    id="custom-reason"
                    placeholder="Descreva o motivo do ajuste..."
                    rows={3}
                  />
                </div>
              )}
            </>
          )}
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit} disabled={!selectedMemberId || points <= 0 || !reason}>
            <Save className="h-4 w-4 mr-2" />
            Salvar Ajuste
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
