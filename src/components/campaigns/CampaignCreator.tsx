
import { useState } from "react";
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
import { CampaignType } from "@/types/campaign";
import CampaignPreview from "./CampaignPreview";
import TemplateSelector from "./TemplateSelector";
import { Wand2 } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, { message: "Nome da campanha é obrigatório" }),
  type: z.enum(["whatsapp", "sms", "email", "paid"] as const),
  subject: z.string().optional(),
  content: z.string().min(5, { message: "Conteúdo é obrigatório" }),
  imageUrl: z.string().optional(),
});

const CampaignCreator = () => {
  const [previewData, setPreviewData] = useState<{
    content: string;
    subject?: string;
    imageUrl?: string;
    type: CampaignType;
  }>({
    content: "",
    type: "whatsapp",
  });
  
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      type: "whatsapp",
      content: "",
    },
  });

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

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
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
              <Tabs defaultValue="editor">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="editor">Editor</TabsTrigger>
                  <TabsTrigger value="templates">Templates</TabsTrigger>
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
                  <TemplateSelector 
                    campaignType={campaignType} 
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
