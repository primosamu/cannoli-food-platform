
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
import { CalendarIcon, MessageSquare, MailOpen, MessageSquareDashed } from "lucide-react";

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
}

const CampaignCreator: React.FC<CampaignCreatorProps> = ({ initialTemplate, segmentName, segmentType }) => {
  const [campaignName, setCampaignName] = useState(initialTemplate?.name || "");
  const [campaignType, setCampaignType] = useState<CampaignType>(initialTemplate?.type || "email");
  const [campaignSubject, setCampaignSubject] = useState(initialTemplate?.subject || "");
  const [campaignContent, setCampaignContent] = useState(initialTemplate?.content || "");
  const { toast } = useToast();
  const { translations } = useLanguage();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialTemplate?.name || "",
      type: initialTemplate?.type || "email",
      subject: initialTemplate?.subject || "",
      content: initialTemplate?.content || "",
    },
  });

  useEffect(() => {
    if (initialTemplate) {
      form.reset({
        name: initialTemplate.name,
        type: initialTemplate.type,
        subject: initialTemplate.subject || "",
        content: initialTemplate.content,
      });
    }
  }, [initialTemplate, form]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      ),
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

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Detalhes da Campanha</CardTitle>
            <CardDescription>
              Preencha os detalhes da sua campanha de marketing.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome da Campanha</Label>
                <Input 
                  id="name"
                  placeholder="Ex: Promoção de Verão" 
                  value={campaignName}
                  onChange={handleNameChange}
                  className="w-full"
                />
                <p className="text-sm text-muted-foreground">
                  Dê um nome claro e descritivo para sua campanha.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">Tipo de Campanha</Label>
                <Select 
                  value={campaignType} 
                  onValueChange={handleTypeChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="sms">SMS</SelectItem>
                    <SelectItem value="whatsapp">WhatsApp</SelectItem>
                    <SelectItem value="rcs">RCS</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                  Escolha o tipo de campanha que você deseja criar.
                </p>
              </div>

              {(campaignType === 'email') && (
                <div className="space-y-2">
                  <Label htmlFor="subject">Assunto</Label>
                  <Input 
                    id="subject"
                    placeholder="Assunto do Email" 
                    value={campaignSubject}
                    onChange={handleSubjectChange}
                    className="w-full"
                  />
                  <p className="text-sm text-muted-foreground">
                    Defina o assunto do email a ser enviado.
                  </p>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="content">Conteúdo da Campanha</Label>
                <Editor
                  value={campaignContent}
                  onChange={handleContentChange}
                />
                <p className="text-sm text-muted-foreground">
                  Escreva o conteúdo da sua campanha.
                </p>
              </div>

              <Button type="submit" className="w-full">Criar Campanha</Button>
            </form>
          </CardContent>
        </Card>
      </div>

      <div>
        <Card className="sticky top-6">
          <CardHeader>
            <CardTitle>{translations.campaignPreview || "Preview"}</CardTitle>
            <CardDescription>
              {translations.previewDescription || "See how your campaign will be displayed"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted/30 rounded-md p-4 border">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-1 text-muted-foreground text-sm mb-1">
                    {getChannelIcon()}
                    <span>{campaignType.toUpperCase()}</span>
                  </div>
                  <h3 className="text-lg font-semibold">{campaignName || "Nome da Campanha"}</h3>
                  
                  {campaignType === 'email' && campaignSubject && (
                    <div className="text-sm text-muted-foreground mt-1 mb-2">
                      <span className="font-medium">Assunto:</span> {campaignSubject}
                    </div>
                  )}
                </div>
                <div>
                  <Badge variant="outline" className="text-xs flex items-center gap-1">
                    <CalendarIcon className="h-3 w-3" />
                    Hoje
                  </Badge>
                </div>
              </div>
              
              <div className="mt-3 border-t pt-3">
                <div className="text-sm prose-sm max-w-full overflow-hidden break-words">
                  {campaignContent || "Conteúdo da Campanha"}
                </div>
              </div>
              
              {initialTemplate && (
                <div className="mt-3 pt-3 border-t">
                  <AudienceInfo
                    audienceSize={initialTemplate.audienceSize}
                    audienceSegmentId={initialTemplate.audienceSegmentId}
                    translations={translations}
                  />
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t pt-4">
            <Button variant="outline" size="sm">Visualizar Completo</Button>
            <Button variant="secondary" size="sm">Enviar Teste</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default CampaignCreator;
