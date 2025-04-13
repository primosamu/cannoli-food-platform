
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { useLanguage } from "@/contexts/LanguageContext";

interface CreditUsage {
  type: string;
  value: number;
  color: string;
}

interface CreditUsageChartProps {
  data: CreditUsage[];
  total: number;
}

export const CreditUsageChart: React.FC<CreditUsageChartProps> = ({ data, total }) => {
  const { translations } = useLanguage();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{translations.settings.creditsUsage}</CardTitle>
        <CardDescription>{translations.settings.availableCredits}: {total}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                nameKey="type"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Legend />
              <Tooltip formatter={(value) => [`${value} ${translations.settings.credits}`, ""]} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
