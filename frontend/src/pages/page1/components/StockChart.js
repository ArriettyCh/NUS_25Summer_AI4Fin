// components/StockChart.js - 支持多语言
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { translations, formatText } from '../utils/translations';

const StockChart = ({ data, currentWeek, language }) => {
  const t = translations[language];

  return (
    <div className="stock-chart">
      <h3>{t.stockPriceTrend}</h3>
      <div className="chart-container">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="week" 
              label={{ value: t.week, position: 'insideBottom', offset: -5 }}
              tick={{ fontSize: 12 }}
            />
            <YAxis 
              label={{ value: t.price, angle: -90, position: 'insideLeft' }}
              tick={{ fontSize: 12 }}
            />
            <Tooltip 
              formatter={(value) => [`¥${value.toFixed(2)}`, t.stockPrice]}
              labelFormatter={(week) => formatText(t.currentWeek, { week })}
            />
            <Line 
              type="monotone" 
              dataKey="price" 
              stroke="#2196F3" 
              strokeWidth={2}
              dot={{ fill: '#2196F3', strokeWidth: 2, r: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="current-week-indicator">
        {formatText(t.currentWeek, { week: currentWeek })}
        {data[currentWeek] && (
          <span> - {formatText(t.currentPrice, { price: data[currentWeek].price.toFixed(2) })}</span>
        )}
      </div>
    </div>
  );
};

export default StockChart;
