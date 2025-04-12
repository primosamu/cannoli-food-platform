
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
import { Wand2, Tag } from "lucide-react";
import { 
  getTemplatesByCategory, 
  getAllCategories 
} from "@/data/campaignTemplates";
import { Badge } from "@/components/ui/badge";

const formSchema = z.object({
  name: z.string().min(2, { message: "Nome da campanha é obrigatório" }),
  type: z.enum(["whatsapp", "sms", "email", "paid"] as const),
  subject: z.string().optional(),
  content: z.string().min(5, { message: "Conteúdo é obrigatório" }),
  imageUrl: z.string().optional(),
  category: z.string().optional(),
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
  
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: segmentName ? `Campaign for ${segmentName}` : "",
      type: "whatsapp",
      content: "",
      category: "",
    },
  });

  // When a segment type is provided, update recommended templates
  useEffect(() => {
    if (segmentType) {
      let category = "";
      
      // Check segment type and set appropriate category
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
        // Automatically switch to templates tab if we have recommendations
        if (templates.length > 0) {
          setActiveTab("templates");
        }
      }
    }
  }, [segmentType, segmentName]);

  // Apply initial template when provided
  useEffect(() => {
    if (initialTemplate) {
      form.setValue("content", initialTemplate.content);
      form.setValue("type", initialTemplate.type);
      
      if (initialTemplate.subject) {
        form.setValue("subject", initialTemplate.subject);
      }
      
      if (initialTemplate.imageUrl) {
        form.setValue("imageUrl", initialTemplate.imageUrl);
      }
      
      setPreviewData({
        content: initialTemplate.content,
        subject: initialTemplate.subject,
        imageUrl: initialTemplate.imageUrl,
        type: initialTemplate.type,
      });
    }
  }, [initialTemplate]);

  const campaignType = form.watch("type");

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    toast({
      title: "Campanha criada",
      description: "Sua campanha foi salva com sucesso",
    });
    console.log(values);
  };

  const handleTemplateSelect = (content: string, subject?: string, imageUrl?: string) => {
    form.setValue("content", content);
    if (subject) form.setValue("subject", subject);
    if (imageUrl) form.setValue("imageUrl", imageUrl);
    
    setPreviewData({
      content,
      subject,
      imageUrl,
      type: form.getValues("type"),
    });
  };

  const handleOptimizeWithAI = () => {
    toast({
      title: "Otimizando conteúdo",
      description: "Seu conteúdo está sendo otimizado com IA...",
    });
    
    // Simulate AI optimization
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

  const handleTypeChange = (value: CampaignType) => {
    form.setValue("type", value);
    setPreviewData({
      ...previewData,
      type: value,
    });
  };
  
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    form.setValue("category", category);
    const templates = getTemplatesByCategory(category);
    setRecommendedTemplates(templates);
  };

  const allCategories = getAllCategories();

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

            <div className="flex flex-col md:flex-row gap-4">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Tipo de Campanha</FormLabel>
                    <Select 
                      onValueChange={(value) => handleTypeChange(value as CampaignType)} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o tipo de campanha" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="whatsapp">WhatsApp</SelectItem>
                          <SelectItem value="sms">SMS</SelectItem>
                          <SelectItem value="email">Email</SelectItem>
                          <SelectItem value="paid">Tráfego Pago</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
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
                        <SelectItem value="">Todas as categorias</SelectItem>
                        {allCategories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category === 'customer-recovery' && 'Recuperação de Clientes'}
                            {category === 'loyalty' && 'Fidelização de Clientes'}
                            {category === 'channel-migration' && 'Migração de Canal'}
                            {category === 'consumption-pattern' && 'Padrão de Consumo'}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

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
                              <Button 
                                type="button" 
                                variant="secondary"
                                onClick={handleOptimizeWithAI}
                                className="w-full"
                              >
                                <Wand2 className="mr-2 h-4 w-4" />
                                Otimizar com IA
                              </Button>
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
                          <div key={template.id} className="mb-2 last:mb-0 bg-background rounded p-2 cursor-pointer hover:bg-muted/20" onClick={() => handleTemplateSelect(template.content, template.subject, template.imageUrl)}>
                            <div className="flex justify-between items-start mb-1">
                              <span className="font-medium text-sm">{template.name}</span>
                              <Button 
                                size="sm" 
                                variant="ghost"
                                className="h-6 px-2"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleTemplateSelect(template.content, template.subject, template.imageUrl);
                                }}
                              >
                                Usar
                              </Button>
                            </div>
                            <p className="text-xs text-muted-foreground">{template.description}</p>
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
