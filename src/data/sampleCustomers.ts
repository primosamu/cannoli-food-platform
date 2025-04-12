
import { Customer } from "@/components/customers/CustomerList";
import { randomItem, randomInt, randomBool, randomPastDate, generateCPF, generatePhoneNumber, generateEmail, generateAddress } from "@/utils/dataGenerationUtils";

// First names and last names for generating customer data
const firstNames = [
  "João", "Maria", "Pedro", "Ana", "Lucas", "Juliana", "Gabriel", "Fernanda", "Rafael", "Mariana",
  "Carlos", "Patricia", "Paulo", "Amanda", "Bruno", "Camila", "Daniel", "Aline", "Eduardo", "Bianca",
  "Felipe", "Carla", "Gustavo", "Débora", "Henrique", "Elisa", "Igor", "Flávia", "José", "Gabriela",
  "Leandro", "Helena", "Marcelo", "Isabela", "Nicolas", "Jéssica", "Otávio", "Karina", "Rodrigo", "Laura"
];

const lastNames = [
  "Silva", "Santos", "Oliveira", "Souza", "Rodrigues", "Ferreira", "Alves", "Lima", "Pereira", "Costa",
  "Gomes", "Ribeiro", "Martins", "Carvalho", "Almeida", "Lopes", "Soares", "Fernandes", "Vieira", "Barbosa",
  "Rocha", "Dias", "Nascimento", "Andrade", "Moreira", "Nunes", "Marques", "Machado", "Mendes", "Freitas",
  "Cardoso", "Ramos", "Gonçalves", "Santana", "Teixeira", "Araújo", "Cavalcanti", "Pinto", "Correia", "Peixoto"
];

// Customer tags for segmentation
const customerTags = ["regular", "vip", "new", "delivery", "dine-in", "pickup", "catering", "vegetarian", "family", "business"];

// Generate a single customer
const generateCustomer = (id: string): Customer => {
  const firstName = randomItem(firstNames);
  const lastName = randomItem(lastNames);
  const name = `${firstName} ${lastName}`;
  const joinDate = randomPastDate(500);
  const orderCount = randomInt(0, 50);
  const lastOrderDate = orderCount > 0 ? randomPastDate(60) : undefined;
  const tags = Array.from(
    { length: randomInt(1, 3) }, 
    () => randomItem(customerTags)
  ).filter((value, index, self) => self.indexOf(value) === index); // Remove duplicates
  
  return {
    id,
    name,
    email: generateEmail(name),
    phone: randomBool(0.9) ? generatePhoneNumber() : "",
    orderCount,
    lastOrderDate: lastOrderDate as Date | undefined,
    totalSpent: Number((orderCount * randomInt(15, 80)).toFixed(2)),
    tags,
    joinDate,
    cpf: generateCPF(),
    address: randomBool(0.7) ? generateAddress() : undefined,
    birthDate: randomBool(0.6) ? randomPastDate(10000) : undefined,
    notes: randomBool(0.3) ? `Customer prefers ${randomItem(['quiet seating', 'window tables', 'quick service', 'extra attention'])}` : undefined
  };
};

// Generate a larger sample of customers
const generateManyCustomers = (count: number): Customer[] => {
  return Array.from({ length: count }, (_, i) => generateCustomer(`cust-${i+1}`));
};

// Export a reasonable number of sample customers (100 for demo purposes)
export const sampleCustomers: Customer[] = generateManyCustomers(100);

// Helper functions for customer segments
export const getVipCustomers = () => sampleCustomers.filter(c => c.tags.includes("vip"));
export const getRegularCustomers = () => sampleCustomers.filter(c => c.tags.includes("regular"));
export const getNewCustomers = () => sampleCustomers.filter(c => c.tags.includes("new"));
export const getCustomersByTag = (tag: string) => sampleCustomers.filter(c => c.tags.includes(tag));
