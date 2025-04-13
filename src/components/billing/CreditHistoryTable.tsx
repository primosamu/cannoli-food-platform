
import React from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

export interface CreditTransaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'phone' | 'message' | 'campaign' | 'purchase';
  status: 'completed' | 'pending' | 'failed';
}

interface CreditHistoryTableProps {
  transactions: CreditTransaction[];
  showViewAll?: boolean;
}

export const CreditHistoryTable: React.FC<CreditHistoryTableProps> = ({ 
  transactions, 
  showViewAll = true 
}) => {
  const { translations } = useLanguage();
  
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'completed':
        return "text-green-700 bg-green-100 px-2 py-1 rounded-full text-xs";
      case 'pending':
        return "text-yellow-700 bg-yellow-100 px-2 py-1 rounded-full text-xs";
      case 'failed':
        return "text-red-700 bg-red-100 px-2 py-1 rounded-full text-xs";
      default:
        return "text-gray-700 bg-gray-100 px-2 py-1 rounded-full text-xs";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'phone':
        return "🔍"; // Magnifying glass for phone enrichment
      case 'message':
        return "💬"; // Message bubble
      case 'campaign':
        return "📣"; // Megaphone for campaigns
      case 'purchase':
        return "💰"; // Money bag for purchases
      default:
        return "📋"; // Default icon
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{translations.settings.creditHistory}</CardTitle>
        <CardDescription>
          {translations.settings.creditsUsage}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{translations.settings.date}</TableHead>
              <TableHead>{translations.settings.description}</TableHead>
              <TableHead className="text-right">{translations.settings.amount}</TableHead>
              <TableHead>{translations.settings.status}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>{transaction.date}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <span className="mr-2">{getTypeIcon(transaction.type)}</span>
                    {transaction.description}
                  </div>
                </TableCell>
                <TableCell className={`text-right ${transaction.type === 'purchase' ? 'text-green-600' : 'text-red-600'}`}>
                  {transaction.type === 'purchase' ? '+' : '-'}{transaction.amount}
                </TableCell>
                <TableCell>
                  <span className={getStatusBadgeClass(transaction.status)}>
                    {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      {showViewAll && (
        <CardFooter className="flex justify-center">
          <Button variant="outline">
            {translations.settings.viewAllHistory}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};
