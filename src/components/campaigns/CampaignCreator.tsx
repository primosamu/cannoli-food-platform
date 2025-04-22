import React, { useState, useEffect, useCallback } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";
import { Editor } from "@/components/ui/editor";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useLanguage } from "@/contexts/LanguageContext";
import { CampaignTemplate } from "@/types/campaign";
import AudienceInfo from "./AudienceInfo";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Campaign name must be at least 2 characters.",
  }),
  type: z.enum(['whatsapp', 'sms', 'email', 'paid', 'rcs']).default('email'),
  subject: z.string().optional(),
  content: z.string().min(10, {
    message: "Content must be at least 10 characters.",
  }),
  imageUrl: z.string().optional(),
  status: z.enum(['draft', 'scheduled', 'active', 'completed']).default('draft'),
  scheduledDate: z.date().optional(),
  audienceSize: z.number().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  menuIds: z.array(z.string()).optional(),
  deliveryPlatforms: z.array(z.string()).optional(),
  platform: z.string().optional(),
  incentiveType: z.enum(['coupon', 'loyalty', 'none']).default('none'),
  couponId: z.string().optional(),
  loyaltyPoints: z.number().optional(),
  audienceType: z.enum(['all', 'segment', 'custom']).default('all'),
  audienceSegmentId: z.string().optional(),
  channels: z.array(z.enum(['whatsapp', 'sms', 'email', 'paid', 'rcs'])).optional(),
  inactiveDays: z.string().optional(),
  deliveredCount: z.number().optional(),
  openedCount: z.number().optional(),
  clickedCount: z.number().optional(),
  failedCount: z.number().optional(),
  targetAudience: z.object({
    age: z.string().optional(),
    location: z.string().optional(),
    interests: z.array(z.string()).optional(),
    keywords: z.array(z.string()).optional(),
    remarketing: z.boolean().optional(),
    daysVisited: z.number().optional(),
  }).optional(),
});

interface CampaignCreatorProps {
  initialTemplate?: CampaignTemplate;
  segmentName?: string;
  segmentType?: string;
}

const CampaignCreator: React.FC<CampaignCreatorProps> = ({ initialTemplate, segmentName, segmentType }) => {
  const [campaignName, setCampaignName] = useState(initialTemplate?.name || "");
  const [campaignType, setCampaignType] = useState(initialTemplate?.type || "email");
  const [campaignSubject, setCampaignSubject] = useState(initialTemplate?.subject || "");
  const [campaignContent, setCampaignContent] = useState(initialTemplate?.content || "");
  const [isScheduled, setIsScheduled] = useState(false);
  const [scheduledDate, setScheduledDate] = useState<Date | undefined>(undefined);
  const [showPreview, setShowPreview] = useState(false);
  const { toast } = useToast();
  const { translations } = useLanguage();

  // Initialize React Hook Form
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
    setCampaignType(value);
  };

  const handleSubjectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCampaignSubject(e.target.value);
  };

  const handleContentChange = (value: string) => {
    setCampaignContent(value);
  };

  const handleScheduledChange = (checked: boolean) => {
    setIsScheduled(checked);
  };

  const handleDateChange = (date: Date | undefined) => {
    setScheduledDate(date);
  };

  const togglePreview = () => {
    setShowPreview(!showPreview);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      <div className="lg:col-span-3">
        <Card>
          <CardHeader>
            <CardTitle>Detalhes da Campanha</CardTitle>
            <CardDescription>
              Preencha os detalhes da sua campanha de marketing.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome da Campanha</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: Promoção de Verão" {...field} onChange={handleNameChange} />
                      </FormControl>
                      <FormDescription>
                        Dê um nome claro e descritivo para sua campanha.
                      </FormDescription>
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
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o tipo" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="email">Email</SelectItem>
                          <SelectItem value="sms">SMS</SelectItem>
                          <SelectItem value="whatsapp">WhatsApp</SelectItem>
                          <SelectItem value="paid">Tráfego Pago</SelectItem>
                          <SelectItem value="rcs">RCS</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Escolha o tipo de campanha que você deseja criar.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Assunto</FormLabel>
                      <FormControl>
                        <Input placeholder="Assunto do Email" {...field} onChange={handleSubjectChange} />
                      </FormControl>
                      <FormDescription>
                        Defina o assunto do email a ser enviado.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Conteúdo da Campanha</FormLabel>
                      <FormControl>
                        <Editor
                          value={campaignContent}
                          onChange={handleContentChange}
                        />
                      </FormControl>
                      <FormDescription>
                        Escreva o conteúdo da sua campanha.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit">Criar Campanha</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Preview</CardTitle>
            <CardDescription>
              Veja como sua campanha será exibida.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">{campaignName || "Nome da Campanha"}</h3>
              <p>{campaignContent || "Conteúdo da Campanha"}</p>
              {initialTemplate && (
                <AudienceInfo
                  audienceSize={initialTemplate.audienceSize}
                  audienceSegmentId={initialTemplate.audienceSegmentId}
                  translations={{
                    audienceSize: translations.audienceSize,
                    contacts: translations.contacts,
                    audienceSegment: translations.audienceSegment,
                  }}
                />
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CampaignCreator;
