
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, Treemap, XAxis, YAxis } from "recharts";
import { Timer, BarChart as BarChartIcon } from "lucide-react";
import { CustomizedTreemapContent } from './TreemapContent';
import { DollarSign } from '../DollarSign';
import { recencyData, frequencyData, monetaryData, rfmSegmentsData } from './constants';

interface RFMAnalysisSectionProps {
  onChartClick: (chartId: string, data?: any) => void;
}

export const RFMAnalysisSection: React.FC<RFMAnalysisSectionProps> = ({ onChartClick }) => {
  return (
    <div>
      <h3 className="text-lg font-medium mb-4">RFM Analysis</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Timer className="h-5 w-5" />
              Recency (Last Purchase)
            </CardTitle>
            <CardDescription>
              How recently a customer made a purchase
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={recencyData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                onClick={() => onChartClick('recency')}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="group" />
                <YAxis />
                <Tooltip content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-white border p-2 shadow-md">
                        <p className="font-medium">{payload[0].payload.group}</p>
                        <p>{payload[0].payload.description}</p>
                        <p>Customers: {payload[0].payload.value}</p>
                      </div>
                    );
                  }
                  return null;
                }} />
                <Bar 
                  dataKey="value" 
                  fill="#EF6C00"
                  onClick={(data) => onChartClick('recency', data)}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChartIcon className="h-5 w-5" />
              Frequency (Number of Orders)
            </CardTitle>
            <CardDescription>
              How often a customer makes purchases
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={frequencyData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="group" />
                <YAxis />
                <Tooltip content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-white border p-2 shadow-md">
                        <p className="font-medium">{payload[0].payload.group}</p>
                        <p>{payload[0].payload.description}</p>
                        <p>Customers: {payload[0].payload.value}</p>
                      </div>
                    );
                  }
                  return null;
                }} />
                <Bar 
                  dataKey="value" 
                  fill="#2196F3"
                  onClick={(data) => onChartClick('frequency', data)}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Monetary Value (Spending)
            </CardTitle>
            <CardDescription>
              How much a customer spends
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={monetaryData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="group" />
                <YAxis />
                <Tooltip content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-white border p-2 shadow-md">
                        <p className="font-medium">{payload[0].payload.group}</p>
                        <p>{payload[0].payload.description}</p>
                        <p>Customers: {payload[0].payload.value}</p>
                      </div>
                    );
                  }
                  return null;
                }} />
                <Bar 
                  dataKey="value" 
                  fill="#4CAF50"
                  onClick={(data) => onChartClick('monetary', data)}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            RFM Customer Segments
          </CardTitle>
          <CardDescription>
            Combined analysis of all RFM factors (11 groups)
          </CardDescription>
        </CardHeader>
        <CardContent className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <Treemap
              data={rfmSegmentsData}
              dataKey="value"
              nameKey="name"
              aspectRatio={4/3}
              stroke="#fff"
              onClick={(data) => onChartClick('rfm-segments', data)}
            >
              <Tooltip 
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-white border p-2 shadow-md">
                        <p className="font-medium">{data.name}</p>
                        <p>{data.description}</p>
                        <p>Customers: {data.value}</p>
                        <p>Percentage: {(data.value / rfmSegmentsData.reduce((sum, item) => sum + item.value, 0) * 100).toFixed(1)}%</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              {rfmSegmentsData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.fill} 
                />
              ))}
            </Treemap>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

// Add missing import
import { Users } from "lucide-react";
