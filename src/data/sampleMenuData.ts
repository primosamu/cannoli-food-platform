
import { MenuItem, MenuCategory, MenuType, DeliveryPlatform } from "@/types/menu";
import { randomBool, randomInt } from "@/utils/dataGenerationUtils";

// Generate a more comprehensive menu dataset
export const generateMenuCategories = (): MenuCategory[] => {
  return [
    { id: "1", name: "Appetizers", description: "Start your meal right", active: true, order: 1 },
    { id: "2", name: "Main Courses", description: "Our signature dishes", active: true, order: 2 },
    { id: "3", name: "Pastas", description: "Italian specialties", active: true, order: 3 },
    { id: "4", name: "Pizzas", description: "Hand-crafted pizzas", active: true, order: 4 },
    { id: "5", name: "Desserts", description: "Sweet endings", active: true, order: 5 },
    { id: "6", name: "Beverages", description: "Drinks and refreshments", active: true, order: 6 },
    { id: "7", name: "Seafood", description: "Fresh from the ocean", active: true, order: 7 },
    { id: "8", name: "Salads", description: "Healthy greens", active: true, order: 8 },
    { id: "9", name: "Kids Menu", description: "For the little ones", active: true, order: 9 },
    { id: "10", name: "Chef's Specials", description: "Exclusive creations", active: true, order: 10 },
    { id: "11", name: "Vegan Options", description: "Plant-based dishes", active: true, order: 11 },
    { id: "12", name: "Seasonal Items", description: "Limited time offerings", active: false, order: 12 },
  ];
};

// Sample appetizers
const appetizers: Partial<MenuItem>[] = [
  { name: "Garlic Bread", description: "Toasted bread with garlic butter and herbs", category: "1", featured: true },
  { name: "Bruschetta", description: "Toasted bread topped with diced tomatoes, basil, and balsamic glaze", category: "1" },
  { name: "Calamari Fritti", description: "Crispy fried calamari served with marinara sauce", category: "1" },
  { name: "Mozzarella Sticks", description: "Breaded and fried mozzarella with marinara dipping sauce", category: "1" },
  { name: "Spinach Artichoke Dip", description: "Creamy spinach and artichoke dip with tortilla chips", category: "1" },
  { name: "Buffalo Wings", description: "Spicy chicken wings with blue cheese dip", category: "1" },
  { name: "Shrimp Cocktail", description: "Chilled jumbo shrimp with cocktail sauce", category: "1" }
];

// Sample main courses
const mainCourses: Partial<MenuItem>[] = [
  { name: "Filet Mignon", description: "8oz tenderloin steak with garlic butter", category: "2", featured: true },
  { name: "Grilled Salmon", description: "Fresh Atlantic salmon with lemon herb sauce", category: "2" },
  { name: "Chicken Parmesan", description: "Breaded chicken topped with marinara and mozzarella", category: "2" },
  { name: "Roast Duck", description: "Half duck with orange glaze and seasonal vegetables", category: "2", featured: true },
  { name: "Lamb Chops", description: "Grilled lamb chops with mint sauce", category: "2" },
  { name: "Pork Tenderloin", description: "Herb-crusted pork with apple compote", category: "2" },
  { name: "Beef Bourguignon", description: "Classic French beef stew with red wine", category: "2" }
];

// Sample pastas
const pastas: Partial<MenuItem>[] = [
  { name: "Spaghetti Carbonara", description: "Spaghetti with creamy sauce, bacon, and parmesan", category: "3" },
  { name: "Fettuccine Alfredo", description: "Fettuccine in rich creamy sauce", category: "3" },
  { name: "Lasagna", description: "Layered pasta with meat sauce and cheeses", category: "3", featured: true },
  { name: "Penne alla Vodka", description: "Penne pasta in creamy tomato vodka sauce", category: "3" },
  { name: "Linguine with Clams", description: "Linguine with fresh clams in white wine sauce", category: "3" },
  { name: "Ravioli", description: "Cheese-filled ravioli with tomato sauce", category: "3" },
  { name: "Gnocchi", description: "Potato dumplings in sage butter sauce", category: "3" }
];

// Sample pizzas
const pizzas: Partial<MenuItem>[] = [
  { name: "Margherita Pizza", description: "Classic pizza with tomato sauce, mozzarella, and fresh basil", category: "4" },
  { name: "Pepperoni Pizza", description: "Pizza with tomato sauce, mozzarella, and pepperoni", category: "4", featured: true },
  { name: "Vegetarian Pizza", description: "Pizza with assorted vegetables and mozzarella", category: "4" },
  { name: "Quattro Formaggi", description: "Four cheese pizza with mozzarella, gorgonzola, parmesan, and ricotta", category: "4" },
  { name: "Hawaiian Pizza", description: "Pizza with ham and pineapple", category: "4" },
  { name: "BBQ Chicken Pizza", description: "Pizza with BBQ sauce, chicken, and red onions", category: "4" },
  { name: "Mushroom Truffle Pizza", description: "Pizza with mushrooms and truffle oil", category: "4", featured: true }
];

// Sample desserts
const desserts: Partial<MenuItem>[] = [
  { name: "Tiramisu", description: "Italian coffee-flavored dessert with mascarpone", category: "5" },
  { name: "Chocolate Lava Cake", description: "Warm chocolate cake with molten center", category: "5", featured: true },
  { name: "New York Cheesecake", description: "Classic cheesecake with graham cracker crust", category: "5" },
  { name: "Crème Brûlée", description: "Vanilla custard with caramelized sugar top", category: "5" },
  { name: "Apple Pie", description: "Traditional apple pie with cinnamon", category: "5" },
  { name: "Panna Cotta", description: "Italian cream dessert with berry coulis", category: "5" },
  { name: "Cannoli", description: "Sicilian pastry tubes filled with sweet ricotta", category: "5", featured: true }
];

// Sample beverages
const beverages: Partial<MenuItem>[] = [
  { name: "Sparkling Water", description: "Refreshing carbonated water", category: "6" },
  { name: "House Red Wine", description: "Glass of our house red wine", category: "6" },
  { name: "House White Wine", description: "Glass of our house white wine", category: "6" },
  { name: "Draft Beer", description: "Pint of local draft beer", category: "6" },
  { name: "Espresso", description: "Single shot of rich espresso", category: "6" },
  { name: "Cappuccino", description: "Espresso with steamed milk foam", category: "6" },
  { name: "Fresh Orange Juice", description: "Freshly squeezed orange juice", category: "6" }
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
      { id: `var-${item.category}-${index}-2`, name: "Large", priceAdjustment: randomInt(5, 15) }
    ] : undefined),
    additionalOptions: item.additionalOptions || (randomBool(0.4) ? [
      { id: `opt-${item.category}-${index}-1`, name: "Extra cheese", price: 3, maxSelections: 1 },
      { id: `opt-${item.category}-${index}-2`, name: "Extra sauce", price: 2, maxSelections: 1 }
    ] : undefined),
    allergens: item.allergens || (randomBool(0.6) ? 
      randomItem([
        ["gluten", "dairy"],
        ["nuts"],
        ["shellfish"],
        ["soy", "gluten"],
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
        ["spicy", "popular"],
        ["vegetarian"],
        ["vegan"],
        ["gluten-free"],
        ["chef's choice"]
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
    { name: "Grilled Octopus", description: "Tender grilled octopus with olive oil and herbs", category: "7" },
    { name: "Lobster Tail", description: "Broiled lobster tail with drawn butter", category: "7", featured: true },
    { name: "Shrimp Scampi", description: "Shrimp sautéed in garlic butter and white wine", category: "7" },
    { name: "Fish and Chips", description: "Beer-battered cod with french fries", category: "7" },
    { name: "Mussels Marinière", description: "Steamed mussels in white wine sauce", category: "7" }
  ].map((item, i) => generateCompleteMenuItem(item, i + 600));
  
  // Add some salads
  const salads = [
    { name: "Caesar Salad", description: "Fresh romaine lettuce with Caesar dressing, croutons, and parmesan", category: "8" },
    { name: "Greek Salad", description: "Mixed greens with feta, olives, and red onions", category: "8" },
    { name: "Caprese Salad", description: "Tomatoes, fresh mozzarella, and basil with balsamic glaze", category: "8", featured: true },
    { name: "Cobb Salad", description: "Mixed greens with chicken, bacon, egg, avocado, and blue cheese", category: "8" }
  ].map((item, i) => generateCompleteMenuItem(item, i + 700));
  
  // Add kids menu
  const kidsMenu = [
    { name: "Chicken Fingers", description: "Breaded chicken tenders with french fries", category: "9" },
    { name: "Mac and Cheese", description: "Creamy macaroni and cheese", category: "9" },
    { name: "Mini Pizza", description: "Personal pizza with cheese or pepperoni", category: "9" },
    { name: "Spaghetti with Meatballs", description: "Kid-sized portion of spaghetti and meatballs", category: "9" }
  ].map((item, i) => generateCompleteMenuItem(item, i + 800));
  
  // Chef's specials
  const chefsSpecials = [
    { name: "Beef Wellington", description: "Filet mignon wrapped in puff pastry with mushroom duxelles", category: "10", featured: true },
    { name: "Truffle Risotto", description: "Creamy risotto with black truffle and parmesan", category: "10" },
    { name: "Surf and Turf", description: "Filet mignon and lobster tail", category: "10", featured: true }
  ].map((item, i) => generateCompleteMenuItem(item, i + 900));
  
  // Vegan options
  const veganOptions = [
    { name: "Beyond Burger", description: "Plant-based burger with vegan cheese and toppings", category: "11" },
    { name: "Vegan Pad Thai", description: "Rice noodles with tofu and vegetables in tamarind sauce", category: "11" },
    { name: "Mushroom Risotto", description: "Creamy risotto with assorted mushrooms", category: "11", featured: true }
  ].map((item, i) => generateCompleteMenuItem(item, i + 1000));
  
  // Seasonal items
  const seasonalItems = [
    { name: "Summer Berry Salad", description: "Mixed greens with fresh berries and citrus vinaigrette", category: "12" },
    { name: "Pumpkin Ravioli", description: "Pumpkin-filled pasta with sage brown butter", category: "12", featured: true }
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
