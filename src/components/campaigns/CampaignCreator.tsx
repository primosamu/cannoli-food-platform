
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
import { Badge } from "@/components/ui/badge";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useLanguage } from "@/contexts/LanguageContext";
import { CampaignTemplate, CampaignType } from "@/types/campaign";
import AudienceInfo from "./AudienceInfo";
import { 
  CalendarIcon, 
  MessageSquare, 
  MailOpen, 
  MessageSquareDashed,
  Image as ImageIcon,
  Upload,
  Wand2,
  RotateCw,
  SaveIcon,
  Filter,
  SunMedium,
  Contrast,
  Palette,
  MinusCircle,
  PlusCircle
} from "lucide-react";
import CampaignPreview from "./CampaignPreview";
import CampaignFullPreviewDialog from "./preview/CampaignFullPreviewDialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";

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
  
  // Image optimizer state
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [brightness, setBrightness] = useState([100]);
  const [contrast, setContrast] = useState([100]);
  const [saturation, setSaturation] = useState([100]);
  const [sharpness, setSharpness] = useState([0]);
  const [currentFilter, setCurrentFilter] = useState("none");
  const [hasImage, setHasImage] = useState(false);
  const [activeImageTab, setActiveImageTab] = useState("basic");
  
  const { toast } = useToast();
  const { translations } = useLanguage();

  const selectedChannels = settings?.selectedChannels || [campaignType];

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

  const handleOptimizeWithAI = () => {
    setIsOptimizing(true);
    
    toast({
      title: translations.imageOptimizer?.optimizing || "Optimizing...",
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
        title: translations.imageOptimizer?.imageOptimized || "Image optimized",
        description: translations.imageOptimizer?.imageOptimizedDesc || "Your image has been optimized successfully",
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
    { id: "none", name: translations.imageOptimizer?.normal || "Normal", className: "" },
    { id: "vivid", name: "Vivid", className: "brightness-110 saturate-125" },
    { id: "warm", name: "Warm", className: "brightness-105 saturate-110 sepia-30" },
    { id: "cool", name: "Cool", className: "brightness-100 saturate-90 hue-rotate-15" },
    { id: "bw", name: "B&W", className: "grayscale" },
    { id: "vintage", name: "Vintage", className: "sepia-50 contrast-75 brightness-90" }
  ];

  const getChannelIcon = () => {
    switch (campaignType) {
      case 'whatsapp':
        return <MessageSquareDashed className="h-5 w-5 text-green-600 mr-2" />;
      case 'sms':
        return <MessageSquareDashed className="h-5 w-5 text-blue-600 mr-2" />;
      case 'email':
        return <MailOpen className="h-5 w-5 text-orange-600 mr-2" />;
      default:
        return <MessageSquare className="h-5 w-5 mr-2" />;
    }
  };

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

  // Function to combine class names
  const cn = (...classes: (string | undefined)[]) => {
    return classes.filter(Boolean).join(' ');
  };

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
          <Tabs defaultValue="details">
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="details">
                <MessageSquare className="mr-2 h-4 w-4" /> 
                Detalhes
              </TabsTrigger>
              <TabsTrigger value="content">
                <MessageSquare className="mr-2 h-4 w-4" /> 
                Conteúdo
              </TabsTrigger>
              <TabsTrigger value="images">
                <ImageIcon className="mr-2 h-4 w-4" /> 
                Imagens
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="details" className="pt-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    <Label>Canais de Envio</Label>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <Checkbox
                          id="channel-whatsapp"
                          checked={selectedChannels.includes("whatsapp")}
                          className="mt-1"
                        />
                        <div className="grid gap-1.5">
                          <Label htmlFor="channel-whatsapp" className="font-medium flex items-center">
                            <MessageSquareDashed className="h-4 w-4 mr-2 text-green-600" />
                            WhatsApp
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            {translations.campaignPreview || "Mensagens diretas com 98% de taxa de abertura"}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <Checkbox
                          id="channel-sms"
                          checked={selectedChannels.includes("sms")}
                          className="mt-1"
                        />
                        <div className="grid gap-1.5">
                          <Label htmlFor="channel-sms" className="font-medium flex items-center">
                            <MessageSquareDashed className="h-4 w-4 mr-2 text-blue-600" />
                            SMS
                          </Label>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <Checkbox
                          id="channel-email"
                          checked={selectedChannels.includes("email")}
                          className="mt-1"
                        />
                        <div className="grid gap-1.5">
                          <Label htmlFor="channel-email" className="font-medium flex items-center">
                            <MailOpen className="h-4 w-4 mr-2 text-orange-600" />
                            Email
                          </Label>
                        </div>
                      </div>
                    </div>
                  </div>

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
                </div>

                <div className="space-y-4">
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
              </div>
            </TabsContent>
            
            <TabsContent value="content" className="pt-6 space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-4">
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
                      {selectedChannels.length === 0 && (
                        <>
                          <SelectItem value="email">Email</SelectItem>
                          <SelectItem value="sms">SMS</SelectItem>
                          <SelectItem value="whatsapp">WhatsApp</SelectItem>
                        </>
                      )}
                    </SelectContent>
                  </Select>

                  <div className="space-y-2">
                    <Label htmlFor="content">Conteúdo da Campanha</Label>
                    <Editor
                      value={campaignContent}
                      onChange={handleContentChange}
                    />
                  </div>
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
                      <Button variant="outline" size="sm" onClick={() => setShowFullPreview(true)}>Visualizar Completo</Button>
                      <Button variant="secondary" size="sm">Enviar Teste</Button>
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
            </TabsContent>
            
            <TabsContent value="images" className="pt-6">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Image Optimizer */}
                  <Card className="overflow-hidden">
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium">{translations.imageOptimizer?.imageOptimizer || "Image Optimizer"}</h3>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={handleUploadClick}>
                            <Upload className="h-4 w-4 mr-1" /> {translations.imageOptimizer?.upload || "Upload"}
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
                            <p>{translations.imageOptimizer?.uploadImage || "Upload an image to start"}</p>
                          </div>
                        )}
                      </div>
                      
                      {hasImage && (
                        <Tabs value={activeImageTab} onValueChange={setActiveImageTab} className="w-full">
                          <TabsList className="w-full grid grid-cols-2">
                            <TabsTrigger value="basic">
                              <SunMedium className="h-4 w-4 mr-2" />
                              {translations.imageOptimizer?.basic || "Basic"}
                            </TabsTrigger>
                            <TabsTrigger value="filters">
                              <Filter className="h-4 w-4 mr-2" />
                              {translations.imageOptimizer?.filters || "Filters"}
                            </TabsTrigger>
                          </TabsList>
                          
                          <TabsContent value="basic" className="space-y-4 mt-4">
                            <div className="space-y-3">
                              <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                  <div className="flex items-center gap-2">
                                    <SunMedium className="h-4 w-4 text-primary" />
                                    <Label htmlFor="brightness">{translations.imageOptimizer?.brightness || "Brightness"}</Label>
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
                                    <Label htmlFor="contrast">{translations.imageOptimizer?.contrast || "Contrast"}</Label>
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
                                    <Label htmlFor="saturation">{translations.imageOptimizer?.saturation || "Saturation"}</Label>
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
                    </CardContent>
                    <CardFooter className="flex justify-between border-t pt-4">
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
                        <RotateCw className="mr-2 h-4 w-4" /> {translations.imageOptimizer?.reset || "Reset"}
                      </Button>
                      <Button 
                        onClick={handleOptimizeWithAI} 
                        disabled={isOptimizing}
                      >
                        {isOptimizing ? (
                          <>
                            <span className="animate-spin mr-2">⌛</span> {translations.imageOptimizer?.optimizing || "Optimizing..."}
                          </>
                        ) : (
                          <>
                            <Wand2 className="mr-2 h-4 w-4" /> {translations.imageOptimizer?.optimizeWithAI || "Optimize with AI"}
                          </>
                        )}
                      </Button>
                    </CardFooter>
                  </Card>
                  
                  {/* Gallery */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Galeria de Imagens</CardTitle>
                      <CardDescription>
                        Selecione imagens anteriores ou faça upload de novas
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4">
                        {[1, 2, 3, 4].map((item) => (
                          <div 
                            key={item} 
                            className="aspect-video bg-gray-100 rounded flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors"
                          >
                            <span className="text-muted-foreground">Imagem {item}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
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
