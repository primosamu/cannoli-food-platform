
import { MenuItem, MenuCategory, MenuType, DeliveryPlatform } from "@/types/menu";
import { randomBool, randomInt, randomItem } from "@/utils/dataGenerationUtils";

// Generate a more comprehensive menu dataset
export const generateMenuCategories = (): MenuCategory[] => {
  return [
    { id: "1", name: "Entradas", description: "Comece sua refeição bem", active: true, order: 1 },
    { id: "2", name: "Pratos Principais", description: "Nossos pratos especiais", active: true, order: 2 },
    { id: "3", name: "Massas", description: "Especialidades italianas", active: true, order: 3 },
    { id: "4", name: "Pizzas", description: "Pizzas artesanais", active: true, order: 4 },
    { id: "5", name: "Sobremesas", description: "Finais doces", active: true, order: 5 },
    { id: "6", name: "Bebidas", description: "Bebidas e refrescos", active: true, order: 6 },
    { id: "7", name: "Frutos do Mar", description: "Frescos do oceano", active: true, order: 7 },
    { id: "8", name: "Saladas", description: "Opções saudáveis", active: true, order: 8 },
    { id: "9", name: "Menu Infantil", description: "Para os pequenos", active: true, order: 9 },
    { id: "10", name: "Especiais do Chef", description: "Criações exclusivas", active: true, order: 10 },
    { id: "11", name: "Opções Veganas", description: "Pratos à base de plantas", active: true, order: 11 },
    { id: "12", name: "Itens Sazonais", description: "Ofertas por tempo limitado", active: false, order: 12 },
  ];
};

// Sample appetizers
const appetizers: Partial<MenuItem>[] = [
  { name: "Pão de Alho", description: "Pão tostado com manteiga de alho e ervas", category: "1", featured: true },
  { name: "Bruschetta", description: "Torradas cobertas com tomate picado, manjericão e vinagre balsâmico", category: "1" },
  { name: "Lula à Dorê", description: "Lula crocante frita servida com molho marinara", category: "1" },
  { name: "Palitos de Queijo", description: "Palitos de queijo empanados e fritos com molho marinara", category: "1" },
  { name: "Pasta de Espinafre com Alcachofra", description: "Pasta cremosa de espinafre e alcachofra com chips de tortilha", category: "1" },
  { name: "Asinhas de Frango", description: "Asinhas de frango apimentadas com molho de queijo azul", category: "1" },
  { name: "Coquetel de Camarão", description: "Camarões grandes gelados com molho cocktail", category: "1" }
];

// Sample main courses
const mainCourses: Partial<MenuItem>[] = [
  { name: "Filé Mignon", description: "Filé mignon de 230g com manteiga de alho", category: "2", featured: true },
  { name: "Salmão Grelhado", description: "Salmão fresco do Atlântico com molho de limão e ervas", category: "2" },
  { name: "Frango à Parmegiana", description: "Frango empanado com molho marinara e mussarela", category: "2" },
  { name: "Pato Assado", description: "Meio pato com molho de laranja e legumes da estação", category: "2", featured: true },
  { name: "Costeletas de Cordeiro", description: "Costeletas de cordeiro grelhadas com molho de menta", category: "2" },
  { name: "Lombo de Porco", description: "Lombo de porco com crosta de ervas e compota de maçã", category: "2" },
  { name: "Boeuf Bourguignon", description: "Clássico ensopado francês de carne com vinho tinto", category: "2" }
];

// Sample pastas
const pastas: Partial<MenuItem>[] = [
  { name: "Espaguete à Carbonara", description: "Espaguete com molho cremoso, bacon e parmesão", category: "3" },
  { name: "Fettuccine Alfredo", description: "Fettuccine em molho cremoso", category: "3" },
  { name: "Lasanha", description: "Camadas de massa com molho de carne e queijos", category: "3", featured: true },
  { name: "Penne ao Molho Vodka", description: "Massa penne em molho cremoso de tomate com vodka", category: "3" },
  { name: "Linguine com Vôngole", description: "Linguine com vôngoles frescos em molho de vinho branco", category: "3" },
  { name: "Ravioli", description: "Ravioli recheado com queijo ao molho de tomate", category: "3" },
  { name: "Nhoque", description: "Nhoque de batata ao molho de manteiga e sálvia", category: "3" }
];

// Sample pizzas
const pizzas: Partial<MenuItem>[] = [
  { name: "Pizza Margherita", description: "Pizza clássica com molho de tomate, muçarela e manjericão fresco", category: "4" },
  { name: "Pizza de Pepperoni", description: "Pizza com molho de tomate, muçarela e pepperoni", category: "4", featured: true },
  { name: "Pizza Vegetariana", description: "Pizza com legumes variados e muçarela", category: "4" },
  { name: "Quatro Queijos", description: "Pizza com quatro queijos: muçarela, gorgonzola, parmesão e ricota", category: "4" },
  { name: "Pizza Havaiana", description: "Pizza com presunto e abacaxi", category: "4" },
  { name: "Pizza de Frango com BBQ", description: "Pizza com molho barbecue, frango e cebola roxa", category: "4" },
  { name: "Pizza de Cogumelos e Trufa", description: "Pizza com cogumelos e óleo de trufa", category: "4", featured: true }
];

// Sample desserts
const desserts: Partial<MenuItem>[] = [
  { name: "Tiramisu", description: "Sobremesa italiana com café e mascarpone", category: "5" },
  { name: "Bolo de Lava de Chocolate", description: "Bolo de chocolate quente com centro derretido", category: "5", featured: true },
  { name: "Cheesecake de Nova York", description: "Cheesecake clássico com base de biscoito", category: "5" },
  { name: "Crème Brûlée", description: "Creme de baunilha com topo de açúcar caramelizado", category: "5" },
  { name: "Torta de Maçã", description: "Torta tradicional de maçã com canela", category: "5" },
  { name: "Panna Cotta", description: "Sobremesa italiana de creme com calda de frutas vermelhas", category: "5" },
  { name: "Cannoli", description: "Tubos de massa siciliana recheados com ricota doce", category: "5", featured: true }
];

// Sample beverages
const beverages: Partial<MenuItem>[] = [
  { name: "Água com Gás", description: "Água gaseificada refrescante", category: "6" },
  { name: "Vinho Tinto da Casa", description: "Taça do nosso vinho tinto da casa", category: "6" },
  { name: "Vinho Branco da Casa", description: "Taça do nosso vinho branco da casa", category: "6" },
  { name: "Chopp", description: "Chopp artesanal local", category: "6" },
  { name: "Café Espresso", description: "Dose única de café espresso encorpado", category: "6" },
  { name: "Cappuccino", description: "Espresso com espuma de leite vaporizado", category: "6" },
  { name: "Suco de Laranja", description: "Suco de laranja natural", category: "6" }
];

// Combine all menu items
const generateCompleteMenuItem = (item: Partial<MenuItem>, index: number): MenuItem => {
  const basePrice = randomInt(10, 60);
  
  return {
    id: `${item.category}-${index}`,
    name: item.name!,
    description: item.description!,
    category: item.category!,
    imageUrl: item.imageUrl || undefined,
    prices: {
      delivery: basePrice + randomInt(2, 5),
      qr_table: basePrice,
      in_person: basePrice,
      self_service: basePrice - randomInt(0, 3),
    },
    active: randomBool(0.9),
    status: randomBool(0.95) ? "available" : randomBool(0.5) ? "out_of_stock" : "coming_soon",
    variants: item.variants || (randomBool(0.3) ? [
      { id: `var-${item.category}-${index}-1`, name: "Regular", priceAdjustment: 0 },
      { id: `var-${item.category}-${index}-2`, name: "Grande", priceAdjustment: randomInt(5, 15) }
    ] : undefined),
    additionalOptions: item.additionalOptions || (randomBool(0.4) ? [
      { id: `opt-${item.category}-${index}-1`, name: "Queijo extra", price: 3, maxSelections: 1 },
      { id: `opt-${item.category}-${index}-2`, name: "Molho extra", price: 2, maxSelections: 1 }
    ] : undefined),
    allergens: item.allergens || (randomBool(0.6) ? 
      randomItem([
        ["glúten", "laticínios"],
        ["nozes"],
        ["frutos do mar"],
        ["soja", "glúten"],
        []
      ]) : undefined),
    nutritionalInfo: item.nutritionalInfo || (randomBool(0.3) ? {
      calories: randomInt(200, 800),
      protein: randomInt(5, 40),
      carbs: randomInt(10, 80),
      fat: randomInt(5, 30)
    } : undefined),
    prepTime: item.prepTime || randomInt(10, 30),
    featured: item.featured || randomBool(0.1),
    platforms: {
      ifood: randomBool(0.9),
      rappi: randomBool(0.8),
      anota_ai: randomBool(0.7),
      uber_eats: randomBool(0.8),
      internal: true
    },
    tags: item.tags || (randomBool(0.5) ? 
      randomItem([
        ["picante", "popular"],
        ["vegetariano"],
        ["vegano"],
        ["sem glúten"],
        ["escolha do chef"]
      ]) : undefined)
  };
};

// Combine all items and apply complete properties
export const generateMenuItems = (): MenuItem[] => {
  const allItems = [
    ...appetizers.map((item, i) => generateCompleteMenuItem(item, i)),
    ...mainCourses.map((item, i) => generateCompleteMenuItem(item, i + 100)),
    ...pastas.map((item, i) => generateCompleteMenuItem(item, i + 200)),
    ...pizzas.map((item, i) => generateCompleteMenuItem(item, i + 300)),
    ...desserts.map((item, i) => generateCompleteMenuItem(item, i + 400)),
    ...beverages.map((item, i) => generateCompleteMenuItem(item, i + 500))
  ];
  
  // Add some seafood items
  const seafoodItems = [
    { name: "Polvo Grelhado", description: "Polvo grelhado macio com azeite e ervas", category: "7" },
    { name: "Cauda de Lagosta", description: "Cauda de lagosta grelhada com manteiga derretida", category: "7", featured: true },
    { name: "Camarão ao Alho", description: "Camarão refogado em manteiga de alho e vinho branco", category: "7" },
    { name: "Peixe e Batatas", description: "Bacalhau empanado em cerveja com batatas fritas", category: "7" },
    { name: "Mexilhões à Marinière", description: "Mexilhões no vapor com molho de vinho branco", category: "7" }
  ].map((item, i) => generateCompleteMenuItem(item, i + 600));
  
  // Add some salads
  const salads = [
    { name: "Salada Caesar", description: "Alface romana fresca com molho Caesar, croutons e parmesão", category: "8" },
    { name: "Salada Grega", description: "Mix de folhas com queijo feta, azeitonas e cebola roxa", category: "8" },
    { name: "Salada Caprese", description: "Tomate, muçarela fresca e manjericão com vinagre balsâmico", category: "8", featured: true },
    { name: "Salada Cobb", description: "Mix de folhas com frango, bacon, ovo, abacate e queijo azul", category: "8" }
  ].map((item, i) => generateCompleteMenuItem(item, i + 700));
  
  // Add kids menu
  const kidsMenu = [
    { name: "Tiras de Frango", description: "Tiras de frango empanadas com batatas fritas", category: "9" },
    { name: "Macarrão com Queijo", description: "Macarrão cremoso com queijo", category: "9" },
    { name: "Mini Pizza", description: "Pizza pessoal de queijo ou pepperoni", category: "9" },
    { name: "Espaguete com Almôndegas", description: "Porção infantil de espaguete com almôndegas", category: "9" }
  ].map((item, i) => generateCompleteMenuItem(item, i + 800));
  
  // Chef's specials
  const chefsSpecials = [
    { name: "Wellington de Filé", description: "Filé mignon em massa folhada com duxelles de cogumelos", category: "10", featured: true },
    { name: "Risoto de Trufas", description: "Risoto cremoso com trufas negras e parmesão", category: "10" },
    { name: "Surf and Turf", description: "Filé mignon e cauda de lagosta", category: "10", featured: true }
  ].map((item, i) => generateCompleteMenuItem(item, i + 900));
  
  // Vegan options
  const veganOptions = [
    { name: "Hambúrguer de Plantas", description: "Hambúrguer à base de plantas com queijo vegano e acompanhamentos", category: "11" },
    { name: "Pad Thai Vegano", description: "Macarrão de arroz com tofu e legumes em molho de tamarindo", category: "11" },
    { name: "Risoto de Cogumelos", description: "Risoto cremoso com cogumelos variados", category: "11", featured: true }
  ].map((item, i) => generateCompleteMenuItem(item, i + 1000));
  
  // Seasonal items
  const seasonalItems = [
    { name: "Salada de Frutas Vermelhas", description: "Mix de folhas com frutas vermelhas frescas e vinagrete cítrico", category: "12" },
    { name: "Ravioli de Abóbora", description: "Massa recheada com abóbora e manteiga de sálvia", category: "12", featured: true }
  ].map((item, i) => generateCompleteMenuItem(item, i + 1100));
  
  return [
    ...allItems,
    ...seafoodItems,
    ...salads,
    ...kidsMenu,
    ...chefsSpecials,
    ...veganOptions,
    ...seasonalItems
  ];
};

// Export pre-generated data
export const sampleCategories = generateMenuCategories();
export const sampleMenuItems = generateMenuItems();
