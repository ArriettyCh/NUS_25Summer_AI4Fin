import React, { useState, useEffect} from 'react';
import ConfusionMatrix from './components/ConfusionMatrix';
import ReactECharts from 'echarts-for-react';
import '../../tailwind.css';
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
                  {['Confusion', 'Per-Class Metrics'].map((chart) => (
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
/*
const ChartDisplay = ({ mode, labelChart }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    if (mode === 'Value') {
      fetch('./predicted_vs_actual.json')
        .then(res => res.json())
        .then(json => setData(json))
      .catch(err => console.error('❌ 加载 JSON 文件失败:', err));
    }
  }, [mode]);
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
              dot={false}
              name="Actual"
            />
            <Line 
              type="monotone" 
              dataKey="predicted" 
              stroke="#ADD8E6" 
              strokeWidth={3}
              strokeDasharray="8 8"
              dot={false}
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
*/
const ChartDisplay = ({ mode, labelChart }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (mode === 'Value') {
      fetch('./predicted_vs_actual.json')
        .then(res => res.json())
        .then(json => setData(json))
        .catch(err => console.error('❌ 加载 JSON 文件失败:', err));
    }
  }, [mode]);

  if (mode === 'Value') {
    const times = data.map(item => item.time);
    const actuals = data.map(item => item.actual);
    const predicteds = data.map(item => item.predicted);

    const option = {
      tooltip: {
        trigger: 'axis',
        backgroundColor: '#fff',
        borderColor: '#e5e7eb',
        borderWidth: 1,
        borderRadius: 8,
        textStyle: {
          color: '#000',
        },
        extraCssText: 'box-shadow: 0 4px 6px rgba(0,0,0,0.1);',
      },
      legend: {
        data: ['Actual', 'Predicted'],
        top: 10,
        icon: 'circle', // 可选：'rect' | 'circle' | 'roundRect' 等
      },
      grid: {
        left: 50,
        right: 30,
        bottom: 50,
        top: 60,
      },
      xAxis: {
        type: 'category',
        data: times,
        boundaryGap: false,
        axisLine: {
          lineStyle: {
            color: '#666',
          },
        },
        axisLabel: {
          rotate: 45,
        },
      },
      yAxis: {
        type: 'value',
        axisLine: {
          lineStyle: {
            color: '#666',
          },
        },
        splitLine: {
          lineStyle: {
            color: '#f0f0f0',
          },
        },
      },
      series: [
        {
          name: 'Actual',
          type: 'line',
          data: actuals,
          smooth: true,
          lineStyle: {
            width: 1,
            color: '#3b82f6', // 蓝色
          },
          itemStyle: {
            color: '#3b82f6', // 图例颜色匹配
          },
          showSymbol: false,
        },
        {
          name: 'Predicted',
          type: 'line',
          data: predicteds,
          smooth: true,
          lineStyle: {
            width: 1,
            color: '#ADD8E6', // 浅蓝色
          },
          itemStyle: {
            color: '#ADD8E6', // 图例颜色匹配
          },
          showSymbol: false,
        },
      ],
    };

    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-800 mb-3">Value Prediction Analysis</h2>
          <p className="text-gray-600">Comparison between actual and predicted values over time</p>
        </div>
        <ReactECharts
          option={option}
          style={{ height: 600, width: '100%' }}
          notMerge={true}
          lazyUpdate={true}
          theme="light"
        />
      </div>
    );
  }

  // 其他模式图表切换
  switch (labelChart) {
    case 'Confusion':
      return <ConfusionMatrix />;
    // case 'ROC':
    //  return <ROCCurve />;
    case 'Per-Class Metrics':
      return <MetricsChart />;
    default:
      return null;
  }
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
    { class: '0', precision: 0.89635194, color: '#3b82f6' },
    { class: '1', precision: 0.97948849, color: '#10b981' },
    { class: '2', precision: 0.89740669, color: '#f59e0b' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800 mb-3">Precision Analysis</h2>
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

const MetricsChart = () => {
  const data = [
    {
      class: '0',
      precision: 0.89635194,
      recall: 0.92836493,
      f1: 0.91206931
    },
    {
      class: '1',
      precision: 0.97948849,
      recall: 0.95372865,
      f1: 0.96641565
    },
    {
      class: '2',
      precision: 0.89740669,
      recall: 0.84764828,
      f1: 0.87181001
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800 mb-3">Per-Class Metrics Comparison</h2>
        <p className="text-gray-600">Precision, Recall, and F1-score for each class</p>
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
            formatter={(value, name) => [value.toFixed(3), name.charAt(0).toUpperCase() + name.slice(1)]}
          />
          <Legend />
          <Bar dataKey="precision" fill="#3b82f6" name="Precision" radius={[4, 4, 0, 0]} />
          <Bar dataKey="recall" fill="#10b981" name="Recall" radius={[4, 4, 0, 0]} />
          <Bar dataKey="f1" fill="#f59e0b" name="F1-score" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>

      <div className="mt-4 text-sm text-gray-600 text-center">
        Values are shown for Class 0, 1, and 2. All metrics are between 0 and 1.
      </div>
    </div>
  );
};


export default Page2;