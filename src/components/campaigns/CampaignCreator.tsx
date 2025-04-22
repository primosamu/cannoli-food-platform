
import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CampaignTemplate, CampaignType } from "@/types/campaign";
import CampaignPreview from "./CampaignPreview";
import TemplateSelector from "./TemplateSelector";
import { Wand2, Tag, Clock, Users } from "lucide-react";
import { 
  getTemplatesByCategory,
  getAllCategories 
} from "@/data/campaignTemplates";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";

const formSchema = z.object({
  name: z.string().min(2, { message: "Nome da campanha é obrigatório" }),
  type: z.enum(["whatsapp", "sms", "email", "paid", "rcs"] as const),
  subject: z.string().optional(),
  content: z.string().min(5, { message: "Conteúdo é obrigatório" }),
  imageUrl: z.string().optional(),
  category: z.string().optional(),
  audienceType: z.enum(["all", "segment", "custom"] as const).optional(),
  audienceSegmentId: z.string().optional(),
});

interface CampaignCreatorProps {
  initialTemplate?: CampaignTemplate | null;
  segmentName?: string;
  segmentType?: string;
}

const CampaignCreator = ({ 
  initialTemplate = null, 
  segmentName = "",
  segmentType = ""
}: CampaignCreatorProps) => {
  const [previewData, setPreviewData] = useState<{
    content: string;
    subject?: string;
    imageUrl?: string;
    type: CampaignType;
  }>({
    content: "",
    type: "whatsapp",
  });
  
  const [activeTab, setActiveTab] = useState("editor");
  const [recommendedTemplates, setRecommendedTemplates] = useState<CampaignTemplate[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [campaignName, setCampaignName] = useState<string>("");
  const { translations } = useLanguage();
  
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: segmentName ? `Campanha para ${segmentName}` : "",
      type: "whatsapp",
      content: "",
      category: "",
      audienceType: "all",
    },
  });

  useEffect(() => {
    if (segmentType) {
      let category = "";
      
      if (segmentType.includes('recency') && segmentName?.includes('>60 days')) {
        category = "customer-recovery";
      } else if (segmentType === 'rfm-segments' && (segmentName?.includes('Lost') || segmentName?.includes('At Risk'))) {
        category = "customer-recovery";
      } else if (segmentType.includes('frequency') && segmentName?.includes('orders')) {
        category = "loyalty";
      } else if (segmentType === 'meal-preference' || segmentType === 'day-preference') {
        category = "consumption-pattern";
      }
      
      if (category) {
        setSelectedCategory(category);
        const templates = getTemplatesByCategory(category);
        setRecommendedTemplates(templates);
        if (templates.length > 0) {
          setActiveTab("templates");
        }
      }
    }
  }, [segmentType, segmentName]);

  useEffect(() => {
    if (initialTemplate) {
      const suggestedName = initialTemplate.name ? 
        `Campanha: ${initialTemplate.name}` : 
        "Nova Campanha";
      
      setCampaignName(suggestedName);
      form.setValue("name", suggestedName);
      form.setValue("content", initialTemplate.content);
      form.setValue("type", initialTemplate.type);
      
      if (initialTemplate.subject) {
        form.setValue("subject", initialTemplate.subject);
      }
      
      if (initialTemplate.imageUrl) {
        form.setValue("imageUrl", initialTemplate.imageUrl);
      }
      
      if (initialTemplate.category) {
        form.setValue("category", initialTemplate.category);
        setSelectedCategory(initialTemplate.category);
      }

      if (initialTemplate.audienceType) {
        form.setValue("audienceType", initialTemplate.audienceType);
      }

      if (initialTemplate.audienceSegmentId) {
        form.setValue("audienceSegmentId", initialTemplate.audienceSegmentId);
      }
      
      setPreviewData({
        content: initialTemplate.content,
        subject: initialTemplate.subject,
        imageUrl: initialTemplate.imageUrl,
        type: initialTemplate.type,
      });
      
      const today = new Date();
      const expiryDate = new Date(today);
      expiryDate.setDate(today.getDate() + 30);
      
      const expiryDateStr = expiryDate.toLocaleDateString('pt-BR');
      
      let personalizedContent = initialTemplate.content
        .replace(/{{date}}/g, expiryDateStr)
        .replace(/{{discount}}/g, "15")
        .replace(/{{code}}/g, "WELCOME15");
      
      form.setValue("content", personalizedContent);
      setPreviewData(prev => ({
        ...prev,
        content: personalizedContent
      }));
    }
  }, [initialTemplate, form]);

  const campaignType = form.watch("type");
  const audienceType = form.watch("audienceType");

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    toast({
      title: "Campanha criada",
      description: "Sua campanha foi salva com sucesso",
    });
    console.log(values);
  };

  const handleTemplateSelect = (template: CampaignTemplate) => {
    form.setValue("content", template.content);
    form.setValue("type", template.type);
    
    if (template.subject) form.setValue("subject", template.subject);
    if (template.imageUrl) form.setValue("imageUrl", template.imageUrl);
    if (template.audienceType) form.setValue("audienceType", template.audienceType);
    if (template.audienceSegmentId) form.setValue("audienceSegmentId", template.audienceSegmentId);
    
    setPreviewData({
      content: template.content,
      subject: template.subject,
      imageUrl: template.imageUrl,
      type: template.type,
    });

    // Personalize o conteúdo com datas padrão
    const today = new Date();
    const expiryDate = new Date(today);
    expiryDate.setDate(today.getDate() + 30);
    const expiryDateStr = expiryDate.toLocaleDateString('pt-BR');
    
    let personalizedContent = template.content
      .replace(/{{date}}/g, expiryDateStr)
      .replace(/{{discount}}/g, "15")
      .replace(/{{code}}/g, "WELCOME15");
    
    form.setValue("content", personalizedContent);
    setPreviewData(prev => ({
      ...prev,
      content: personalizedContent
    }));
  };

  const handleOptimizeWithAI = () => {
    toast({
      title: "Otimizando conteúdo",
      description: "Seu conteúdo está sendo otimizado com IA...",
    });
    
    setTimeout(() => {
      const currentContent = form.getValues("content");
      const optimizedContent = `${currentContent} [Otimizado com IA]`;
      form.setValue("content", optimizedContent);
      setPreviewData({
        ...previewData,
        content: optimizedContent,
      });
      
      toast({
        title: "Otimização concluída",
        description: "Seu conteúdo foi otimizado com sucesso",
      });
    }, 1500);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    form.setValue("content", e.target.value);
    setPreviewData({
      ...previewData,
      content: e.target.value,
    });
  };

  const handleSubjectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    form.setValue("subject", e.target.value);
    setPreviewData({
      ...previewData,
      subject: e.target.value,
    });
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    form.setValue("category", category);
    const templates = getTemplatesByCategory(category);
    setRecommendedTemplates(templates);
  };

  const allCategories = getAllCategories();

  const getAudienceInfo = () => {
    if (!initialTemplate) return null;
    
    return (
      <div className="flex items-center gap-2 mt-2">
        <Users className="h-3 w-3 text-muted-foreground" />
        <span className="text-xs text-muted-foreground">
          {initialTemplate.audienceSize ? `${translations.audienceSize || 'Tamanho da audiência'}: ${initialTemplate.audienceSize} ${translations.contacts || 'contatos'}` : ''}
          {initialTemplate.audienceSegmentId ? ` | ${translations.audienceSegment || 'Segmento'}: ${initialTemplate.audienceSegmentId}` : ''}
        </span>
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome da Campanha</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Promoção de Primavera" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {initialTemplate && (
              <div className="bg-muted/30 p-3 rounded-md border border-muted">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <Tag className="h-4 w-4 text-primary" />
                    <span className="font-medium">Template: {initialTemplate.name}</span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {initialTemplate.type === "whatsapp" ? "WhatsApp" : 
                     initialTemplate.type === "sms" ? "SMS" : 
                     initialTemplate.type === "email" ? "Email" : 
                     initialTemplate.type === "paid" ? "Tráfego Pago" : 
                     initialTemplate.type === "rcs" ? "RCS" : 
                     initialTemplate.type}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-2">{initialTemplate.description}</p>
                <div className="flex items-center gap-1 mt-2">
                  <Clock className="h-3 w-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">
                    {translations.expiryDefault || "Validade padrão: 30 dias a partir de hoje"}
                  </span>
                </div>
                {getAudienceInfo()}
              </div>
            )}

            <div className="flex flex-col md:flex-row gap-4">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Categoria</FormLabel>
                    <Select 
                      onValueChange={handleCategoryChange}
                      value={selectedCategory}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione a categoria" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="all">Todas as categorias</SelectItem>
                        {allCategories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {translations[category as keyof typeof translations] || category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="audienceType"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>{translations.audienceType || "Tipo de audiência"}</FormLabel>
                    <Select 
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o tipo de audiência" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="all">Todos os clientes</SelectItem>
                        <SelectItem value="segment">Segmento</SelectItem>
                        <SelectItem value="custom">Personalizado</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {audienceType === "segment" && (
              <FormField
                control={form.control}
                name="audienceSegmentId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Segmento de audiência</FormLabel>
                    <Select 
                      onValueChange={field.onChange}
                      value={field.value || ""}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione um segmento" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="inactive-60-days">Clientes inativos > 60 dias</SelectItem>
                        <SelectItem value="recovery-nonresponders">Não respondentes (7 dias)</SelectItem>
                        <SelectItem value="recovery-nonresponders-2w">Não respondentes (15 dias)</SelectItem>
                        <SelectItem value="recovery-nonresponders-1m">Não respondentes (30 dias)</SelectItem>
                        <SelectItem value="first-order-3d">Primeiro pedido (3 dias)</SelectItem>
                        <SelectItem value="second-order-7d">Segundo pedido (7 dias)</SelectItem>
                        <SelectItem value="third-order-14d">Terceiro pedido (14 dias)</SelectItem>
                        <SelectItem value="fourth-plus-order">4+ pedidos</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {segmentName && (
              <div className="bg-muted/50 p-3 rounded-md">
                <p className="text-sm flex items-center gap-2">
                  <Tag className="h-4 w-4" />
                  <span>Campanha para segmento: <Badge variant="secondary">{segmentName}</Badge></span>
                </p>
                {segmentType && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Tipo de segmento: {segmentType}
                  </p>
                )}
              </div>
            )}

            {campaignType === "email" && (
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Assunto</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Ex: Oferta especial para você!" 
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          handleSubjectChange(e);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <div className="space-y-4">
              <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="editor">Editor</TabsTrigger>
                  <TabsTrigger value="templates">
                    Templates
                    {recommendedTemplates.length > 0 && (
                      <span className="ml-2 bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full">
                        {recommendedTemplates.length}
                      </span>
                    )}
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="editor">
                  <div className="space-y-2">
                    <FormField
                      control={form.control}
                      name="content"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Conteúdo</FormLabel>
                          <FormControl>
                            <div className="space-y-2">
                              <Textarea 
                                placeholder="Digite o conteúdo da sua campanha..." 
                                className="min-h-[200px]" 
                                {...field}
                                onChange={(e) => {
                                  field.onChange(e);
                                  handleContentChange(e);
                                }}
                              />
                              <div className="grid grid-cols-2 gap-2">
                                <Button 
                                  type="button" 
                                  variant="secondary"
                                  onClick={handleOptimizeWithAI}
                                >
                                  <Wand2 className="mr-2 h-4 w-4" />
                                  Otimizar com IA
                                </Button>
                                <Button type="button" variant="outline">
                                  Variáveis personalizadas
                                </Button>
                              </div>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </TabsContent>
                
                <TabsContent value="templates">
                  {recommendedTemplates.length > 0 ? (
                    <div className="mb-4">
                      <h3 className="font-medium text-sm mb-2">Templates Recomendados</h3>
                      <div className="bg-muted/50 p-2 rounded-md">
                        {recommendedTemplates.map((template) => (
                          <div key={template.id} className="mb-2 last:mb-0 bg-background rounded p-2 cursor-pointer hover:bg-muted/20" onClick={() => handleTemplateSelect(template)}>
                            <div className="flex justify-between items-start mb-1">
                              <span className="font-medium text-sm">{template.name}</span>
                              <Button 
                                size="sm" 
                                variant="ghost"
                                className="h-6 px-2"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleTemplateSelect(template);
                                }}
                              >
                                {translations.use || "Usar"}
                              </Button>
                            </div>
                            <p className="text-xs text-muted-foreground">{template.description}</p>
                            {template.audienceSize && (
                              <div className="flex items-center gap-1 mt-1">
                                <Users className="h-3 w-3 text-muted-foreground" />
                                <span className="text-xs text-muted-foreground">
                                  {template.audienceSize} {translations.contacts || "contatos"}
                                </span>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : null}
                  <TemplateSelector 
                    campaignType={campaignType}
                    categoryFilter={selectedCategory}
                    onSelect={handleTemplateSelect} 
                  />
                </TabsContent>
              </Tabs>
            </div>

            <div className="flex justify-end">
              <Button type="submit">Criar Campanha</Button>
            </div>
          </form>
        </Form>
      </div>

      <div>
        <h3 className="font-medium text-lg mb-4">Preview</h3>
        <CampaignPreview 
          content={previewData.content} 
          type={previewData.type} 
          subject={previewData.subject}
          imageUrl={previewData.imageUrl}
        />
      </div>
    </div>
  );
};

export default CampaignCreator;
