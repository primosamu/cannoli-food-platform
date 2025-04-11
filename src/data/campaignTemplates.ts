
import { CampaignTemplate } from "../types/campaign";

export const campaignTemplates: CampaignTemplate[] = [
  // WhatsApp Templates
  {
    id: "whatsapp-welcome",
    name: "Welcome Message",
    type: "whatsapp",
    content: "Olá {{name}}! 👋 Bem-vindo(a) ao *{{restaurant}}*! Estamos muito felizes em tê-lo(a) como nosso cliente. A partir de agora, você receberá nossas promoções exclusivas e novidades. Salve nosso contato! 🍽️",
    description: "Template de boas-vindas para novos clientes",
  },
  {
    id: "whatsapp-discount",
    name: "Discount Offer",
    type: "whatsapp",
    content: "Olá {{name}}! 🎉 Temos uma oferta especial para você! Ganhe *{{discount}}%* de desconto em seu próximo pedido usando o código *{{code}}*. Válido até {{date}}. Aproveite! 🍕🍔",
    description: "Oferta de desconto para clientes existentes",
  },
  {
    id: "whatsapp-feedback",
    name: "Feedback Request",
    type: "whatsapp",
    content: "Olá {{name}}! Como foi sua experiência no {{restaurant}}? Adoraríamos ouvir sua opinião para continuar melhorando nossos serviços. Responda esta mensagem com uma nota de 1 a 5 estrelas ⭐ Agradecemos seu feedback!",
    description: "Solicitação de feedback após visita ao restaurante",
  },

  // SMS Templates
  {
    id: "sms-welcome",
    name: "Welcome SMS",
    type: "sms",
    content: "{{restaurant}}: Olá {{name}}! Bem-vindo(a)! Agora você receberá nossas ofertas exclusivas. Responda SAIR para cancelar.",
    description: "SMS de boas-vindas para novos clientes",
  },
  {
    id: "sms-discount",
    name: "Discount SMS",
    type: "sms",
    content: "{{restaurant}}: {{name}}, ganhe {{discount}}% de desconto hoje! Use o código {{code}} em seu próximo pedido. Válido até {{date}}.",
    description: "Oferta de desconto via SMS",
  },
  {
    id: "sms-event",
    name: "Event Invitation",
    type: "sms",
    content: "{{restaurant}}: {{name}}, convidamos você para nosso evento especial dia {{date}} às {{time}}. Reserve sua mesa: {{phone}}",
    description: "Convite para evento especial",
  },

  // Email Templates
  {
    id: "email-welcome",
    name: "Welcome Email",
    type: "email",
    subject: "Bem-vindo(a) ao {{restaurant}}!",
    content: "<h1>Olá {{name}}!</h1><p>Estamos muito felizes em tê-lo(a) como parte da família {{restaurant}}.</p><p>A partir de agora, você receberá nossas promoções exclusivas, novidades do cardápio e convites para eventos especiais.</p><p>Como agradecimento, anexamos um cupom de <strong>10% de desconto</strong> para sua próxima visita!</p><p>Esperamos vê-lo(a) em breve!</p><p>Equipe {{restaurant}}</p>",
    description: "Email de boas-vindas para novos clientes",
    imageUrl: "welcome-banner.jpg"
  },
  {
    id: "email-newsletter",
    name: "Monthly Newsletter",
    type: "email",
    subject: "Novidades de {{month}} do {{restaurant}}!",
    content: "<h1>Novidades de {{month}}!</h1><p>Olá {{name}},</p><p>Confira o que preparamos para este mês no {{restaurant}}:</p><ul><li>Novo menu sazonal</li><li>Noites temáticas às quintas-feiras</li><li>Promoção de aniversário: ganhe uma sobremesa!</li></ul><p>Esperamos sua visita!</p><p>Equipe {{restaurant}}</p>",
    description: "Newsletter mensal com novidades",
    imageUrl: "newsletter-banner.jpg"
  },

  // Paid Traffic Templates
  {
    id: "paid-discount",
    name: "Discount Ad",
    type: "paid",
    content: "🔥 OFERTA ESPECIAL 🔥\n\nGanhe {{discount}}% de desconto em todos os pratos principais!\nApenas esta semana no {{restaurant}}.\nReserve já: {{phone}}",
    description: "Anúncio de desconto para tráfego pago",
    imageUrl: "discount-ad.jpg"
  },
  {
    id: "paid-new-menu",
    name: "New Menu Ad",
    type: "paid",
    content: "NOVO MENU DEGUSTAÇÃO 🍽️\n\nExperimente nossa nova criação gastronômica no {{restaurant}}. 8 etapas de sabores incríveis!\nReservas limitadas: {{phone}}",
    description: "Anúncio de novo menu para tráfego pago",
    imageUrl: "menu-ad.jpg"
  },
  {
    id: "paid-event",
    name: "Event Ad",
    type: "paid",
    content: "NOITE ESPECIAL DE {{event}} 🎉\n\nJunte-se a nós para uma experiência gastronômica inesquecível no {{restaurant}}.\nDia {{date}} às {{time}}.\nVagas limitadas: {{phone}}",
    description: "Anúncio de evento especial para tráfego pago",
    imageUrl: "event-ad.jpg"
  }
];
