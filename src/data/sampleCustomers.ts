
import { Customer } from "@/components/customers/CustomerList";

export const sampleCustomers: Customer[] = [
  {
    id: "cust-1",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "(555) 123-4567",
    orderCount: 12,
    lastOrderDate: new Date("2025-04-02"),
    totalSpent: 246.80,
    tags: ["regular", "delivery"],
    joinDate: new Date("2024-10-15")
  },
  {
    id: "cust-2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "(555) 987-6543",
    orderCount: 8,
    lastOrderDate: new Date("2025-03-28"),
    totalSpent: 187.25,
    tags: ["vip", "dine-in"],
    joinDate: new Date("2024-11-03")
  },
  {
    id: "cust-3",
    name: "Michael Johnson",
    email: "michael.j@example.com",
    phone: "(555) 456-7890",
    orderCount: 15,
    lastOrderDate: new Date("2025-04-05"),
    totalSpent: 325.50,
    tags: ["regular", "pickup"],
    joinDate: new Date("2024-09-22")
  },
  {
    id: "cust-4",
    name: "Emily Williams",
    email: "emily.w@example.com",
    phone: "(555) 234-5678",
    orderCount: 6,
    lastOrderDate: new Date("2025-03-15"),
    totalSpent: 98.75,
    tags: ["new", "delivery"],
    joinDate: new Date("2025-01-10")
  },
  {
    id: "cust-5",
    name: "Robert Brown",
    email: "robert.b@example.com",
    phone: "(555) 876-5432",
    orderCount: 20,
    lastOrderDate: new Date("2025-04-01"),
    totalSpent: 487.30,
    tags: ["vip", "catering"],
    joinDate: new Date("2024-08-05")
  },
  {
    id: "cust-6",
    name: "Sarah Davis",
    email: "sarah.d@example.com",
    phone: "(555) 345-6789",
    orderCount: 9,
    lastOrderDate: new Date("2025-03-25"),
    totalSpent: 162.40,
    tags: ["regular", "dine-in"],
    joinDate: new Date("2024-12-12")
  }
];
