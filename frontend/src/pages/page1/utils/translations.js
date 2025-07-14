// utils/translations.js - 新建翻译文件
export const translations = {
  zh: {
    title: '股票交易模拟游戏',
    startGame: '开始游戏',
    resetGame: '重新开始',
    stockPriceTrend: '股票价格走势',
    week: '周数',
    price: '价格 (¥)',
    stockPrice: '股价',
    currentWeek: '当前: 第{week}周',
    currentPrice: '股价: ¥{price}',
    tradingPanel: '交易面板',
    currentPriceLabel: '当前价格: ¥{price}',
    buy: '买入',
    hold: '持有',
    sell: '卖出',
    gameOver: '游戏结束 - 最终结果如上',
    portfolioDashboard: '投资组合仪表盘',
    yourPortfolio: '👤 您的投资组合',
    aiPortfolio: '🤖 AI投资组合',
    cash: '现金:',
    shares: '持股:',
    sharesUnit: '股',
    stockValue: '股票价值:',
    totalAssets: '总资产:',
    returnRate: '收益率:',
    performanceComparison: '📊 收益对比',
    you: '您',
    ai: 'AI'
  },
  en: {
    title: 'Stock Trading Simulation Game',
    startGame: 'Start Game',
    resetGame: 'Reset Game',
    stockPriceTrend: 'Stock Price Trend',
    week: 'Week',
    price: 'Price (¥)',
    stockPrice: 'Stock Price',
    currentWeek: 'Current: Week {week}',
    currentPrice: 'Price: ¥{price}',
    tradingPanel: 'Trading Panel',
    currentPriceLabel: 'Current Price: ¥{price}',
    buy: 'Buy',
    hold: 'Hold',
    sell: 'Sell',
    gameOver: 'Game Over - Final Results Above',
    portfolioDashboard: 'Portfolio Dashboard',
    yourPortfolio: '👤 Your Portfolio',
    aiPortfolio: '🤖 AI Portfolio',
    cash: 'Cash:',
    shares: 'Shares:',
    sharesUnit: ' shares',
    stockValue: 'Stock Value:',
    totalAssets: 'Total Assets:',
    returnRate: 'Return Rate:',
    performanceComparison: '📊 Performance Comparison',
    you: 'You',
    ai: 'AI'
  }
};

// 辅助函数用于替换占位符
export const formatText = (text, params = {}) => {
  return text.replace(/\{(\w+)\}/g, (match, key) => {
    return params[key] !== undefined ? params[key] : match;
  });
};
