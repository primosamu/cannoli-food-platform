import { CampaignTemplate } from "../types/campaign";

export const campaignTemplates: CampaignTemplate[] = [
  // Pre-configurados para Recuperação de Clientes
  {
    id: "recovery-60-days",
    name: "Sentimos sua Falta",
    type: "whatsapp",
    content: "Olá {{name}}! 👋 Sentimos sua falta! Faz mais de 60 dias desde seu último pedido no *{{restaurant}}*. Gostaríamos de convidá-lo(a) para voltar com *{{discount}}%* de desconto no seu próximo pedido usando o código *{{code}}*. Válido até {{date}}.",
    description: "Campanha para recuperar clientes que não pedem há mais de 60 dias",
    category: "customer-recovery",
    audienceType: "segment",
    audienceSegmentId: "inactive-60-days",
    audienceSize: 127,
    imageUrl: "sentimos-sua-falta.jpg"
  },
  {
    id: "recovery-follow-up-7",
    name: "Volte para Nós",
    type: "whatsapp",
    content: "Olá {{name}}! 🍽️ Volte a pedir! Já faz uma semana que enviamos uma oferta especial e gostaríamos de lembrá-lo(a) que você ainda tem *{{discount}}%* de desconto disponível usando o código *{{code}}* até {{date}}.",
    description: "Acompanhamento após 7 dias da campanha inicial de recuperação",
    category: "customer-recovery",
    audienceType: "segment",
    audienceSegmentId: "recovery-nonresponders",
    audienceSize: 84,
    imageUrl: "volte-para-nos.jpg"
  },
  {
    id: "recovery-follow-up-15",
    name: "Nos Dê Outra Chance",
    type: "whatsapp",
    content: "Olá {{name}}! 🙏 Nos dê mais uma chance! Sabemos que sua experiência pode melhorar e queremos provar isso. Use o código *{{code}}* e ganhe *{{discount}}%* de desconto + entrega grátis no seu próximo pedido. Válido até {{date}}.",
    description: "Acompanhamento após 15 dias da campanha inicial de recuperação",
    category: "customer-recovery",
    audienceType: "segment", 
    audienceSegmentId: "recovery-nonresponders-2w",
    audienceSize: 63,
    imageUrl: "outra-chance.jpg"
  },
  {
    id: "recovery-follow-up-30",
    name: "Última Chance",
    type: "email",
    subject: "Última chance: Oferta exclusiva para você!",
    content: "<h1>Última chance, {{name}}!</h1><p>Notamos que você não voltou ao {{restaurant}} e esta é nossa última oferta especial para você.</p><p>Entendemos que pode haver muitos motivos para não ter retornado, mas gostaríamos muito de tê-lo(a) de volta.</p><p>Como um gesto especial, oferecemos <strong>{{discount}}% de desconto + item surpresa grátis</strong> no seu próximo pedido com o código <strong>{{code}}</strong>.</p><p>Esta oferta é válida apenas até {{date}}.</p>",
    description: "Última tentativa após 30 dias da campanha inicial de recuperação",
    category: "customer-recovery",
    audienceType: "segment",
    audienceSegmentId: "recovery-nonresponders-1m",
    audienceSize: 42,
    imageUrl: "ultima-chance.jpg"
  },

  // Campanhas de Fidelidade
  {
    id: "loyalty-first-order",
    name: "Obrigado pelo Primeiro Pedido",
    type: "whatsapp",
    content: "Olá {{name}}! 🎉 Muito obrigado por fazer seu primeiro pedido no *{{restaurant}}*! Esperamos que tenha gostado da experiência. Como agradecimento, seu próximo pedido terá *10%* de desconto usando o código *BEMVINDO*. Aguardamos você novamente!",
    description: "Agradecimento após o primeiro pedido",
    category: "loyalty",
    audienceType: "segment",
    audienceSegmentId: "first-order-3d",
    audienceSize: 35,
    imageUrl: "primeiro-pedido.jpg"
  },
  {
    id: "loyalty-second-order",
    name: "Recompensa pelo Segundo Pedido",
    type: "whatsapp",
    content: "Olá {{name}}! 👏 Parabéns por seu segundo pedido no *{{restaurant}}*! Você está se tornando um cliente especial para nós. Em seu próximo pedido, ganhe *15%* de desconto usando o código *VOLTASEMPRE* + uma sobremesa grátis!",
    description: "Recompensa para o segundo pedido",
    category: "loyalty",
    audienceType: "segment",
    audienceSegmentId: "second-order-7d",
    audienceSize: 28,
    imageUrl: "segundo-pedido.jpg"
  },
  {
    id: "loyalty-third-order",
    name: "Cliente VIP pelo Terceiro Pedido",
    type: "whatsapp",
    content: "Olá {{name}}! 🌟 Uau! Seu terceiro pedido no *{{restaurant}}*! Você agora é oficialmente um cliente VIP! Aproveite *20%* de desconto no seu próximo pedido com o código *CLIENTEVIP* + frete grátis! Também preparamos uma surpresa especial para você.",
    description: "Status VIP após o terceiro pedido",
    category: "loyalty",
    audienceType: "segment",
    audienceSegmentId: "third-order-14d",
    audienceSize: 19,
    imageUrl: "cliente-vip.jpg"
  },
  {
    id: "loyalty-fourth-plus",
    name: "Clube de Clientes Frequentes",
    type: "email",
    subject: "Bem-vindo ao nosso Clube de Clientes Frequentes!",
    content: "<h1>{{name}}, você é incrível!</h1><p>Você já fez 4 ou mais pedidos no {{restaurant}} e isso merece ser celebrado!</p><p>Como um dos nossos clientes mais fiéis, você agora faz parte do nosso <strong>Clube de Clientes Frequentes</strong>.</p><p>Benefícios exclusivos:</p><ul><li>Desconto permanente de 10% em todos os pedidos</li><li>Frete grátis uma vez por semana</li><li>Acesso antecipado a novos itens do menu</li><li>Um presente surpresa no dia do seu aniversário</li></ul><p>Seu código de cliente frequente é: <strong>{{code}}</strong></p>",
    description: "Clube de clientes frequentes para quem fez 4 ou mais pedidos",
    category: "loyalty",
    audienceType: "segment",
    audienceSegmentId: "fourth-plus-order",
    audienceSize: 76,
    imageUrl: "clube-frequentes.jpg"
  },

  // Migração de Canal
  {
    id: "marketplace-to-own-app",
    name: "Mude para Nosso App",
    type: "whatsapp",
    content: "Olá {{name}}! 📱 Agradecemos por pedir no iFood/Rappi, mas sabia que temos nosso próprio app? Baixe agora e ganhe *{{discount}}%* de desconto no primeiro pedido + frete grátis usando o código *APPPROPRIO*. Além disso, nossos preços são menores no app próprio!",
    description: "Migração de clientes de marketplaces para o app próprio",
    category: "channel-migration",
    audienceType: "segment", 
    audienceSegmentId: "marketplace-only",
    audienceSize: 203,
    imageUrl: "nosso-app.jpg"
  },
  {
    id: "marketplace-to-own-website",
    name: "Peça pelo Nosso Site",
    type: "email",
    subject: "Peça direto e ganhe vantagens exclusivas!",
    content: "<h1>Olá {{name}}!</h1><p>Notamos que você costuma pedir nossos produtos através do iFood/Rappi.</p><p>Sabia que ao pedir diretamente pelo nosso site você tem:</p><ul><li><strong>Preços mais baixos</strong> (sem as taxas de marketplace)</li><li><strong>Entregas mais rápidas</strong> (prioridade no preparo)</li><li><strong>Programa de fidelidade exclusivo</strong> (pontos em cada pedido)</li><li><strong>Itens exclusivos</strong> que não estão disponíveis nos marketplaces</li></ul><p>Em seu primeiro pedido direto, use o código <strong>SITEDIRETO</strong> e ganhe {{discount}}% de desconto!</p><p><a href='https://www.seurestaurante.com.br'>Peça agora pelo nosso site!</a></p>",
    description: "Migração de clientes de marketplaces para o site próprio",
    category: "channel-migration",
    audienceType: "segment",
    audienceSegmentId: "marketplace-only-90d",
    audienceSize: 158,
    imageUrl: "nosso-site.jpg"
  },

  // Mudança de Padrão de Consumo
  {
    id: "lunch-to-dinner",
    name: "Experimente Nosso Jantar",
    type: "whatsapp",
    content: "Olá {{name}}! 🌙 Vemos que você adora nossos almoços, mas já experimentou nosso menu de jantar? Ele tem pratos exclusivos que são perfeitos para a noite! Use o código *JANTAR20* para ganhar *20%* de desconto no seu primeiro pedido noturno entre 18h e 22h!",
    description: "Convite para clientes que só almoçam virem jantar",
    category: "consumption-pattern",
    audienceType: "segment",
    audienceSegmentId: "lunch-only",
    audienceSize: 87,
    imageUrl: "menu-jantar.jpg"
  },
  {
    id: "dinner-to-lunch",
    name: "Desfrute de Nossos Almoços Especiais",
    type: "whatsapp",
    content: "Olá {{name}}! ☀️ Adoramos atendê-lo no jantar, mas você sabia que temos um menu executivo especial para almoço? Pratos exclusivos, rápidos e com preço especial! Use o código *ALMOCO15* para ganhar *15%* de desconto no seu primeiro almoço conosco!",
    description: "Convite para clientes que só jantam virem almoçar",
    category: "consumption-pattern",
    audienceType: "segment",
    audienceSegmentId: "dinner-only",
    audienceSize: 64,
    imageUrl: "menu-almoco.jpg"
  },
  {
    id: "weekday-to-weekend",
    name: "Menu Especial de Fim de Semana",
    type: "whatsapp",
    content: "Olá {{name}}! 🎉 Sabemos que você gosta de pedir durante a semana, mas nossos fins de semana são especiais! Temos um menu exclusivo com pratos que servimos apenas aos sábados e domingos. Use o código *FIMDESEMANA* para ganhar *15%* de desconto no seu primeiro pedido de fim de semana!",
    description: "Convite para clientes da semana consumirem no fim de semana",
    category: "consumption-pattern",
    audienceType: "segment",
    audienceSegmentId: "weekday-only",
    audienceSize: 112,
    imageUrl: "fim-de-semana.jpg"
  },
  {
    id: "weekend-to-weekday",
    name: "Promoções dos Dias de Semana",
    type: "whatsapp",
    content: "Olá {{name}}! 📅 Sabemos que você gosta de pedir nos fins de semana, mas que tal alegrar sua semana também? De segunda a sexta temos promoções diárias diferentes! Use o código *DIASEMANA* para ganhar *15%* de desconto no seu primeiro pedido durante a semana!",
    description: "Convite para clientes de fim de semana consumirem durante a semana",
    category: "consumption-pattern",
    audienceType: "segment",
    audienceSegmentId: "weekend-only",
    audienceSize: 93,
    imageUrl: "dia-de-semana.jpg"
  },
  {
    id: "delivery-to-dine-in",
    name: "Visite Nosso Restaurante",
    type: "email",
    subject: "Uma experiência completa espera por você!",
    content: "<h1>Olá {{name}}!</h1><p>Adoramos entregar nossos pratos na sua casa, mas que tal viver a experiência completa?</p><p>Visitando nosso restaurante você poderá:</p><ul><li>Conhecer nosso ambiente aconchegante</li><li>Experimentar pratos especiais do menu presencial</li><li>Aproveitar o atendimento personalizado de nossa equipe</li><li>Sentir os aromas e ver a apresentação perfeita dos pratos</li></ul><p>Apresente o código <strong>VISITA25</strong> ao chegar e ganhe um welcome drink + 10% de desconto na conta!</p><p>Esperamos por você!</p>",
    description: "Convite para clientes de delivery visitarem o restaurante",
    category: "consumption-pattern",
    audienceType: "segment",
    audienceSegmentId: "delivery-only-10orders",
    audienceSize: 47,
    imageUrl: "visite-restaurante.jpg"
  },
  {
    id: "dine-in-to-delivery",
    name: "Experimente Nosso Delivery",
    type: "whatsapp",
    content: "Olá {{name}}! 🏠 Adoramos recebê-lo em nosso restaurante! Sabia que você pode ter a mesma qualidade na sua casa? Experimente nosso delivery com *frete grátis* no primeiro pedido usando o código *CASAGOSTOSA*. Perfeito para os dias em que prefere ficar no conforto da sua casa!",
    description: "Convite para clientes que vão ao restaurante pedirem delivery",
    category: "consumption-pattern",
    audienceType: "segment",
    audienceSegmentId: "dine-in-only",
    audienceSize: 38,
    imageUrl: "nosso-delivery.jpg"
  },

  // Templates de WhatsApp
  {
    id: "whatsapp-welcome",
    name: "Mensagem de Boas-Vindas",
    type: "whatsapp",
    content: "Olá {{name}}! 👋 Bem-vindo(a) ao *{{restaurant}}*! Estamos muito felizes em tê-lo(a) como nosso cliente. A partir de agora, você receberá nossas promoções exclusivas e novidades. Salve nosso contato! 🍽️",
    description: "Template de boas-vindas para novos clientes",
    audienceType: "segment",
    audienceSegmentId: "new-customers-7d",
    audienceSize: 29,
    imageUrl: "boas-vindas.jpg"
  },
  {
    id: "whatsapp-discount",
    name: "Oferta de Desconto",
    type: "whatsapp",
    content: "Olá {{name}}! 🎉 Temos uma oferta especial para você! Ganhe *{{discount}}%* de desconto em seu próximo pedido usando o código *{{code}}*. Válido até {{date}}. Aproveite! 🍕🍔",
    description: "Oferta de desconto para clientes existentes",
    audienceType: "all",
    audienceSize: 450,
    imageUrl: "oferta-desconto.jpg"
  },
  {
    id: "whatsapp-feedback",
    name: "Solicitação de Feedback",
    type: "whatsapp",
    content: "Olá {{name}}! Como foi sua experiência no {{restaurant}}? Adoraríamos ouvir sua opinião para continuar melhorando nossos serviços. Responda esta mensagem com uma nota de 1 a 5 estrelas ⭐ Agradecemos seu feedback!",
    description: "Solicitação de feedback após visita ao restaurante",
    audienceType: "segment",
    audienceSegmentId: "recent-orders-3d",
    audienceSize: 58,
    imageUrl: "feedback.jpg"
  },

  // Templates de SMS
  {
    id: "sms-welcome",
    name: "SMS de Boas-Vindas",
    type: "sms",
    content: "{{restaurant}}: Olá {{name}}! Bem-vindo(a)! Agora você receberá nossas ofertas exclusivas. Responda SAIR para cancelar.",
    description: "SMS de boas-vindas para novos clientes",
    audienceType: "segment",
    audienceSegmentId: "new-customers",
    audienceSize: 45,
    imageUrl: "sms-boas-vindas.jpg"
  },
  {
    id: "sms-discount",
    name: "SMS de Desconto",
    type: "sms",
    content: "{{restaurant}}: {{name}}, ganhe {{discount}}% de desconto hoje! Use o código {{code}} em seu próximo pedido. Válido até {{date}}.",
    description: "Oferta de desconto via SMS",
    audienceType: "segment",
    audienceSegmentId: "sms-subscribers",
    audienceSize: 175,
    imageUrl: "sms-desconto.jpg"
  },
  {
    id: "sms-event",
    name: "Convite para Evento",
    type: "sms",
    content: "{{restaurant}}: {{name}}, convidamos você para nosso evento especial dia {{date}} às {{time}}. Reserve sua mesa: {{phone}}",
    description: "Convite para evento especial",
    audienceType: "segment",
    audienceSegmentId: "local-customers",
    audienceSize: 82,
    imageUrl: "convite-evento.jpg"
  },

  // Templates de Email
  {
    id: "email-welcome",
    name: "Email de Boas-Vindas",
    type: "email",
    subject: "Bem-vindo(a) ao {{restaurant}}!",
    content: "<h1>Olá {{name}}!</h1><p>Estamos muito felizes em tê-lo(a) como parte da família {{restaurant}}.</p><p>A partir de agora, você receberá nossas promoções exclusivas, novidades do cardápio e convites para eventos especiais.</p><p>Como agradecimento, anexamos um cupom de <strong>10% de desconto</strong> para sua próxima visita!</p><p>Esperamos vê-lo(a) em breve!</p><p>Equipe {{restaurant}}</p>",
    description: "Email de boas-vindas para novos clientes",
    audienceType: "segment",
    audienceSegmentId: "new-customers-with-email",
    audienceSize: 67,
    imageUrl: "email-boas-vindas.jpg"
  },
  {
    id: "email-newsletter",
    name: "Newsletter Mensal",
    type: "email",
    subject: "Novidades de {{month}} do {{restaurant}}!",
    content: "<h1>Novidades de {{month}}!</h1><p>Olá {{name}},</p><p>Confira o que preparamos para este mês no {{restaurant}}:</p><ul><li>Novo menu sazonal</li><li>Noites temáticas às quintas-feiras</li><li>Promoção de aniversário: ganhe uma sobremesa!</li></ul><p>Esperamos sua visita!</p><p>Equipe {{restaurant}}</p>",
    description: "Newsletter mensal com novidades",
    audienceType: "all",
    audienceSize: 520,
    imageUrl: "newsletter.jpg"
  },

  // Templates para Tráfego Pago
  {
    id: "paid-discount",
    name: "Anúncio de Desconto",
    type: "paid",
    content: "🔥 OFERTA ESPECIAL 🔥\n\nGanhe {{discount}}% de desconto em todos os pratos principais!\nApenas esta semana no {{restaurant}}.\nReserve já: {{phone}}",
    description: "Anúncio de desconto para tráfego pago",
    imageUrl: "anuncio-desconto.jpg",
    platform: "facebook",
    targetAudience: {
      age: "25-54",
      location: "10km",
      interests: ["gastronomia", "culinária", "restaurantes"]
    }
  },
  {
    id: "paid-new-menu",
    name: "Anúncio de Novo Menu",
    type: "paid",
    content: "NOVO MENU DEGUSTAÇÃO 🍽️\n\nExperimente nossa nova criação gastronômica no {{restaurant}}. 8 etapas de sabores incríveis!\nReservas limitadas: {{phone}}",
    description: "Anúncio de novo menu para tráfego pago",
    imageUrl: "anuncio-menu.jpg",
    platform: "instagram",
    targetAudience: {
      age: "25-45",
      location: "15km",
      interests: ["gastronomia gourmet", "experiências gastronômicas", "fine dining"]
    }
  },
  {
    id: "paid-event",
    name: "Anúncio de Evento",
    type: "paid",
    content: "NOITE ESPECIAL DE {{event}} 🎉\n\nJunte-se a nós para uma experiência gastronômica inesquecível no {{restaurant}}.\nDia {{date}} às {{time}}.\nVagas limitadas: {{phone}}",
    description: "Anúncio de evento especial para tráfego pago",
    imageUrl: "anuncio-evento.jpg",
    platform: "meta",
    targetAudience: {
      age: "30-65",
      location: "20km",
      interests: ["eventos sociais", "gastronomia", "música ao vivo", "experiências"]
    }
  },
  {
    id: "paid-search",
    name: "Anúncio de Pesquisa",
    type: "paid",
    content: "Restaurante {{restaurant}} | Delivery Rápido e Grátis\nPeça agora online e receba em até 30 minutos. Primeiro pedido com 15% OFF.",
    description: "Anúncio para Google Ads",
    imageUrl: "anuncio-search.jpg",
    platform: "google",
    targetAudience: {
      keywords: ["delivery comida", "restaurante próximo", "comida italiana delivery"]
    }
  },
  {
    id: "paid-remarketing",
    name: "Anúncio de Remarketing",
    type: "paid",
    content: "Sentimos sua falta no {{restaurant}}!\nVolte e ganhe 20% de desconto em seu próximo pedido.\nUse o código: VOLTAAQUI",
    description: "Anúncio de remarketing para visitantes do site",
    imageUrl: "remarketing.jpg",
    platform: "meta",
    targetAudience: {
      remarketing: true,
      daysVisited: 30
    }
  },

  // Google My Business Templates
  {
    id: "gmb-profile-update",
    name: "Atualização de Perfil do GMB",
    type: "paid",
    content: "🏆 DESTAQUE SEU RESTAURANTE NO GOOGLE 🏆\n\nAumente sua presença no Google Meu Negócio com fotos profissionais, informações atualizadas e promoções em tempo real.\n\nGaranta mais visibilidade e clientes para {{restaurant}}.",
    description: "Campanha para otimizar o perfil do Google Meu Negócio",
    imageUrl: "gmb-profile.jpg",
    platform: "gmb",
    targetAudience: {
      location: "5km",
      interests: ["gastronomia local", "restaurantes próximos"]
    }
  },
  {
    id: "gmb-reviews",
    name: "Campanha de Avaliações GMB",
    type: "paid",
    content: "⭐⭐⭐⭐⭐ VALORIZE SUA OPINIÃO!\n\nSua experiência no {{restaurant}} foi especial? Compartilhe sua avaliação no Google e ganhe 10% de desconto em sua próxima visita!\n\nAvalie-nos: [LINK]",
    description: "Campanha para incentivar avaliações no Google Meu Negócio",
    imageUrl: "gmb-reviews.jpg",
    platform: "gmb",
    targetAudience: {
      remarketing: true,
      daysVisited: 7
    }
  },
  {
    id: "gmb-local-post",
    name: "Post Local no GMB",
    type: "paid",
    content: "🍽️ NOVIDADE NO CARDÁPIO! 🍽️\n\nApresenta com exclusividade no {{restaurant}} nosso novo prato sensação: {{dish}}!\n\nDisponível por tempo limitado. Reserve já!",
    description: "Post local destacando novidades do restaurante",
    imageUrl: "gmb-local-post.jpg",
    platform: "gmb",
    targetAudience: {
      location: "3km",
      interests: ["gastronomia", "novidades culinárias"]
    }
  },
  {
    id: "gmb-evento",
    name: "Evento no GMB",
    type: "paid",
    content: "🎵 NOITE ESPECIAL DE {{event}} 🎵\n\nO {{restaurant}} convida você para uma experiência gastronômica com música ao vivo!\n\nData: {{date}} às {{time}}. Reserve sua mesa: {{phone}}",
    description: "Divulgação de evento no Google Meu Negócio",
    imageUrl: "gmb-evento.jpg",
    platform: "gmb",
    targetAudience: {
      location: "7km",
      interests: ["eventos gastronômicos", "música ao vivo", "experiências culinárias"]
    }
  },
  {
    id: "gmb-promocao",
    name: "Promoção no GMB",
    type: "paid",
    content: "🔥 PROMOÇÃO DE {{promotion}} 🔥\n\nApenas esta semana no {{restaurant}}!\n\nTodos os {{items}} com {{discount}}% de desconto de segunda a quinta.\n\nReserve: {{phone}}",
    description: "Anúncio de promoção no Google Meu Negócio",
    imageUrl: "gmb-promocao.jpg",
    platform: "gmb",
    targetAudience: {
      location: "5km"
    }
  },

  // Templates de RCS
  {
    id: "rcs-welcome",
    name: "Boas-vindas RCS",
    type: "rcs",
    content: "Olá {{name}}! 👋 Bem-vindo(a) ao *{{restaurant}}*! Aproveite a experiência rica do RCS com imagens, carrosséis e botões interativos. Salve nosso contato!",
    description: "Mensagem de boas-vindas usando RCS",
    audienceType: "segment",
    audienceSegmentId: "new-customers-rcs",
    audienceSize: 17,
    imageUrl: "rcs-boas-vindas.jpg"
  },
  {
    id: "rcs-promo",
    name: "Promoção do Dia RCS",
    type: "rcs",
    content: "Olá {{name}}! 🎉 Promoção especial hoje no {{restaurant}}! Aproveite {{discount}}% de desconto em todos os pratos principais. Botões interativos no RCS para você fazer seu pedido diretamente.",
    description: "Promoção do dia usando recursos interativos do RCS",
    audienceType: "all",
    audienceSize: 42,
    imageUrl: "rcs-promocao.jpg"
  },
  {
    id: "rcs-menu",
    name: "Menu Digital RCS",
    type: "rcs",
    content: "Confira nosso cardápio digital interativo, {{name}}! Navegue pelas categorias, veja fotos dos pratos e faça seu pedido diretamente por este canal RCS. Uma experiência completa sem precisar baixar nenhum aplicativo!",
    description: "Menu digital interativo usando RCS",
    audienceType: "segment",
    audienceSegmentId: "rcs-enabled",
    audienceSize: 23,
    imageUrl: "rcs-menu.jpg"
  }
];

// Helper function to get templates by category
export const getTemplatesByCategory = (category: string): CampaignTemplate[] => {
  return campaignTemplates.filter(template => template.category === category);
};

// Helper function to get templates by type
export const getTemplatesByType = (type: string): CampaignTemplate[] => {
  return campaignTemplates.filter(template => template.type === type);
};

// Helper function to get messaging templates (WhatsApp, SMS, Email, RCS)
export const getMessagingTemplates = (): CampaignTemplate[] => {
  return campaignTemplates.filter(template => 
    template.type === "whatsapp" || 
    template.type === "sms" || 
    template.type === "email" || 
    template.type === "rcs"
  );
};

// Helper function to get paid traffic templates
export const getPaidTrafficTemplates = (): CampaignTemplate[] => {
  return campaignTemplates.filter(template => template.type === "paid");
};

// Helper function to get all categories
export const getAllCategories = (): string[] => {
  const categories = new Set<string>();
  campaignTemplates.forEach(template => {
    if (template.category) categories.add(template.category);
  });
  return Array.from(categories);
};
