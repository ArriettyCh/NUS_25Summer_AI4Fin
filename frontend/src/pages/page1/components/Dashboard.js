// components/Dashboard.js - 支持多语言
import React from 'react';
import { translations } from '../utils/translations';

const Dashboard = ({ userPortfolio, aiPortfolio, currentPrice, language }) => {
  console.log('Dashboard props:', { userPortfolio, aiPortfolio, currentPrice }); 
  const t = translations[language];
  console.log('translations props:', t); 
  return (
    <div className="dashboard">
      <h3>{t.portfolioDashboard}</h3>
      
      {/* 水平布局的投资组合 */}
      <div className="portfolios-container">
        <div className="portfolio-section user">
          <h4>{t.yourPortfolio}</h4>
          <div className="portfolio-stats">
            <div className="stat-item">
              <span className="stat-label">{t.cash}</span>
              <span className="stat-value">${userPortfolio.cash.toFixed(0)}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">{t.shares}</span>
              <span className="stat-value">{userPortfolio.shares}{t.sharesUnit}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">{t.stockValue}</span>
              <span className="stat-value">${(userPortfolio.shares * currentPrice).toFixed(0)}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">{t.totalAssets}</span>
              <span className="stat-value">${userPortfolio.totalValue.toFixed(0)}</span>
            </div>
            <div className="stat-item highlight">
              <span className="stat-label">{t.returnRate}</span>
              <span className={`stat-value ${userPortfolio.returnRate >= 0 ? 'positive' : 'negative'}`}>
                {userPortfolio.returnRate.toFixed(1)}%
              </span>
            </div>
          </div>
        </div>

        <div className="portfolio-section ai">
          <h4>{t.aiPortfolio}</h4>
          <div className="portfolio-stats">
            <div className="stat-item">
              <span className="stat-label">{t.cash}</span>
              <span className="stat-value">${aiPortfolio.cash.toFixed(0)}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">{t.shares}</span>
              <span className="stat-value">{aiPortfolio.shares}{t.sharesUnit}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">{t.stockValue}</span>
              <span className="stat-value">${(aiPortfolio.shares * currentPrice).toFixed(0)}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">{t.totalAssets}</span>
              <span className="stat-value">${aiPortfolio.totalValue.toFixed(0)}</span>
            </div>
            <div className="stat-item highlight">
              <span className="stat-label">{t.returnRate}</span>
              <span className={`stat-value ${aiPortfolio.returnRate >= 0 ? 'positive' : 'negative'}`}>
                {aiPortfolio.returnRate.toFixed(1)}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 收益对比部分 */}
      <div className="comparison-section">
        <h4>{t.performanceComparison}</h4>
        <div className="comparison-chart">
          <div className="comparison-bar">
            <div className="bar-label">{t.you}</div>
            <div className="bar-container">
              <div 
                className={`bar user-bar ${userPortfolio.returnRate >= 0 ? 'positive' : 'negative'}`}
                style={{ width: `${Math.min(Math.abs(userPortfolio.returnRate) * 50, 100)}%` }}
              >
                {userPortfolio.returnRate.toFixed(1)}%
              </div>
            </div>
          </div>
          <div className="comparison-bar">
            <div className="bar-label">{t.ai}</div>
            <div className="bar-container">
              <div 
                className={`bar ai-bar ${aiPortfolio.returnRate >= 0 ? 'positive' : 'negative'}`}
                style={{ width: `${Math.min(Math.abs(aiPortfolio.returnRate) * 50, 100)}%` }}
              >
                {aiPortfolio.returnRate.toFixed(1)}%
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
