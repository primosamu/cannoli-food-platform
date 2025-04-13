import { CampaignTemplate } from "../types/campaign";

export const campaignTemplates: CampaignTemplate[] = [
  // Pre-configured Customer Recovery Campaign Templates
  {
    id: "recovery-60-days",
    name: "We Miss You",
    type: "whatsapp",
    content: "Olá {{name}}! 👋 Sentimos sua falta! Faz mais de 60 dias desde seu último pedido no *{{restaurant}}*. Gostaríamos de convidá-lo(a) para voltar com *{{discount}}%* de desconto no seu próximo pedido usando o código *{{code}}*. Válido até {{date}}.",
    description: "Campanha para recuperar clientes que não pedem há mais de 60 dias",
    category: "customer-recovery"
  },
  {
    id: "recovery-follow-up-7",
    name: "Come Back To Us",
    type: "whatsapp",
    content: "Olá {{name}}! 🍽️ Volte a pedir! Já faz uma semana que enviamos uma oferta especial e gostaríamos de lembrá-lo(a) que você ainda tem *{{discount}}%* de desconto disponível usando o código *{{code}}* até {{date}}.",
    description: "Acompanhamento após 7 dias da campanha inicial de recuperação",
    category: "customer-recovery"
  },
  {
    id: "recovery-follow-up-15",
    name: "Give Us Another Chance",
    type: "whatsapp",
    content: "Olá {{name}}! 🙏 Nos dê mais uma chance! Sabemos que sua experiência pode melhorar e queremos provar isso. Use o código *{{code}}* e ganhe *{{discount}}%* de desconto + entrega grátis no seu próximo pedido. Válido até {{date}}.",
    description: "Acompanhamento após 15 dias da campanha inicial de recuperação",
    category: "customer-recovery"
  },
  {
    id: "recovery-follow-up-30",
    name: "Last Chance",
    type: "email",
    subject: "Última chance: Oferta exclusiva para você!",
    content: "<h1>Última chance, {{name}}!</h1><p>Notamos que você não voltou ao {{restaurant}} e esta é nossa última oferta especial para você.</p><p>Entendemos que pode haver muitos motivos para não ter retornado, mas gostaríamos muito de tê-lo(a) de volta.</p><p>Como um gesto especial, oferecemos <strong>{{discount}}% de desconto + item surpresa grátis</strong> no seu próximo pedido com o código <strong>{{code}}</strong>.</p><p>Esta oferta é válida apenas até {{date}}.</p>",
    description: "Última tentativa após 30 dias da campanha inicial de recuperação",
    category: "customer-recovery"
  },

  // Customer Loyalty Campaign Templates
  {
    id: "loyalty-first-order",
    name: "First Order Thank You",
    type: "whatsapp",
    content: "Olá {{name}}! 🎉 Muito obrigado por fazer seu primeiro pedido no *{{restaurant}}*! Esperamos que tenha gostado da experiência. Como agradecimento, seu próximo pedido terá *10%* de desconto usando o código *BEMVINDO*. Aguardamos você novamente!",
    description: "Agradecimento após o primeiro pedido",
    category: "loyalty"
  },
  {
    id: "loyalty-second-order",
    name: "Second Order Reward",
    type: "whatsapp",
    content: "Olá {{name}}! 👏 Parabéns por seu segundo pedido no *{{restaurant}}*! Você está se tornando um cliente especial para nós. Em seu próximo pedido, ganhe *15%* de desconto usando o código *VOLTASEMPRE* + uma sobremesa grátis!",
    description: "Recompensa para o segundo pedido",
    category: "loyalty"
  },
  {
    id: "loyalty-third-order",
    name: "Third Order VIP",
    type: "whatsapp",
    content: "Olá {{name}}! 🌟 Uau! Seu terceiro pedido no *{{restaurant}}*! Você agora é oficialmente um cliente VIP! Aproveite *20%* de desconto no seu próximo pedido com o código *CLIENTEVIP* + frete grátis! Também preparamos uma surpresa especial para você.",
    description: "Status VIP após o terceiro pedido",
    category: "loyalty"
  },
  {
    id: "loyalty-fourth-plus",
    name: "Frequent Customer Club",
    type: "email",
    subject: "Bem-vindo ao nosso Clube de Clientes Frequentes!",
    content: "<h1>{{name}}, você é incrível!</h1><p>Você já fez 4 ou mais pedidos no {{restaurant}} e isso merece ser celebrado!</p><p>Como um dos nossos clientes mais fiéis, você agora faz parte do nosso <strong>Clube de Clientes Frequentes</strong>.</p><p>Benefícios exclusivos:</p><ul><li>Desconto permanente de 10% em todos os pedidos</li><li>Frete grátis uma vez por semana</li><li>Acesso antecipado a novos itens do menu</li><li>Um presente surpresa no dia do seu aniversário</li></ul><p>Seu código de cliente frequente é: <strong>{{code}}</strong></p>",
    description: "Clube de clientes frequentes para quem fez 4 ou mais pedidos",
    category: "loyalty"
  },

  // Marketplace to Own Channel Migration Templates
  {
    id: "marketplace-to-own-app",
    name: "Switch to Our App",
    type: "whatsapp",
    content: "Olá {{name}}! 📱 Agradecemos por pedir no iFood/Rappi, mas sabia que temos nosso próprio app? Baixe agora e ganhe *{{discount}}%* de desconto no primeiro pedido + frete grátis usando o código *APPPROPRIO*. Além disso, nossos preços são menores no app próprio!",
    description: "Migração de clientes de marketplaces para o app próprio",
    category: "channel-migration"
  },
  {
    id: "marketplace-to-own-website",
    name: "Order from Our Website",
    type: "email",
    subject: "Peça direto e ganhe vantagens exclusivas!",
    content: "<h1>Olá {{name}}!</h1><p>Notamos que você costuma pedir nossos produtos através do iFood/Rappi.</p><p>Sabia que ao pedir diretamente pelo nosso site você tem:</p><ul><li><strong>Preços mais baixos</strong> (sem as taxas de marketplace)</li><li><strong>Entregas mais rápidas</strong> (prioridade no preparo)</li><li><strong>Programa de fidelidade exclusivo</strong> (pontos em cada pedido)</li><li><strong>Itens exclusivos</strong> que não estão disponíveis nos marketplaces</li></ul><p>Em seu primeiro pedido direto, use o código <strong>SITEDIRETO</strong> e ganhe {{discount}}% de desconto!</p><p><a href='https://www.seurestaurante.com.br'>Peça agora pelo nosso site!</a></p>",
    description: "Migração de clientes de marketplaces para o site próprio",
    category: "channel-migration"
  },

  // Consumption Pattern Change Templates
  {
    id: "lunch-to-dinner",
    name: "Try Our Dinner Menu",
    type: "whatsapp",
    content: "Olá {{name}}! 🌙 Vemos que você adora nossos almoços, mas já experimentou nosso menu de jantar? Ele tem pratos exclusivos que são perfeitos para a noite! Use o código *JANTAR20* para ganhar *20%* de desconto no seu primeiro pedido noturno entre 18h e 22h!",
    description: "Convite para clientes que só almoçam virem jantar",
    category: "consumption-pattern"
  },
  {
    id: "dinner-to-lunch",
    name: "Enjoy Our Lunch Specials",
    type: "whatsapp",
    content: "Olá {{name}}! ☀️ Adoramos atendê-lo no jantar, mas você sabia que temos um menu executivo especial para almoço? Pratos exclusivos, rápidos e com preço especial! Use o código *ALMOCO15* para ganhar *15%* de desconto no seu primeiro almoço conosco!",
    description: "Convite para clientes que só jantam virem almoçar",
    category: "consumption-pattern"
  },
  {
    id: "weekday-to-weekend",
    name: "Weekend Special Menu",
    type: "whatsapp",
    content: "Olá {{name}}! 🎉 Sabemos que você gosta de pedir durante a semana, mas nossos fins de semana são especiais! Temos um menu exclusivo com pratos que servimos apenas aos sábados e domingos. Use o código *FIMDESEMANA* para ganhar *15%* de desconto no seu primeiro pedido de fim de semana!",
    description: "Convite para clientes da semana consumirem no fim de semana",
    category: "consumption-pattern"
  },
  {
    id: "weekend-to-weekday",
    name: "Weekday Deals",
    type: "whatsapp",
    content: "Olá {{name}}! 📅 Sabemos que você gosta de pedir nos fins de semana, mas que tal alegrar sua semana também? De segunda a sexta temos promoções diárias diferentes! Use o código *DIASEMANA* para ganhar *15%* de desconto no seu primeiro pedido durante a semana!",
    description: "Convite para clientes de fim de semana consumirem durante a semana",
    category: "consumption-pattern"
  },
  {
    id: "delivery-to-dine-in",
    name: "Visit Our Restaurant",
    type: "email",
    subject: "Uma experiência completa espera por você!",
    content: "<h1>Olá {{name}}!</h1><p>Adoramos entregar nossos pratos na sua casa, mas que tal viver a experiência completa?</p><p>Visitando nosso restaurante você poderá:</p><ul><li>Conhecer nosso ambiente aconchegante</li><li>Experimentar pratos especiais do menu presencial</li><li>Aproveitar o atendimento personalizado de nossa equipe</li><li>Sentir os aromas e ver a apresentação perfeita dos pratos</li></ul><p>Apresente o código <strong>VISITA25</strong> ao chegar e ganhe um welcome drink + 10% de desconto na conta!</p><p>Esperamos por você!</p>",
    description: "Convite para clientes de delivery visitarem o restaurante",
    category: "consumption-pattern"
  },
  {
    id: "dine-in-to-delivery",
    name: "Try Our Delivery",
    type: "whatsapp",
    content: "Olá {{name}}! 🏠 Adoramos recebê-lo em nosso restaurante! Sabia que você pode ter a mesma qualidade na sua casa? Experimente nosso delivery com *frete grátis* no primeiro pedido usando o código *CASAGOSTOSA*. Perfeito para os dias em que prefere ficar no conforto da sua casa!",
    description: "Convite para clientes que vão ao restaurante pedirem delivery",
    category: "consumption-pattern"
  },

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
    content: "🔥 OFERTA ESPECIAL ���\n\nGanhe {{discount}}% de desconto em todos os pratos principais!\nApenas esta semana no {{restaurant}}.\nReserve já: {{phone}}",
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
  },

  // New RCS Templates
  {
    id: "rcs-welcome",
    name: "Boas-vindas RCS",
    type: "rcs",
    content: "Olá {{name}}! 👋 Bem-vindo(a) ao *{{restaurant}}*! Aproveite a experiência rica do RCS com imagens, carrosséis e botões interativos. Salve nosso contato!",
    description: "Mensagem de boas-vindas usando RCS",
  },
  {
    id: "rcs-promo",
    name: "Promoção do Dia RCS",
    type: "rcs",
    content: "Olá {{name}}! 🎉 Promoção especial hoje no {{restaurant}}! Aproveite {{discount}}% de desconto em todos os pratos principais. Botões interativos no RCS para você fazer seu pedido diretamente.",
    description: "Promoção do dia usando recursos interativos do RCS",
  },
  {
    id: "rcs-menu",
    name: "Menu Digital RCS",
    type: "rcs",
    content: "Confira nosso cardápio digital interativo, {{name}}! Navegue pelas categorias, veja fotos dos pratos e faça seu pedido diretamente por este canal RCS. Uma experiência completa sem precisar baixar nenhum aplicativo!",
    description: "Menu digital interativo usando RCS",
  }
];

// Helper function to get templates by category
export const getTemplatesByCategory = (category: string): CampaignTemplate[] => {
  return campaignTemplates.filter(template => template.category === category);
};

// Helper function to get all categories
export const getAllCategories = (): string[] => {
  const categories = new Set<string>();
  campaignTemplates.forEach(template => {
    if (template.category) categories.add(template.category);
  });
  return Array.from(categories);
};
