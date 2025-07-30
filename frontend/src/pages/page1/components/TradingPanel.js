// components/TradingPanel.js - 支持多语言
import React from 'react';
import { translations, formatText } from '../utils/translations';

const TradingPanel = ({ onDecision, currentPrice, disabled, language }) => {
  const t = translations[language];

  return (
    <div className="trading-panel">
      <h3>{t.tradingPanel}</h3>
      <div className="current-price">
        {formatText(t.currentPriceLabel, { price: currentPrice.toFixed(2) })}
      </div>
      <div className="trading-buttons">
        <button 
          className="buy-btn" 
          onClick={() => onDecision('buy')}
          disabled={disabled}
        >
          {t.buy}
        </button>
        <button 
          className="hold-btn" 
          onClick={() => onDecision('hold')}
          disabled={disabled}
        >
          {t.hold}
        </button>
        <button 
          className="sell-btn" 
          onClick={() => onDecision('sell')}
          disabled={disabled}
        >
          {t.sell}
        </button>
      </div>
      {disabled && (
        <div className="game-over">
          {t.gameOver}
        </div>
      )}
    </div>
  );
};

export default TradingPanel;
