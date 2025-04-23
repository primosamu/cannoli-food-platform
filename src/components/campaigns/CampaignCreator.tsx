import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Editor } from "@/components/ui/editor";
import CampaignDetailsSection from "./CampaignDetailsSection";
import CampaignChannelsSection from "./CampaignChannelsSection";
import CampaignContentSection from "./CampaignContentSection";
import CampaignImageOptimizerSection from "./CampaignImageOptimizerSection";

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
  const [selectedChannels, setSelectedChannels] = useState<CampaignType[]>(
    settings?.selectedChannels?.map(ch => ch as CampaignType) || [campaignType]
  );
  
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

  const translationsObj = typeof translations === "object" && translations !== null ? translations : {};
  const imageOptimizerTranslations: ImageOptimizerTranslations = {
    ...defaultImageOptimizerTranslations,
    ...((translationsObj.imageOptimizer && typeof translationsObj.imageOptimizer === "object")
      ? translationsObj.imageOptimizer as Partial<ImageOptimizerTranslations>
      : {})
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
      setSelectedChannels(settings.selectedChannels.map(ch => ch as CampaignType));
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
      const channel = channelId as CampaignType;
      if (prevChannels.includes(channel)) {
        if (prevChannels.length === 1) {
          return prevChannels;
        }
        const newChannels = prevChannels.filter(ch => ch !== channel);
        if (channel === campaignType && newChannels.length > 0) {
          setCampaignType(newChannels[0]);
        }
        return newChannels;
      } else {
        const newChannels = [...prevChannels, channel];
        if (newChannels.length === 1) {
          setCampaignType(channel);
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
    
    setTimeout(() => {
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

  const cn = (...classes: (string | undefined)[]) => {
    return classes.filter(Boolean).join(' ');
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
            <CampaignDetailsSection
              campaignName={campaignName}
              handleNameChange={handleNameChange}
              settings={settings}
            />
            <div className="space-y-4 border-t border-border pt-4">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  <CampaignChannelsSection
                    selectedChannels={selectedChannels}
                    handleChannelToggle={handleChannelToggle}
                    campaignType={campaignType}
                    handleTypeChange={handleTypeChange}
                  />
                  <CampaignContentSection
                    campaignType={campaignType}
                    campaignSubject={campaignSubject}
                    handleSubjectChange={handleSubjectChange}
                    campaignContent={campaignContent}
                    handleContentChange={handleContentChange}
                    showOptimizer={showOptimizer}
                    setShowOptimizer={setShowOptimizer}
                    translations={translations}
                    previewContent={previewContent}
                    showFullPreview={showFullPreview}
                    setShowFullPreview={setShowFullPreview}
                    selectedChannels={selectedChannels}
                    initialTemplate={initialTemplate}
                  />
                  <CampaignImageOptimizerSection
                    show={showOptimizer}
                    onClose={() => setShowOptimizer(false)}
                    translations={imageOptimizerTranslations}
                    hasImage={hasImage}
                    setHasImage={setHasImage}
                    brightness={brightness}
                    setBrightness={setBrightness}
                    contrast={contrast}
                    setContrast={setContrast}
                    saturation={saturation}
                    setSaturation={setSaturation}
                    sharpness={sharpness}
                    setSharpness={setSharpness}
                    currentFilter={currentFilter}
                    setCurrentFilter={setCurrentFilter}
                    activeImageTab={activeImageTab}
                    setActiveImageTab={setActiveImageTab}
                    isOptimizing={isOptimizing}
                    handleOptimizeWithAI={handleOptimizeWithAI}
                    handleUploadClick={handleUploadClick}
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
