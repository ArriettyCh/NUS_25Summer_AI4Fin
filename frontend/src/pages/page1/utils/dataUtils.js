// utils/dataUtils.js

// 模拟股票数据
export const generateStockData = (weeks) => {
  const data = [];
  // let price = 100;
  
  // for (let i = 0; i < weeks; i++) {
  //   // 随机波动 (-10% 到 +10%)
  //   const change = (Math.random() - 0.5) * 0.2;
  //   price = price * (1 + change);
    
  //   data.push({
  //     week: i,
  //     price: Math.max(price, 10), 
  //     // date: new Date(2024, 0, i * 7).toISOString().split('T')[0]
  //   });
  // }
  
  return data;
};

// 从JSON文件加载AI决策
export const loadStockData = async () => {
  try {
    const response = await fetch('/data/data.json');
    const data = await response.json();
    // console.log('得到的数据是:', data.decisions);
    return data.stockdata;
  } catch (error) {
    console.error('Failed to load AI decisions:', error);
    return generateStockData(52); 
  }
};

//伪决策数据
export const loadAIDecisions = () => {
  const decisions = [];
  const actions = ['buy', 'hold', 'sell'];
  
  for (let i = 0; i < 52; i++) {
    let action;
    if (i % 10 === 0) {
      action = 'buy'; 
    } else if (i % 15 === 0) {
      action = 'sell'; 
    } else {
      action = 'hold'; 
    }
    
    decisions.push(action);
  }
  return decisions;
};

// 从JSON文件加载AI决策
export const loadAIDecisionsFromFile = async () => {
  try {
    const response = await fetch('/data/ai-decisions.json');
    const data = await response.json();
    // console.log('得到的数据是:', data.decisions);
    return data.decisions;
  } catch (error) {
    console.error('Failed to load AI decisions:', error);
    return loadAIDecisions(); 
  }
};
