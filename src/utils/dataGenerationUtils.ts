
import { format, subDays, addDays } from "date-fns";

// Random selection from array
export const randomItem = <T>(arr: T[]): T => {
  return arr[Math.floor(Math.random() * arr.length)];
};

// Random integer between min and max (inclusive)
export const randomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Random boolean with probability
export const randomBool = (probability = 0.5): boolean => {
  return Math.random() < probability;
};

// Random date between start and end
export const randomDate = (start: Date, end: Date): Date => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

// Random past date within days
export const randomPastDate = (maxDaysAgo: number): Date => {
  return subDays(new Date(), randomInt(1, maxDaysAgo));
};

// Random future date within days
export const randomFutureDate = (maxDaysAhead: number): Date => {
  return addDays(new Date(), randomInt(1, maxDaysAhead));
};

// Generate a realistic Brazilian CPF (for demo purposes only)
export const generateCPF = (): string => {
  const randomDigits = Array.from({ length: 9 }, () => randomInt(0, 9));
  
  // Calculate first verification digit
  let sum = randomDigits.reduce((acc, digit, idx) => acc + digit * (10 - idx), 0);
  const firstDV = (sum % 11 < 2) ? 0 : 11 - (sum % 11);
  
  // Calculate second verification digit
  sum = randomDigits.reduce((acc, digit, idx) => acc + digit * (11 - idx), 0) + firstDV * 2;
  const secondDV = (sum % 11 < 2) ? 0 : 11 - (sum % 11);
  
  // Format as XXX.XXX.XXX-XX
  const cpf = [
    randomDigits.slice(0, 3).join(''),
    randomDigits.slice(3, 6).join(''),
    randomDigits.slice(6, 9).join(''),
    `${firstDV}${secondDV}`
  ].join('.');
  
  return cpf.replace(/\.(\d{2})$/, '-$1');
};

// Generate a random Brazilian phone number
export const generatePhoneNumber = (): string => {
  const ddd = randomInt(11, 99);
  const firstPart = randomInt(90000, 99999);
  const secondPart = randomInt(1000, 9999);
  
  return `(${ddd}) ${firstPart}-${secondPart}`;
};

// Generate a random email based on a name
export const generateEmail = (name: string): string => {
  const domains = ["gmail.com", "hotmail.com", "outlook.com", "yahoo.com", "uol.com.br", "terra.com.br"];
  const normalizedName = name.toLowerCase().replace(/\s+/g, ".");
  return `${normalizedName}@${randomItem(domains)}`;
};

// Generate a realistic Brazilian address
export const generateAddress = (): string => {
  const streets = ["Rua das Flores", "Avenida Brasil", "Rua São Paulo", "Avenida Paulista", 
                  "Rua 7 de Setembro", "Alameda Santos", "Rua Augusta", "Avenida Faria Lima"];
  const neighborhoods = ["Centro", "Jardins", "Vila Madalena", "Pinheiros", "Moema", "Itaim", "Bela Vista"];
  const cities = ["São Paulo", "Rio de Janeiro", "Belo Horizonte", "Salvador", "Recife", "Porto Alegre"];
  
  return `${randomItem(streets)}, ${randomInt(1, 2000)}, ${randomItem(neighborhoods)}, ${randomItem(cities)}`;
};
