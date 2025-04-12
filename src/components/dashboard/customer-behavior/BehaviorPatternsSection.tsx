
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Clock, Calendar, Coffee, Utensils, Cloud } from "lucide-react";
import { 
  COLORS, mealPreferenceData, dayPreferenceData, repurchaseCategoryData, 
  beverageData, dessertData, weatherData 
} from './constants';

interface BehaviorPatternsSectionProps {
  onChartClick: (chartId: string, data?: any) => void;
}

export const BehaviorPatternsSection: React.FC<BehaviorPatternsSectionProps> = ({ onChartClick }) => {
  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Customer Behavior Patterns</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Orders per Preferred Meal
            </CardTitle>
            <CardDescription>
              Customer meal time preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart onClick={() => onChartClick('meal-preference')}>
                <Pie
                  data={mealPreferenceData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {mealPreferenceData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={COLORS[index % COLORS.length]} 
                      onClick={() => onChartClick('meal-preference', entry)}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Customers per Day Preference
            </CardTitle>
            <CardDescription>
              Weekday vs. weekend ordering patterns
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={dayPreferenceData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                onClick={() => onChartClick('day-preference')}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar 
                  dataKey="value" 
                  fill="#4CAF50"
                  onClick={(data) => onChartClick('day-preference', data)}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Timer className="h-5 w-5" />
              Customers per Repurchase Category
            </CardTitle>
            <CardDescription>
              Time between consecutive purchases
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={repurchaseCategoryData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                onClick={() => onChartClick('repurchase-category')}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar 
                  dataKey="value" 
                  fill="#2196F3"
                  onClick={(data) => onChartClick('repurchase-category', data)}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Coffee className="h-5 w-5" />
              Customers per Beverage Included
            </CardTitle>
            <CardDescription>
              Beverage ordering patterns
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart onClick={() => onChartClick('beverage-preference')}>
                <Pie
                  data={beverageData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {beverageData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={COLORS[index % COLORS.length]} 
                      onClick={() => onChartClick('beverage-preference', entry)}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Utensils className="h-5 w-5" />
              Customers per Dessert
            </CardTitle>
            <CardDescription>
              Dessert ordering patterns
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart onClick={() => onChartClick('dessert-preference')}>
                <Pie
                  data={dessertData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {dessertData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={COLORS[index % COLORS.length]} 
                      onClick={() => onChartClick('dessert-preference', entry)}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Cloud className="h-5 w-5" />
              Customers per Weather Preference
            </CardTitle>
            <CardDescription>
              Weather patterns and order behavior
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart onClick={() => onChartClick('weather-preference')}>
                <Pie
                  data={weatherData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {weatherData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={COLORS[index % COLORS.length]} 
                      onClick={() => onChartClick('weather-preference', entry)}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Add missing import
import { Timer } from "lucide-react";
