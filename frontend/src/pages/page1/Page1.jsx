// // Page1.jsx - 添加语言切换功能
// import React, { useState, useEffect } from 'react';
// import './Page1.css';
// import StockChart from './components/StockChart';
// import Dashboard from './components/Dashboard';
// import TradingPanel from './components/TradingPanel';
// import { generateStockData, loadAIDecisions } from './utils/dataUtils';
// import { translations } from './utils/translations';

// const Page1 = () =>{
//   const [currentWeek, setCurrentWeek] = useState(0);
//   const [stockData, setStockData] = useState([]);
//   const [userPortfolio, setUserPortfolio] = useState({
//     cash: 10000,
//     shares: 0,
//     totalValue: 10000,
//     returnRate: 0
//   });
//   const [aiPortfolio, setAiPortfolio] = useState({
//     cash: 10000,
//     shares: 0,
//     totalValue: 10000,
//     returnRate: 0
//   });
//   const [aiDecisions, setAiDecisions] = useState([]);
//   const [gameStarted, setGameStarted] = useState(false);
//   const [language, setLanguage] = useState('zh'); // 'zh' for Chinese, 'en' for English

//   const t = translations[language];

//   useEffect(() => {
//     // 初始化股票数据和AI决策
//     const initialStockData = generateStockData(52); // 52周数据
//     const decisions = loadAIDecisions();
    
//     setStockData(initialStockData);
//     setAiDecisions(decisions);
//   }, []);

//   const toggleLanguage = () => {
//     setLanguage(language === 'zh' ? 'en' : 'zh');
//   };

//   const handleUserDecision = (action) => {
//     if (currentWeek >= stockData.length - 1) return;

//     const currentPrice = stockData[currentWeek].price;
//     const nextWeek = currentWeek + 1;
//     const nextPrice = stockData[nextWeek].price;

//     // 处理用户决策
//     let newUserPortfolio = { ...userPortfolio };
    
//     switch (action) {
//       case 'buy':
//         if (newUserPortfolio.cash >= currentPrice * 10) {
//           newUserPortfolio.cash -= currentPrice * 10;
//           newUserPortfolio.shares += 10;
//         }
//         break;
//       case 'sell':
//         if (newUserPortfolio.shares >= 10) {
//           newUserPortfolio.cash += currentPrice * 10;
//           newUserPortfolio.shares -= 10;
//         }
//         break;
//       case 'hold':
//       default:
//         break;
//     }

//     // 处理AI决策
//     let newAiPortfolio = { ...aiPortfolio };
//     const aiAction = aiDecisions[currentWeek] || 'hold';
    
//     switch (aiAction) {
//       case 'buy':
//         if (newAiPortfolio.cash >= currentPrice * 10) {
//           newAiPortfolio.cash -= currentPrice * 10;
//           newAiPortfolio.shares += 10;
//         }
//         break;
//       case 'sell':
//         if (newAiPortfolio.shares >= 10) {
//           newAiPortfolio.cash += currentPrice * 10;
//           newAiPortfolio.shares -= 10;
//         }
//         break;
//     }

//     // 更新到下一周并计算收益率
//     newUserPortfolio.totalValue = newUserPortfolio.cash + newUserPortfolio.shares * nextPrice;
//     newUserPortfolio.returnRate = ((newUserPortfolio.totalValue - 10000) / 10000) * 100;

//     newAiPortfolio.totalValue = newAiPortfolio.cash + newAiPortfolio.shares * nextPrice;
//     newAiPortfolio.returnRate = ((newAiPortfolio.totalValue - 10000) / 10000) * 100;

//     setUserPortfolio(newUserPortfolio);
//     setAiPortfolio(newAiPortfolio);
//     setCurrentWeek(nextWeek);
//   };

//   const startGame = () => {
//     setGameStarted(true);
//     setCurrentWeek(0);
//   };

//   const resetGame = () => {
//     setCurrentWeek(0);
//     setUserPortfolio({
//       cash: 10000,
//       shares: 0,
//       totalValue: 10000,
//       returnRate: 0
//     });
//     setAiPortfolio({
//       cash: 10000,
//       shares: 0,
//       totalValue: 10000,
//       returnRate: 0
//     });
//     setGameStarted(false);
//   };

//   return (
//     <div className="App">
//       <header className={`app-header ${gameStarted ? 'compact' : 'fullscreen'}`}>
//         <div className="header-content">
//           <h1>{t.title}</h1>
//           <div className="header-controls">
//             <button onClick={toggleLanguage} className="language-btn">
//               {language === 'zh' ? 'EN' : '中'}
//             </button>
//             <div className="game-controls">
//               {!gameStarted ? (
//                 <button onClick={startGame} className="start-btn">{t.startGame}</button>
//               ) : (
//                 <button onClick={resetGame} className="reset-btn">{t.resetGame}</button>
//               )}
//             </div>
//           </div>
//         </div>
//       </header>

//       {gameStarted && (
//         <div className="game-container">
//           <div className="left-panel">
//             <StockChart
//               data={stockData.slice(0, currentWeek + 1)}
//               currentWeek={currentWeek}
//               language={language}
//             />
//             <TradingPanel
//               onDecision={handleUserDecision}
//               currentPrice={stockData[currentWeek]?.price || 0}
//               disabled={currentWeek >= stockData.length - 1}
//               language={language}
//             />
//           </div>
          
//           <div className="right-panel">
//             <Dashboard
//               userPortfolio={userPortfolio}
//               aiPortfolio={aiPortfolio}
//               currentWeek={currentWeek}
//               currentPrice={stockData[currentWeek]?.price || 0}
//               language={language}
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Page1;




import React, { useState, useEffect } from 'react';
import './Page1.css';
import StockChart from './components/StockChart';
import Dashboard from './components/Dashboard';
import TradingPanel from './components/TradingPanel';
import { loadStockData } from './utils/dataUtils'; 
import { translations } from './utils/translations';

function Page1() {
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
  const [gameStarted, setGameStarted] = useState(false);
  const [language, setLanguage] = useState('zh'); // 'zh' for Chinese, 'en' for English

  const t = translations[language];
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    if (!dataLoaded) {
      const loadData = async () => {
        console.log('开始加载数据...');
        const initialStockData = await loadStockData();
        console.log('111得到的数据是:', initialStockData);
        setStockData(initialStockData);
        setDataLoaded(true);
        console.log('数据加载完成');
      };
      loadData();
    }
  }, [dataLoaded]);
  
  const toggleLanguage = () => {
    setLanguage(language === 'zh' ? 'en' : 'zh');
  };

  // 将predict_label转换为AI决策动作
  const getAIAction = (predictLabel) => {
    switch (predictLabel) {
      case 0:
        return 'sell';
      case 1:
        return 'hold';
      case 2:
        return 'buy';
      default:
        return 'hold';
    }
  };

  const handleUserDecision = (action) => {
    if (currentWeek >= stockData.length - 1) return;

    const currentPrice = stockData[currentWeek].open_price;
    const nextWeek = currentWeek + 1;
    const nextPrice = stockData[nextWeek].open_price;

    // 处理用户决策
    let newUserPortfolio = { ...userPortfolio };
    
    switch (action) {
      case 'buy':
        if (newUserPortfolio.cash >= currentPrice * 10000) {
          newUserPortfolio.cash -= currentPrice * 10000;
          newUserPortfolio.shares += 10000;
        }
        break;
      case 'sell':
        if (newUserPortfolio.shares >= 10000) {
          newUserPortfolio.cash += currentPrice * 10000;
          newUserPortfolio.shares -= 10000;
        }
        break;
      case 'hold':
      default:
        break;
    }

    // 处理AI决策 - 从stockData中获取predict_label
    let newAiPortfolio = { ...aiPortfolio };
    const aiPredictLabel = stockData[currentWeek].predict_label;
    const aiAction = getAIAction(aiPredictLabel);

    console.log(`第${currentWeek}周 AI预测标签: ${aiPredictLabel}, AI决策: ${aiAction}`);

    switch (aiAction) {
      case 'buy':
        if (newAiPortfolio.cash >= currentPrice * 10000) {
          newAiPortfolio.cash -= currentPrice * 10000;
          newAiPortfolio.shares += 10000;
        }
        break;
      case 'sell':
        if (newAiPortfolio.shares >= 10000) {
          newAiPortfolio.cash += currentPrice * 10000;
          newAiPortfolio.shares -= 10000;
        }
        break;
      case 'hold':
      default:
        // 不执行任何操作
        break;
    }

    // 更新到下一周并计算新的投资组合价值
    const newWeek = nextWeek;

    // 计算用户投资组合价值
    newUserPortfolio.totalValue = newUserPortfolio.cash + newUserPortfolio.shares * nextPrice;
    newUserPortfolio.returnRate = ((newUserPortfolio.totalValue - 10000) / 10000) * 100;

    // 计算AI投资组合价值
    newAiPortfolio.totalValue = newAiPortfolio.cash + newAiPortfolio.shares * nextPrice;
    newAiPortfolio.returnRate = ((newAiPortfolio.totalValue - 10000) / 10000) * 100;

    // 更新状态
    setCurrentWeek(newWeek);
    setUserPortfolio(newUserPortfolio);
    setAiPortfolio(newAiPortfolio);
  };

  const startGame = () => {
    setGameStarted(true);
    setCurrentWeek(0);
    // 重置投资组合
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

  // 获取当前AI决策用于显示
  const getCurrentAIDecision = () => {
    if (currentWeek < stockData.length && stockData[currentWeek]) {
      const predictLabel = stockData[currentWeek].predict_label;
      return getAIAction(predictLabel);
    }
    return 'hold';
  };

  if (!dataLoaded) {
    return (
      <div className="loading" style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '18px',
        color: '#666'
      }}>
        {t.loading || '加载中...'}
      </div>
    );
  }

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
                <button onClick={startGame} className="start-btn">
                  {t.startGame}
                </button>
              ) : (
                <button onClick={resetGame} className="reset-btn">
                  {t.resetGame}
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {gameStarted && (
        <div className="game-container">
          {/* <div className="game-info" style={{
            padding: '10px 20px',
            backgroundColor: '#f8f9fa',
            borderBottom: '1px solid #dee2e6',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span>
              {t.currentWeek || '当前周次'}: {currentWeek + 1} / {stockData.length}
            </span>
            <span>
              AI当前决策: <strong style={{ 
                color: getCurrentAIDecision() === 'buy' ? '#28a745' : 
                      getCurrentAIDecision() === 'sell' ? '#dc3545' : '#6c757d'
              }}>
                {getCurrentAIDecision() === 'buy' ? '买入' : 
                 getCurrentAIDecision() === 'sell' ? '卖出' : '持有'}
              </strong>
            </span>
          </div> */}

          <div className="left-panel">
            <StockChart
              data={stockData.slice(0, currentWeek + 1)}
              currentWeek={currentWeek}
              language={language}
            />
            <TradingPanel
              onDecision={handleUserDecision}
              currentPrice={stockData[currentWeek]?.open_price || 0}
              disabled={currentWeek >= stockData.length - 1}
              language={language}
              userCash={userPortfolio.cash}
              userShares={userPortfolio.shares}
              aiDecision={getCurrentAIDecision()}
            />
          </div>
        
          <div className="right-panel">
            <Dashboard
              userPortfolio={userPortfolio}
              aiPortfolio={aiPortfolio}
              currentWeek={currentWeek}
              currentPrice={stockData[currentWeek]?.open_price || 0}
              language={language}
            />

            {/* 游戏结束显示 */}
            {currentWeek >= stockData.length - 1 && (
              <div className="game-over" style={{
                padding: '20px',
                backgroundColor: '#e9ecef',
                borderRadius: '8px',
                textAlign: 'center',
                marginTop: '20px'
              }}>
                <h3>{t.gameOver || '游戏结束'}</h3>
                <p style={{ margin: '10px 0' }}>
                  {t.finalResults || '最终结果'}:
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '15px' }}>
                  <div>
                    <strong>{t.yourReturn || '您的收益率'}: {userPortfolio.returnRate.toFixed(2)}%</strong>
                  </div>
                  <div>
                    <strong>AI{t.return || '收益率'}: {aiPortfolio.returnRate.toFixed(2)}%</strong>
                  </div>
                </div>
                <div style={{ marginTop: '15px', fontSize: '18px', fontWeight: 'bold' }}>
                  {userPortfolio.returnRate > aiPortfolio.returnRate ? 
                    (t.youWin || '🎉 恭喜您获胜！') : 
                    userPortfolio.returnRate < aiPortfolio.returnRate ?
                    (t.aiWins || '🤖 AI获胜！') :
                    (t.tie || '🤝 平局！')
                  }
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Page1;
