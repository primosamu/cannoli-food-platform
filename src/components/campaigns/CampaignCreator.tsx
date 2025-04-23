
import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Editor } from "@/components/ui/editor";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useLanguage } from "@/contexts/LanguageContext";
import { CampaignTemplate, CampaignType } from "@/types/campaign";
import { 
  CalendarIcon, 
  MessageSquare, 
  Mail, 
  MessageSquareDashed,
  Upload,
  Image as ImageIcon,
  Wand2,
  RotateCw,
  SunMedium,
  Contrast,
  Palette,
  Eye,
  Play
} from "lucide-react";
import CampaignPreview from "./CampaignPreview";
import CampaignFullPreviewDialog from "./preview/CampaignFullPreviewDialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { ImageOptimizerTranslations } from "@/types/language/image-optimizer";

// Form schema definition
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Campaign name must be at least 2 characters.",
  }),
  type: z.enum(['whatsapp', 'sms', 'email', 'paid', 'rcs']).default('email'),
  subject: z.string().optional(),
  content: z.string().min(10, {
    message: "Content must be at least 10 characters.",
  }),
});

interface CampaignCreatorProps {
  initialTemplate?: CampaignTemplate;
  segmentName?: string;
  segmentType?: string;
  settings?: {
    selectedChannels: string[];
    audienceType: string;
    incentiveType: string;
    scheduledDate: string;
    scheduledTime: string;
    inactiveDays: string;
    selectedSegment: string;
  };
}

const CampaignCreator: React.FC<CampaignCreatorProps> = ({ 
  initialTemplate, 
  segmentName, 
  segmentType,
  settings
}) => {
  const [campaignName, setCampaignName] = useState(initialTemplate?.name || "");
  const [campaignType, setCampaignType] = useState<CampaignType>(
    settings?.selectedChannels && settings.selectedChannels.length > 0
      ? settings.selectedChannels[0] as CampaignType
      : initialTemplate?.type || "email"
  );
  const [campaignSubject, setCampaignSubject] = useState(initialTemplate?.subject || "");
  const [campaignContent, setCampaignContent] = useState(initialTemplate?.content || "");
  const [showFullPreview, setShowFullPreview] = useState(false);
  const [selectedChannels, setSelectedChannels] = useState<string[]>(
    settings?.selectedChannels || [campaignType]
  );
  
  // Image optimizer state
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [brightness, setBrightness] = useState([100]);
  const [contrast, setContrast] = useState([100]);
  const [saturation, setSaturation] = useState([100]);
  const [sharpness, setSharpness] = useState([0]);
  const [currentFilter, setCurrentFilter] = useState("none");
  const [hasImage, setHasImage] = useState(false);
  const [activeImageTab, setActiveImageTab] = useState("basic");
  const [showOptimizer, setShowOptimizer] = useState(false);
  
  const { toast } = useToast();
  const { translations } = useLanguage();

  // Create a default image optimizer translations object
  const defaultImageOptimizerTranslations: ImageOptimizerTranslations = {
    imageOptimizer: "Image Optimizer",
    upload: "Upload",
    uploadImage: "Upload an image to start",
    basic: "Basic",
    filters: "Filters",
    brightness: "Brightness",
    contrast: "Contrast",
    saturation: "Saturation",
    sharpness: "Sharpness",
    reset: "Reset",
    optimizeWithAI: "Optimize with AI",
    optimizing: "Optimizing...",
    apply: "Apply",
    normal: "Normal",
    imageOptimized: "Image optimized",
    imageOptimizedDesc: "Your image has been optimized successfully"
  };

  // Safely access image optimizer translations with fallbacks
  const imageOptimizerTranslations = {
    ...defaultImageOptimizerTranslations,
    ...(translations?.imageOptimizer || {})
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialTemplate?.name || "",
      type: campaignType,
      subject: initialTemplate?.subject || "",
      content: initialTemplate?.content || "",
    },
  });

  useEffect(() => {
    if (initialTemplate) {
      form.reset({
        name: initialTemplate.name,
        type: campaignType,
        subject: initialTemplate.subject || "",
        content: initialTemplate.content,
      });
    }
  }, [initialTemplate, campaignType, form]);
  
  useEffect(() => {
    if (settings?.selectedChannels && settings.selectedChannels.length > 0) {
      setSelectedChannels(settings.selectedChannels);
      setCampaignType(settings.selectedChannels[0] as CampaignType);
    }
  }, [settings]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    console.log("Selected Channels:", selectedChannels);
    console.log("Campaign Settings:", settings);
    toast({
      title: "Campaign created successfully!",
      description: "Your campaign has been created and is ready to send.",
    });
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCampaignName(e.target.value);
  };

  const handleTypeChange = (value: string) => {
    setCampaignType(value as CampaignType);
  };

  const handleSubjectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCampaignSubject(e.target.value);
  };

  const handleContentChange = (value: string) => {
    setCampaignContent(value);
    form.setValue("content", value);
  };

  const handleChannelToggle = (channelId: string) => {
    setSelectedChannels(prevChannels => {
      if (prevChannels.includes(channelId)) {
        // Don't remove if it's the last channel
        if (prevChannels.length === 1) {
          return prevChannels;
        }
        const newChannels = prevChannels.filter(ch => ch !== channelId);
        // Update campaign type if we're removing the current type
        if (channelId === campaignType && newChannels.length > 0) {
          setCampaignType(newChannels[0] as CampaignType);
        }
        return newChannels;
      } else {
        const newChannels = [...prevChannels, channelId];
        // If this is the first channel, set it as the campaign type
        if (newChannels.length === 1) {
          setCampaignType(channelId as CampaignType);
        }
        return newChannels;
      }
    });
  };

  const handleOptimizeWithAI = () => {
    setIsOptimizing(true);
    
    toast({
      title: imageOptimizerTranslations.optimizing,
      description: "Your image is being optimized with AI...",
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
        title: imageOptimizerTranslations.imageOptimized,
        description: imageOptimizerTranslations.imageOptimizedDesc,
      });
    }, 2000);
  };

  const handleUploadClick = () => {
    // Simulate file upload
    toast({
      title: "Upload complete",
      description: "Your image was uploaded successfully",
    });
    setHasImage(true);
  };

  const filters = [
    { id: "none", name: imageOptimizerTranslations.normal, className: "" },
    { id: "vivid", name: "Vivid", className: "brightness-110 saturate-125" },
    { id: "warm", name: "Warm", className: "brightness-105 saturate-110 sepia-30" },
    { id: "cool", name: "Cool", className: "brightness-100 saturate-90 hue-rotate-15" },
    { id: "bw", name: "B&W", className: "grayscale" },
    { id: "vintage", name: "Vintage", className: "sepia-50 contrast-75 brightness-90" }
  ];

  // Function to combine class names
  const cn = (...classes: (string | undefined)[]) => {
    return classes.filter(Boolean).join(' ');
  };

  // Substituição para prévia
  const previewContent = campaignContent
    .replace(/\{\{name\}\}/g, "Cliente")
    .replace(/\{\{restaurant\}\}/g, "Seu Restaurante")
    .replace(/\{\{discount\}\}/g, "10%")
    .replace(/\{\{code\}\}/g, "PROMO10")
    .replace(/\{\{date\}\}/g, "30/04/2025")
    .replace(/\{\{time\}\}/g, "19h")
    .replace(/\{\{event\}\}/g, "Jazz")
    .replace(/\{\{dish\}\}/g, "Risoto de Camarão")
    .replace(/\{\{phone\}\}/g, "(11) 98765-4321")
    .replace(/\{\{promotion\}\}/g, "Final de Semana")
    .replace(/\{\{items\}\}/g, "pratos italianos")
    .replace(/\{\{month\}\}/g, "Maio");

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{initialTemplate?.name || "Nova Campanha"}</CardTitle>
          <CardDescription>
            {initialTemplate?.description || "Crie sua campanha de marketing personalizada"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome da Campanha</Label>
                <Input 
                  id="name"
                  placeholder="Ex: Promoção de Verão" 
                  value={campaignName}
                  onChange={handleNameChange}
                />
              </div>

              <div className="space-y-2">
                <Label>Audiência</Label>
                <Select value={settings?.audienceType || "all"}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo de audiência" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os clientes</SelectItem>
                    <SelectItem value="segment">Segmento específico</SelectItem>
                    <SelectItem value="custom">Critérios personalizados</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                  Tamanho estimado da audiência: <span className="font-medium">235</span> clientes
                </p>
              </div>

              <div className="space-y-2">
                <Label>Agendamento</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Input 
                    type="date" 
                    value={settings?.scheduledDate || new Date().toISOString().split('T')[0]}
                  />
                  <Input 
                    type="time" 
                    value={settings?.scheduledTime || "12:00"}
                  />
                </div>
              </div>
            </div>
            
            <div className="space-y-4 border-t border-border pt-4">
              <Label>Conteúdo da Campanha</Label>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  <div className="space-y-2">
                    <Label>Canais de Envio</Label>
                    <div className="flex flex-wrap gap-2">
                      <Button 
                        variant={selectedChannels.includes("whatsapp") ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleChannelToggle("whatsapp")}
                        className="flex items-center gap-2"
                      >
                        <MessageSquareDashed className="h-4 w-4 text-green-600" />
                        WhatsApp
                      </Button>
                      <Button 
                        variant={selectedChannels.includes("sms") ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleChannelToggle("sms")}
                        className="flex items-center gap-2"
                      >
                        <MessageSquareDashed className="h-4 w-4 text-blue-600" />
                        SMS
                      </Button>
                      <Button 
                        variant={selectedChannels.includes("email") ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleChannelToggle("email")}
                        className="flex items-center gap-2"
                      >
                        <Mail className="h-4 w-4 text-orange-600" />
                        Email
                      </Button>
                    </div>
                  </div>
                  
                  {/* Tipo principal (apenas se houver mais de um canal selecionado) */}
                  {selectedChannels.length > 1 && (
                    <div className="space-y-2">
                      <Label>Canal Principal</Label>
                      <Select 
                        value={campaignType} 
                        onValueChange={handleTypeChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o canal principal" />
                        </SelectTrigger>
                        <SelectContent>
                          {selectedChannels.includes("email") && (
                            <SelectItem value="email">Email</SelectItem>
                          )}
                          {selectedChannels.includes("sms") && (
                            <SelectItem value="sms">SMS</SelectItem>
                          )}
                          {selectedChannels.includes("whatsapp") && (
                            <SelectItem value="whatsapp">WhatsApp</SelectItem>
                          )}
                        </SelectContent>
                      </Select>
                      <p className="text-sm text-muted-foreground">
                        O canal principal determina o formato de edição e pré-visualização
                      </p>
                    </div>
                  )}

                  {campaignType === 'email' && (
                    <div className="space-y-2">
                      <Label htmlFor="subject">Assunto</Label>
                      <Input 
                        id="subject"
                        placeholder="Assunto do Email" 
                        value={campaignSubject}
                        onChange={handleSubjectChange}
                      />
                    </div>
                  )}

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="content">Conteúdo</Label>
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setShowOptimizer(!showOptimizer)}
                        >
                          <ImageIcon className="h-4 w-4 mr-2" />
                          {showOptimizer ? "Ocultar Otimizador" : "Otimizador de Imagem"}
                        </Button>
                      </div>
                    </div>
                    <Editor
                      value={campaignContent}
                      onChange={handleContentChange}
                    />
                  </div>

                  {/* Otimizador de imagens integrado (Expansível) */}
                  {showOptimizer && (
                    <div className="border border-border rounded-md p-4 space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium">{imageOptimizerTranslations.imageOptimizer}</h3>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={handleUploadClick}>
                            <Upload className="h-4 w-4 mr-1" /> {imageOptimizerTranslations.upload}
                          </Button>
                        </div>
                      </div>
                      
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
                            <p>{imageOptimizerTranslations.uploadImage}</p>
                          </div>
                        )}
                      </div>
                      
                      {hasImage && (
                        <Tabs value={activeImageTab} onValueChange={setActiveImageTab} className="w-full">
                          <TabsList className="w-full grid grid-cols-2">
                            <TabsTrigger value="basic">
                              <SunMedium className="h-4 w-4 mr-2" />
                              {imageOptimizerTranslations.basic}
                            </TabsTrigger>
                            <TabsTrigger value="filters">
                              <Palette className="h-4 w-4 mr-2" />
                              {imageOptimizerTranslations.filters}
                            </TabsTrigger>
                          </TabsList>
                          
                          <TabsContent value="basic" className="space-y-4 mt-4">
                            <div className="space-y-3">
                              <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                  <div className="flex items-center gap-2">
                                    <SunMedium className="h-4 w-4 text-primary" />
                                    <Label htmlFor="brightness">{imageOptimizerTranslations.brightness}</Label>
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
                                    <Label htmlFor="contrast">{imageOptimizerTranslations.contrast}</Label>
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
                                    <Label htmlFor="saturation">{imageOptimizerTranslations.saturation}</Label>
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
                          <RotateCw className="mr-2 h-4 w-4" /> {imageOptimizerTranslations.reset}
                        </Button>
                        <Button 
                          onClick={handleOptimizeWithAI} 
                          disabled={isOptimizing}
                        >
                          {isOptimizing ? (
                            <>
                              <span className="animate-spin mr-2">⌛</span> {imageOptimizerTranslations.optimizing}
                            </>
                          ) : (
                            <>
                              <Wand2 className="mr-2 h-4 w-4" /> {imageOptimizerTranslations.optimizeWithAI}
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <Card>
                    <CardHeader>
                      <CardTitle>{translations.campaignPreview || "Preview"}</CardTitle>
                      <CardDescription>
                        {translations.previewDescription || "See how your campaign will be displayed"}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <CampaignPreview 
                        content={previewContent}
                        type={campaignType}
                        subject={campaignSubject}
                        platform={initialTemplate?.platform}
                      />
                    </CardContent>
                    <CardFooter className="flex justify-between border-t pt-4">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => setShowFullPreview(true)}
                        className="flex items-center gap-2"
                      >
                        <Eye className="w-4 h-4" />
                        Visualizar Completo
                      </Button>
                      <Button 
                        variant="secondary" 
                        size="sm" 
                        className="flex items-center gap-2"
                      >
                        <Play className="w-4 h-4" />
                        Enviar Teste
                      </Button>
                    </CardFooter>
                  </Card>
                  
                  <CampaignFullPreviewDialog
                    open={showFullPreview}
                    onOpenChange={setShowFullPreview}
                    content={previewContent}
                    type={campaignType}
                    subject={campaignSubject}
                    platform={initialTemplate?.platform}
                    channels={selectedChannels as CampaignType[]}
                  />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t pt-4">
          <Button variant="outline">Salvar Rascunho</Button>
          <Button onClick={form.handleSubmit(onSubmit)}>Criar Campanha</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CampaignCreator;
