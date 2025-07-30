import React from 'react';

const ConfusionMatrix = () => {
  const matrixData = [
    [14079, 284, 816],
    [788, 26885, 715],
    [840, 279, 13392]
  ];
  const labels = ['0', '1', '2'];
  const maxValue = Math.max(...matrixData.flat());
  
  // Calculate metrics
  const totalPredictions = matrixData.flat().reduce((sum, val) => sum + val, 0);
  const correctPredictions = matrixData.reduce((sum, row, i) => sum + row[i], 0);
  const accuracy = ((correctPredictions / totalPredictions) * 100).toFixed(1);

  return (
    <div className="bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 rounded-2xl shadow-2xl p-10 border border-purple-200/50">
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-slate-800 mb-3">
          Confusion Matrix
        </h2>
        <p className="text-slate-600 text-lg">3x3 Classification Results</p>
        <div className="mt-4 px-6 py-3 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl inline-block border border-emerald-200/50 shadow-sm">
          <span className="text-sm font-medium text-slate-700">Overall Accuracy: </span>
          <span className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            {accuracy}%
          </span>
        </div>
      </div>
      
      <div className="flex justify-center">
        <div className="inline-block">
          {/* Matrix Container with Grid Layout */}
          <div className="grid grid-cols-4 gap-0 items-center">
            {/* Empty top-left corner */}
            <div className="w-28 h-16"></div>
            
            {/* Top header: Predicted Label */}
            <div className="col-span-3 text-center mb-6">
              <span className="text-lg font-semibold text-slate-700 bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-3 rounded-xl border border-blue-200/50 shadow-sm">
                Predicted Label
              </span>
            </div>
            
            {/* Second row: column labels */}
            <div className="w-28 h-12"></div>
            {labels.map((label, i) => (
              <div key={i} className="w-28 h-12 text-center text-sm font-semibold text-slate-700 flex items-center justify-center bg-gradient-to-b from-slate-50 to-slate-100 rounded-lg mx-1 border border-slate-200/50 shadow-sm">
                Class {label}
              </div>
            ))}
            
            {/* Matrix rows */}
            {matrixData.map((row, i) => (
              <React.Fragment key={i}>
                {/* Row header container */}
                <div className="relative w-28 h-24 flex items-center justify-center">
                  {/* True Label (only show on middle row) */}
                  {i === 1 && (
                    <div className="absolute -left-20 top-0 bottom-0 flex items-center justify-center">
                      <div className="transform -rotate-90 text-lg font-semibold text-slate-700 whitespace-nowrap bg-gradient-to-r from-orange-50 to-amber-50 px-6 py-3 rounded-xl border border-orange-200/50 shadow-sm">
                        True Label
                      </div>
                    </div>
                  )}
                  {/* Row label */}
                  <div className="text-center text-sm font-semibold text-slate-700 bg-gradient-to-b from-slate-50 to-slate-100 px-4 py-3 rounded-lg border border-slate-200/50 shadow-sm">
                    Class {labels[i]}
                  </div>
                </div>
                
                {/* Matrix cells */}
                {row.map((value, j) => {
                  const intensity = value / maxValue;
                  const isCorrect = i === j;
                  const percentage = ((value / totalPredictions) * 100).toFixed(1);
                  
                  return (
                    <div
                      key={j}
                      className="w-28 h-24 rounded-xl flex flex-col items-center justify-center border-2 transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer mx-1 mb-1 relative overflow-hidden"
                      style={{
                        background: isCorrect
                          ? `linear-gradient(135deg, 
                              rgba(16, 185, 129, ${0.1 + intensity * 0.3}) 0%, 
                              rgba(5, 150, 105, ${0.15 + intensity * 0.4}) 100%)`
                          : `linear-gradient(135deg, 
                              rgba(156, 163, 175, ${0.08 + intensity * 0.2}) 0%, 
                              rgba(107, 114, 128, ${0.12 + intensity * 0.25}) 100%)`,
                        borderColor: isCorrect 
                          ? `rgba(16, 185, 129, ${0.4 + intensity * 0.4})` 
                          : `rgba(156, 163, 175, ${0.3 + intensity * 0.3})`,
                        boxShadow: isCorrect 
                          ? `0 8px 25px rgba(16, 185, 129, ${0.15 + intensity * 0.2})` 
                          : `0 8px 25px rgba(156, 163, 175, ${0.1 + intensity * 0.15})`
                      }}
                    >
                      {/* Subtle gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent pointer-events-none"></div>
                      
                      {/* Glow effect for correct predictions */}
                      {isCorrect && (
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/20 to-teal-400/20 rounded-xl blur-sm"></div>
                      )}
                      
                      <span className="text-xl font-bold text-slate-800 relative z-10 mb-1">
                        {value.toLocaleString()}
                      </span>
                      <span className="text-xs font-medium text-slate-600 relative z-10 bg-white/70 px-2 py-1 rounded-full border border-white/50 shadow-sm">
                        {percentage}%
                      </span>
                    </div>
                  );
                })}
              </React.Fragment>
            ))}
          </div>

          {/* Legend */}
          <div className="mt-10 flex items-center justify-center space-x-8 text-sm">
            <div className="flex items-center bg-gradient-to-r from-emerald-50 to-teal-50 px-6 py-3 rounded-xl border border-emerald-200/50 shadow-sm">
              <div className="w-4 h-4 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full mr-3 shadow-sm"></div>
              <span className="text-slate-700 font-medium">Correct Predictions</span>
            </div>
            <div className="flex items-center bg-gradient-to-r from-slate-50 to-gray-50 px-6 py-3 rounded-xl border border-slate-200/50 shadow-sm">
              <div className="w-4 h-4 bg-gradient-to-r from-slate-400 to-gray-400 rounded-full mr-3 shadow-sm"></div>
              <span className="text-slate-700 font-medium">Incorrect Predictions</span>
            </div>
          </div>
          
          {/* Additional stats */}
          <div className="mt-8 grid grid-cols-3 gap-4 text-center">
            {labels.map((label, i) => {
              const truePositives = matrixData[i][i];
              const totalTrue = matrixData[i].reduce((sum, val) => sum + val, 0);
              const totalPredicted = matrixData.reduce((sum, row) => sum + row[i], 0);
              const precision = ((truePositives / totalPredicted) * 100).toFixed(1);
              const recall = ((truePositives / totalTrue) * 100).toFixed(1);
              
              return (
                <div key={i} className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-4 border border-indigo-200/50 shadow-sm">
                  <h4 className="text-sm font-semibold text-slate-700 mb-2">Class {label}</h4>
                  <div className="text-xs text-slate-600 space-y-1">
                    <div>Precision: <span className="font-medium text-indigo-600">{precision}%</span></div>
                    <div>Recall: <span className="font-medium text-purple-600">{recall}%</span></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfusionMatrix;