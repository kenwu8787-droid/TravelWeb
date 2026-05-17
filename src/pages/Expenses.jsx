import React, { useState, useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Calculator } from 'lucide-react';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

export default function Expenses() {
  const { trip } = useOutletContext();
  const [exchangeRate, setExchangeRate] = useState(0.21);

  // Group and sum expenses by category
  const data = useMemo(() => {
    const grouped = trip.expenses.reduce((acc, exp) => {
      acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
      return acc;
    }, {});
    
    return Object.entries(grouped).map(([name, value]) => ({
      name,
      value,
      // Convert to home currency based on user input rate
      convertedValue: value * exchangeRate
    }));
  }, [trip.expenses, exchangeRate]);

  const totalBase = data.reduce((sum, item) => sum + item.value, 0);
  const totalConverted = data.reduce((sum, item) => sum + item.convertedValue, 0);

  // Custom Label for Recharts
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
    const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));
  
    return percent > 0.05 ? (
      <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" className="text-xs font-bold">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    ) : null;
  };

  return (
    <div className="p-5 space-y-6">
      
      {/* Exchange Rate Card */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 bg-green-100 text-green-700 text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wide">
          Today's Rate API
        </div>
        
        <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
          <Calculator size={20} className="mr-2 text-blue-500" />
          Base Exchange Rate
        </h2>
        
        <div className="flex items-center space-x-3">
          <span className="text-gray-500 font-medium">1 JPY =</span>
          <div className="relative flex-1">
            <input
              type="number"
              step="0.01"
              value={exchangeRate}
              onChange={(e) => setExchangeRate(Number(e.target.value))}
              className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-semibold"
            />
            <span className="absolute right-4 top-3.5 text-gray-400 font-medium">TWD</span>
          </div>
        </div>
      </div>

      {/* Chart Card */}
      <div className="bg-white rounded-[2rem] p-5 shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-gray-900 mb-1">Expense Breakdown</h2>
        <p className="text-sm text-gray-500 mb-6">Total: ~{totalConverted.toLocaleString('zh-TW', { style: 'currency', currency: 'TWD', maximumFractionDigits: 0 })}</p>
        
        <div className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={100}
                fill="#8884d8"
                dataKey="convertedValue"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => `${value.toLocaleString('zh-TW', { style: 'currency', currency: 'TWD', maximumFractionDigits: 0 })}`}
              />
              <Legend verticalAlign="bottom" height={36} iconType="circle" />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Breakdown List */}
        <div className="mt-6 space-y-3">
          {data.map((item, index) => (
            <div key={item.name} className="flex justify-between items-center p-3 rounded-xl bg-gray-50">
              <div className="flex items-center">
                <div 
                  className="w-3 h-3 rounded-full mr-3" 
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
                <span className="font-medium text-gray-700">{item.name}</span>
              </div>
              <div className="text-right">
                <div className="font-bold text-gray-900">
                  {item.convertedValue.toLocaleString('zh-TW', { style: 'currency', currency: 'TWD', maximumFractionDigits: 0 })}
                </div>
                <div className="text-xs text-gray-500">
                  {item.value.toLocaleString('ja-JP')} JPY
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
