import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Page2 from './pages/page2/Page2';
import Page1 from './pages/page1/Page1';

const Home = () => (
  <div style={{
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 40%, #f0f4f8 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 0,
    padding: '16px',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    boxSizing: 'border-box'
  }}>
    <div style={{
      maxWidth: '500px',
      width: '100%',
      background: 'rgba(255, 255, 255, 0.85)',
      backdropFilter: 'blur(20px)',
      borderRadius: '20px',
      border: '1px solid rgba(0, 0, 0, 0.08)',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
      padding: '32px 24px',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background decorative elements */}
      <div style={{
        position: 'absolute',
        top: '-15px',
        left: '-15px',
        width: '80px',
        height: '80px',
        background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(15px)'
      }}></div>
      <div style={{
        position: 'absolute',
        bottom: '-15px',
        right: '-15px',
        width: '90px',
        height: '90px',
        background: 'radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(15px)'
      }}></div>

      {/* Icon */}
      <div style={{
        width: '48px',
        height: '48px',
        background: 'linear-gradient(135deg, #3b82f6, #10b981)',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 20px',
        boxShadow: '0 8px 16px rgba(59, 130, 246, 0.25)'
      }}>
        <svg width="24" height="24" fill="none" stroke="white" viewBox="0 0 24 24" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      </div>

      {/* Title */}
      <h1 style={{
        fontSize: '2.2rem',
        fontWeight: 'bold',
        color: 'transparent',
        background: 'linear-gradient(135deg, #3b82f6, #10b981)',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        marginBottom: '12px',
        textShadow: '0 0 20px rgba(59, 130, 246, 0.2)'
      }}>
        Stock Predictor
      </h1>

      {/* Subtitle */}
      <p style={{
        fontSize: '1rem',
        color: '#64748b',
        marginBottom: '28px',
        lineHeight: '1.5'
      }}>
        AI-powered stock prediction platform with intelligent market analysis for smarter investment decisions
      </p>

      {/* Feature Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '12px',
        marginBottom: '24px'
      }}>
        <div style={{
          background: 'rgba(248, 250, 252, 0.8)',
          border: '1px solid rgba(0, 0, 0, 0.06)',
          borderRadius: '12px',
          padding: '16px'
        }}>
          <div style={{
            width: '32px',
            height: '32px',
            background: 'linear-gradient(135deg, #3b82f6, #10b981)',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 10px'
          }}>
            <svg width="16" height="16" fill="none" stroke="white" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 style={{ color: '#334155', fontSize: '0.95rem', fontWeight: '600', marginBottom: '4px' }}>
            Smart Predictions
          </h3>
          <p style={{ color: '#64748b', fontSize: '0.8rem' }}>
            AI algorithms for precise stock forecasting
          </p>
        </div>

        <div style={{
          background: 'rgba(248, 250, 252, 0.8)',
          border: '1px solid rgba(0, 0, 0, 0.06)',
          borderRadius: '12px',
          padding: '16px'
        }}>
          <div style={{
            width: '32px',
            height: '32px',
            background: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 10px'
          }}>
            <svg width="16" height="16" fill="none" stroke="white" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h3 style={{ color: '#334155', fontSize: '0.95rem', fontWeight: '600', marginBottom: '4px' }}>
            Data Analytics
          </h3>
          <p style={{ color: '#64748b', fontSize: '0.8rem' }}>
            Deep market data analysis reports
          </p>
        </div>
      </div>

      {/* Navigation Buttons */}
      <nav style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <Link 
          to="/game" 
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '12px 20px',
            background: 'linear-gradient(135deg, #3b82f6, #10b981)',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '10px',
            fontWeight: '600',
            fontSize: '0.9rem',
            boxShadow: '0 8px 16px rgba(59, 130, 246, 0.25)',
            transition: 'all 0.3s ease',
            minWidth: '120px'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 12px 20px rgba(59, 130, 246, 0.35)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 8px 16px rgba(59, 130, 246, 0.25)';
          }}
        >
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" style={{ marginRight: '6px' }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Stock Game
        </Link>
        
        <Link 
          to="/results" 
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '12px 20px',
            background: 'rgba(59, 130, 246, 0.08)',
            color: '#3b82f6',
            textDecoration: 'none',
            borderRadius: '10px',
            fontWeight: '600',
            fontSize: '0.9rem',
            border: '1px solid rgba(59, 130, 246, 0.2)',
            backdropFilter: 'blur(10px)',
            transition: 'all 0.3s ease',
            minWidth: '120px'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = 'rgba(59, 130, 246, 0.12)';
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.border = '1px solid rgba(59, 130, 246, 0.3)';
            e.target.style.boxShadow = '0 8px 16px rgba(59, 130, 246, 0.15)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'rgba(59, 130, 246, 0.08)';
            e.target.style.transform = 'translateY(0)';
            e.target.style.border = '1px solid rgba(59, 130, 246, 0.2)';
            e.target.style.boxShadow = 'none';
          }}
        >
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" style={{ marginRight: '6px' }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          Analytics
        </Link>
      </nav>
    </div>
  </div>
);

const App = () => {
  return (
    <div style={{ 
      margin: 0, 
      padding: 0,
      boxSizing: 'border-box',
      width: '100vw',
      height: '100vh'
    }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<Page1 />} />
        <Route path="/results" element={<Page2 />} />
      </Routes>
    </div>
  );
};

export default App;