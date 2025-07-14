import React, { useState } from 'react';
import './Page2.css'; // Assuming you have a CSS file for global styles
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  BarChart, 
  Bar, 
  ResponsiveContainer,
  Cell
} from 'recharts';

const Page2 = () => {
  const [selectedMode, setSelectedMode] = useState('Value');
  const [selectedChart, setSelectedChart] = useState('Confusion');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
              <p className="mt-2 text-sm text-gray-600">Interactive Data Visualization</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                Live Data
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700">Mode:</span>
              <div className="flex rounded-lg bg-gray-100 p-1">
                <button
                  onClick={() => setSelectedMode('Value')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    selectedMode === 'Value'
                      ? 'bg-blue-500 text-white shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Value Prediction
                </button>
                <button
                  onClick={() => setSelectedMode('Label')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    selectedMode === 'Label'
                      ? 'bg-blue-500 text-white shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Label Prediction
                </button>
              </div>
            </div>

            {selectedMode === 'Label' && (
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-700">Chart Type:</span>
                <div className="flex rounded-lg bg-gray-100 p-1">
                  {['Confusion', 'ROC', 'Precision'].map((chart) => (
                    <button
                      key={chart}
                      onClick={() => setSelectedChart(chart)}
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        selectedChart === chart
                          ? 'bg-indigo-500 text-white shadow-sm'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      {chart}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Chart Display */}
        <ChartDisplay mode={selectedMode} labelChart={selectedChart} />
      </div>
    </div>
  );
};

const ChartDisplay = ({ mode, labelChart }) => {
  if (mode === 'Value') {
    const data = [
      { time: 'T1', actual: 10, predicted: 9 },
      { time: 'T2', actual: 12, predicted: 11 },
      { time: 'T3', actual: 11, predicted: 12 },
      { time: 'T4', actual: 13, predicted: 14 },
      { time: 'T5', actual: 12, predicted: 13 },
      { time: 'T6', actual: 15, predicted: 14 },
      { time: 'T7', actual: 14, predicted: 13 },
      { time: 'T8', actual: 16, predicted: 17 },
      { time: 'T9', actual: 15, predicted: 16 },
      { time: 'T10', actual: 18, predicted: 17 },
    ];

    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Value Prediction Analysis</h2>
          <p className="text-gray-600">Comparison between actual and predicted values over time</p>
        </div>
        
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="time" stroke="#666" />
            <YAxis stroke="#666" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#fff', 
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="actual" 
              stroke="#3b82f6" 
              strokeWidth={3}
              dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
              name="Actual"
            />
            <Line 
              type="monotone" 
              dataKey="predicted" 
              stroke="#10b981" 
              strokeWidth={3}
              strokeDasharray="8 8"
              dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
              name="Predicted"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }

  // Label Prediction Charts
  switch (labelChart) {
    case 'Confusion':
      return <ConfusionMatrix />;
    case 'ROC':
      return <ROCCurve />;
    case 'Precision':
      return <PrecisionChart />;
    default:
      return null;
  }
};

const ConfusionMatrix = () => {
  const matrixData = [
    [25, 3, 2],
    [4, 28, 3],
    [1, 2, 30]
  ];
  
  const labels = ['Class A', 'Class B', 'Class C'];
  const maxValue = 30;
  
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Confusion Matrix</h2>
        <p className="text-gray-600">3x3 Classification Results</p>
      </div>
      
      <div className="flex flex-col items-center">
        <div className="mb-4">
          <div className="text-center mb-2">
            <span className="text-sm font-medium text-gray-700">Predicted Label</span>
          </div>
          <div className="flex">
            <div className="w-20"></div>
            {labels.map((label, i) => (
              <div key={i} className="w-20 text-center text-sm font-medium text-gray-700 mb-2">
                {label}
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex">
          <div className="flex flex-col justify-center mr-4">
            <div className="transform -rotate-90 text-sm font-medium text-gray-700 mb-8">
              True Label
            </div>
          </div>
          
          <div className="flex flex-col">
            {matrixData.map((row, i) => (
              <div key={i} className="flex items-center mb-1">
                <div className="w-16 text-right text-sm font-medium text-gray-700 mr-2">
                  {labels[i]}
                </div>
                <div className="flex">
                  {row.map((value, j) => {
                    const intensity = value / maxValue;
                    const isCorrect = i === j;
                    
                    return (
                      <div
                        key={j}
                        className="w-20 h-16 m-0.5 rounded-lg flex items-center justify-center border-2 transition-all hover:scale-105 cursor-pointer"
                        style={{
                          backgroundColor: isCorrect 
                            ? `rgba(34, 197, 94, ${0.3 + intensity * 0.7})`
                            : `rgba(239, 68, 68, ${0.2 + intensity * 0.6})`,
                          borderColor: isCorrect ? '#22c55e' : '#ef4444'
                        }}
                      >
                        <span className="text-lg font-bold text-gray-800">
                          {value}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-6 flex items-center space-x-6 text-sm">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-green-400 rounded mr-2"></div>
            <span className="text-gray-600">Correct Predictions</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-red-400 rounded mr-2"></div>
            <span className="text-gray-600">Incorrect Predictions</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const ROCCurve = () => {
  const data = [
    { fpr: 0, tpr: 0, name: 'Origin' },
    { fpr: 0.1, tpr: 0.4, name: 'Point 1' },
    { fpr: 0.3, tpr: 0.6, name: 'Point 2' },
    { fpr: 0.5, tpr: 0.75, name: 'Point 3' },
    { fpr: 0.7, tpr: 0.85, name: 'Point 4' },
    { fpr: 0.9, tpr: 0.93, name: 'Point 5' },
    { fpr: 1, tpr: 1, name: 'End' },
  ];

  const randomData = [
    { fpr: 0, tpr: 0 },
    { fpr: 1, tpr: 1 },
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">ROC Curve Analysis</h2>
        <p className="text-gray-600">Receiver Operating Characteristic curve showing model performance</p>
      </div>
      
      <ResponsiveContainer width="100%" height={400}>
        <LineChart margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            type="number" 
            dataKey="fpr" 
            domain={[0, 1]}
            label={{ value: 'False Positive Rate', position: 'insideBottom', offset: -5 }}
            stroke="#666"
          />
          <YAxis 
            type="number" 
            dataKey="tpr" 
            domain={[0, 1]}
            label={{ value: 'True Positive Rate', angle: -90, position: 'insideLeft' }}
            stroke="#666"
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#fff', 
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}
            formatter={(value, name) => [value.toFixed(3), name === 'tpr' ? 'True Positive Rate' : 'False Positive Rate']}
          />
          <Legend />
          <Line 
            data={data}
            type="monotone" 
            dataKey="tpr" 
            stroke="#ef4444" 
            strokeWidth={3}
            dot={{ fill: '#ef4444', strokeWidth: 2, r: 5 }}
            name="ROC Curve"
          />
          <Line 
            data={randomData}
            type="monotone" 
            dataKey="tpr" 
            stroke="#9ca3af" 
            strokeWidth={2}
            strokeDasharray="8 8"
            dot={false}
            name="Random Classifier"
          />
        </LineChart>
      </ResponsiveContainer>
      
      <div className="mt-4 text-center">
        <div className="inline-flex items-center px-4 py-2 bg-blue-50 rounded-lg">
          <span className="text-sm text-blue-700 font-medium">
            AUC Score: 0.87 (Good Performance)
          </span>
        </div>
      </div>
    </div>
  );
};

const PrecisionChart = () => {
  const data = [
    { class: 'Class A', precision: 0.85, color: '#3b82f6' },
    { class: 'Class B', precision: 0.76, color: '#10b981' },
    { class: 'Class C', precision: 0.92, color: '#f59e0b' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Precision Analysis</h2>
        <p className="text-gray-600">Precision scores for each classification class</p>
      </div>
      
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="class" stroke="#666" />
          <YAxis domain={[0, 1]} stroke="#666" />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#fff', 
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}
            formatter={(value) => [value.toFixed(3), 'Precision']}
          />
          <Bar dataKey="precision" radius={[4, 4, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      
      <div className="mt-4 flex justify-center space-x-6">
        {data.map((item, index) => (
          <div key={index} className="flex items-center">
            <div 
              className="w-4 h-4 rounded mr-2" 
              style={{ backgroundColor: item.color }}
            ></div>
            <span className="text-sm text-gray-600">
              {item.class}: {(item.precision * 100).toFixed(1)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page2;