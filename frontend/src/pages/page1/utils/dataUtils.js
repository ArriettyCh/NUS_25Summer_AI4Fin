// utils/dataUtils.js

// 生成模拟股票数据
export const generateStockData = (weeks) => {
  const data = [];
  let price = 100; // 初始价格
  
  for (let i = 0; i < weeks; i++) {
    // 随机波动 (-10% 到 +10%)
    const change = (Math.random() - 0.5) * 0.2;
    price = price * (1 + change);
    
    data.push({
      week: i,
      price: Math.max(price, 10), // 最低价格为10
      date: new Date(2024, 0, i * 7).toISOString().split('T')[0]
    });
  }
  
  return data;
};

// 加载AI决策数据
export const loadAIDecisions = () => {
  // 这里可以从文件或API加载AI决策
  // 现在使用随机生成的决策作为示例
  const decisions = [];
  const actions = ['buy', 'hold', 'sell'];
  
  for (let i = 0; i < 52; i++) {
    // 简单的策略：基于随机和一些逻辑
    let action;
    if (i % 10 === 0) {
      action = 'buy'; // 每10周买入
    } else if (i % 15 === 0) {
      action = 'sell'; // 每15周卖出
    } else {
      action = 'hold'; // 其他时候持有
    }
    
    decisions.push(action);
  }
  
  return decisions;
};

// 从JSON文件加载AI决策（实际使用时）
export const loadAIDecisionsFromFile = async () => {
  try {
    const response = await fetch('/data/ai-decisions.json');
    const data = await response.json();
    return data.decisions;
  } catch (error) {
    console.error('Failed to load AI decisions:', error);
    return loadAIDecisions(); // fallback to generated data
  }
};
