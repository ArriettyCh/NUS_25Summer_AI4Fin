// Page1.jsx - 添加语言切换功能
import React, { useState, useEffect } from 'react';
import './Page1.css';
import StockChart from './components/StockChart';
import Dashboard from './components/Dashboard';
import TradingPanel from './components/TradingPanel';
import { generateStockData, loadAIDecisions } from './utils/dataUtils';
import { translations } from './utils/translations';

const Page1 = () =>{
  const [currentWeek, setCurrentWeek] = useState(0);
  const [stockData, setStockData] = useState([]);
  const [userPortfolio, setUserPortfolio] = useState({
    cash: 10000,
    shares: 0,
    totalValue: 10000,
    returnRate: 0
  });
  const [aiPortfolio, setAiPortfolio] = useState({
    cash: 10000,
    shares: 0,
    totalValue: 10000,
    returnRate: 0
  });
  const [aiDecisions, setAiDecisions] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [language, setLanguage] = useState('zh'); // 'zh' for Chinese, 'en' for English

  const t = translations[language];

  useEffect(() => {
    // 初始化股票数据和AI决策
    const initialStockData = generateStockData(52); // 52周数据
    const decisions = loadAIDecisions();
    
    setStockData(initialStockData);
    setAiDecisions(decisions);
  }, []);

  const toggleLanguage = () => {
    setLanguage(language === 'zh' ? 'en' : 'zh');
  };

  const handleUserDecision = (action) => {
    if (currentWeek >= stockData.length - 1) return;

    const currentPrice = stockData[currentWeek].price;
    const nextWeek = currentWeek + 1;
    const nextPrice = stockData[nextWeek].price;

    // 处理用户决策
    let newUserPortfolio = { ...userPortfolio };
    
    switch (action) {
      case 'buy':
        if (newUserPortfolio.cash >= currentPrice * 10) {
          newUserPortfolio.cash -= currentPrice * 10;
          newUserPortfolio.shares += 10;
        }
        break;
      case 'sell':
        if (newUserPortfolio.shares >= 10) {
          newUserPortfolio.cash += currentPrice * 10;
          newUserPortfolio.shares -= 10;
        }
        break;
      case 'hold':
      default:
        break;
    }

    // 处理AI决策
    let newAiPortfolio = { ...aiPortfolio };
    const aiAction = aiDecisions[currentWeek] || 'hold';
    
    switch (aiAction) {
      case 'buy':
        if (newAiPortfolio.cash >= currentPrice * 10) {
          newAiPortfolio.cash -= currentPrice * 10;
          newAiPortfolio.shares += 10;
        }
        break;
      case 'sell':
        if (newAiPortfolio.shares >= 10) {
          newAiPortfolio.cash += currentPrice * 10;
          newAiPortfolio.shares -= 10;
        }
        break;
    }

    // 更新到下一周并计算收益率
    newUserPortfolio.totalValue = newUserPortfolio.cash + newUserPortfolio.shares * nextPrice;
    newUserPortfolio.returnRate = ((newUserPortfolio.totalValue - 10000) / 10000) * 100;

    newAiPortfolio.totalValue = newAiPortfolio.cash + newAiPortfolio.shares * nextPrice;
    newAiPortfolio.returnRate = ((newAiPortfolio.totalValue - 10000) / 10000) * 100;

    setUserPortfolio(newUserPortfolio);
    setAiPortfolio(newAiPortfolio);
    setCurrentWeek(nextWeek);
  };

  const startGame = () => {
    setGameStarted(true);
    setCurrentWeek(0);
  };

  const resetGame = () => {
    setCurrentWeek(0);
    setUserPortfolio({
      cash: 10000,
      shares: 0,
      totalValue: 10000,
      returnRate: 0
    });
    setAiPortfolio({
      cash: 10000,
      shares: 0,
      totalValue: 10000,
      returnRate: 0
    });
    setGameStarted(false);
  };

  return (
    <div className="App">
      <header className={`app-header ${gameStarted ? 'compact' : 'fullscreen'}`}>
        <div className="header-content">
          <h1>{t.title}</h1>
          <div className="header-controls">
            <button onClick={toggleLanguage} className="language-btn">
              {language === 'zh' ? 'EN' : '中'}
            </button>
            <div className="game-controls">
              {!gameStarted ? (
                <button onClick={startGame} className="start-btn">{t.startGame}</button>
              ) : (
                <button onClick={resetGame} className="reset-btn">{t.resetGame}</button>
              )}
            </div>
          </div>
        </div>
      </header>

      {gameStarted && (
        <div className="game-container">
          <div className="left-panel">
            <StockChart 
              data={stockData.slice(0, currentWeek + 1)} 
              currentWeek={currentWeek}
              language={language}
            />
            <TradingPanel 
              onDecision={handleUserDecision}
              currentPrice={stockData[currentWeek]?.price || 0}
              disabled={currentWeek >= stockData.length - 1}
              language={language}
            />
          </div>
          
          <div className="right-panel">
            <Dashboard 
              userPortfolio={userPortfolio}
              aiPortfolio={aiPortfolio}
              currentWeek={currentWeek}
              currentPrice={stockData[currentWeek]?.price || 0}
              language={language}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Page1;
