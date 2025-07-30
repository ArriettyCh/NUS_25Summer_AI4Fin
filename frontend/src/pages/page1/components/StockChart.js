

// components/StockChart.js - 完整优化版K线图
import React from 'react';
import { 
  ComposedChart,
  Bar,
  Line,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { translations, formatText } from '../utils/translations';

const StockChart = ({ data, currentWeek, language }) => {
  const t = translations[language];

  // 计算价格范围和优化显示
  const calculatePriceRange = (data) => {
    if (!data || data.length === 0) return { min: 0, max: 1, padding: 0.1 };
    
    const allPrices = data.flatMap(d => [d.high_price, d.low_price, d.open_price, d.close_price]);
    const minPrice = Math.min(...allPrices);
    const maxPrice = Math.max(...allPrices);
    const range = maxPrice - minPrice;
    
    // 如果价格范围太小，增加padding来改善显示效果
    const paddingPercent = range < 0.01 ? 0.1 : 0.05; // 如果范围小于0.01，使用10%的padding
    const padding = Math.max(range * paddingPercent, 0.001); // 最小padding为0.001
    
    return {
      min: minPrice - padding,
      max: maxPrice + padding,
      range: range,
      padding: padding
    };
  };

  // 改进的数字格式化函数 - 根据价格范围动态调整精度
  const smartFormatPrice = (value, priceRange) => {
    const num = parseFloat(value);
    if (isNaN(num)) return '0.0000';
    
    // 根据价格范围动态调整小数位数
    if (priceRange.range < 0.001) {
      return num.toFixed(6); // 非常小的范围用6位小数
    } else if (priceRange.range < 0.01) {
      return num.toFixed(5); // 小范围用5位小数
    } else if (priceRange.range < 0.1) {
      return num.toFixed(4); // 中等范围用4位小数
    } else {
      return num.toFixed(3); // 大范围用3位小数
    }
  };

  // 格式化成交量（转换为万或亿）
  const formatVolume = (volume) => {
    if (volume >= 100000000) {
      return `${(volume / 100000000).toFixed(2)}亿`;
    } else if (volume >= 10000) {
      return `${(volume / 10000).toFixed(0)}万`;
    }
    return volume.toString();
  };

  // 计算价格范围
  const priceRange = calculatePriceRange(data);

  // 处理数据，添加K线所需的字段
  const processedData = data?.map((item, index) => {
    const isRising = item.close_price >= item.open_price;
    const isFalling = item.close_price < item.open_price;
    
    return {
      ...item,
      isRising,
      isFalling,
      volumeColor: isRising ? '#00AA00' : '#FF4444'
    };
  }) || [];

  // 获取当前周数据
  const getCurrentWeekData = () => {
    if (!data || !Array.isArray(data) || currentWeek >= data.length || currentWeek < 0) {
      return null;
    }
    return data[currentWeek];
  };

  const currentData = getCurrentWeekData();

  // 改进的K线组件
  const ImprovedKLineBar = (props) => {
    const { payload, x, y, width, height } = props;
    if (!payload) return null;

    const candleWidth = Math.min(width * 0.7, 15); // 稍微增加蜡烛宽度
    const centerX = x + width / 2;

    // 计算相对高度，使用改进的价格范围
    const priceSpan = priceRange.max - priceRange.min;
    
    // 计算各部分的高度比例
    const highRatio = (payload.high_price - priceRange.min) / priceSpan;
    const lowRatio = (payload.low_price - priceRange.min) / priceSpan;
    const openRatio = (payload.open_price - priceRange.min) / priceSpan;
    const closeRatio = (payload.close_price - priceRange.min) / priceSpan;

    // 转换为像素坐标（Y轴翻转）
    const highY = y + (1 - highRatio) * height;
    const lowY = y + (1 - lowRatio) * height;
    const openY = y + (1 - openRatio) * height;
    const closeY = y + (1 - closeRatio) * height;

    const bodyTop = Math.min(openY, closeY);
    const bodyHeight = Math.abs(openY - closeY);
    const color = payload.isRising ? '#00AA00' : '#FF4444';

    return (
      <g>
        {/* 上影线 */}
        <line
          x1={centerX}
          y1={highY}
          x2={centerX}
          y2={bodyTop}
          stroke={color}
          strokeWidth={1.5}
        />
        {/* 下影线 */}
        <line
          x1={centerX}
          y1={bodyTop + bodyHeight}
          x2={centerX}
          y2={lowY}
          stroke={color}
          strokeWidth={1.5}
        />
        {/* K线实体 */}
        <rect
          x={centerX - candleWidth / 2}
          y={bodyTop}
          width={candleWidth}
          height={Math.max(bodyHeight, 2)} // 最小高度2px
          fill={payload.isRising ? 'rgba(68, 255, 77, 0.1)' : color} // 阳线用浅色填充
          stroke={color}
          strokeWidth={1.5}
        />
      </g>
    );
  };

  // 成交量柱状图
  const VolumeBar = (props) => {
    const { payload, x, y, width, height } = props;
    if (!payload) return null;
    
    const color = payload.isRising ? '#00AA00' : '#FF4444';
    
    return (
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={color}
        opacity={0.7}
      />
    );
  };

  // 改进的Tooltip
  const ImprovedTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const changeAmount = data.close_price - data.open_price;
      const changePercent = data.open_price !== 0 ? 
        ((changeAmount / data.open_price) * 100).toFixed(2) : '0.00';
      
      return (
        <div className="custom-tooltip" style={{
          backgroundColor: 'white',
          border: '1px solid #ccc',
          borderRadius: '8px',
          padding: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          fontSize: '12px',
          minWidth: '200px'
        }}>
          <p style={{ margin: '0 0 0px 0', fontWeight: 'bold', fontSize: '14px', color: '#333' }}>
            第{label}周
          </p>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0px', marginBottom: '0px' }}>
            <div>
              <span style={{ color: '#666', fontSize: '11px' }}>开盘: </span>
              <span style={{ fontWeight: 'bold' }}>${smartFormatPrice(data.open_price, priceRange)}</span>
            </div>
            <div>
              <span style={{ color: '#666', fontSize: '11px' }}>收盘: </span>
              <span style={{ 
                fontWeight: 'bold', 
                color: data.isRising ? '#00AA00' : '#FF4444' 
              }}>${smartFormatPrice(data.close_price, priceRange)}</span>
            </div>
            <div>
              <span style={{ color: '#666', fontSize: '11px' }}>最高: </span>
              <span style={{ fontWeight: 'bold', color: '#FF6B6B' }}>${smartFormatPrice(data.high_price, priceRange)}</span>
            </div>
            <div>
              <span style={{ color: '#666', fontSize: '11px' }}>最低: </span>
              <span style={{ fontWeight: 'bold', color: '#4CAF50' }}>${smartFormatPrice(data.low_price, priceRange)}</span>
            </div>
          </div>
          
          <div style={{ paddingTop: '8px', borderTop: '1px solid #eee' }}>
            <div style={{ marginBottom: '0px' }}>
              <span style={{ color: '#666', fontSize: '11px' }}>成交量: </span>
              <span style={{ fontWeight: 'bold' }}>{formatVolume(data.volume)}</span>
            </div>
            <div style={{ 
              color: data.isRising ? '#00AA00' : '#FF4444', 
              fontWeight: 'bold',
              fontSize: '13px'
            }}>
              {data.isRising ? '↗' : data.isFalling ? '↘' : '→'} ${smartFormatPrice(Math.abs(changeAmount), priceRange)} ({changePercent}%)
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  // 成交量Tooltip
  const VolumeTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="volume-tooltip" style={{
          backgroundColor: 'white',
          border: '1px solid #ccc',
          borderRadius: '6px',
          padding: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          fontSize: '12px'
        }}>
          <p style={{ margin: '0 0 4px 0', fontWeight: 'bold' }}>
            第{label}周
          </p>
          <p style={{ margin: '0', color: data.volumeColor }}>
            成交量: {formatVolume(data.volume)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="stock-chart">
      <h3 style={{ margin: '0 0 0px 0', fontSize: '18px', fontWeight: 'bold', textAlign: 'center' }}>
        {t.stockPriceTrend || 'K线走势图'}
      </h3>
    
      
      {/* K线图 */}
      <div className="kline-chart" style={{ height: '400px', marginBottom: '10px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={processedData} margin={{ top: 10, right: 30, left: 20, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="week" 
              tick={{ fontSize: 11 }}
              axisLine={{ stroke: '#d9d9d9' }}
              tickLine={{ stroke: '#d9d9d9' }}
            />
            <YAxis 
              domain={[priceRange.min, priceRange.max]} // 使用计算出的价格范围
              tick={{ fontSize: 11 }}
              axisLine={{ stroke: '#d9d9d9' }}
              tickLine={{ stroke: '#d9d9d9' }}
              tickFormatter={(value) => `$${smartFormatPrice(value, priceRange)}`}
            />
            <Tooltip content={<ImprovedTooltip />} />
            
            <Bar 
              dataKey="high_price"
              shape={<ImprovedKLineBar />}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* 成交量图 */}
      <div className="volume-chart" style={{ height: '70px', marginBottom: '10px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={processedData} margin={{ top: 0, right: 30, left: 20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="week" 
              tick={{ fontSize: 10 }}
              axisLine={{ stroke: '#d9d9d9' }}
            />
            <YAxis 
              tick={{ fontSize: 10 }}
              tickFormatter={formatVolume}
              axisLine={{ stroke: '#d9d9d9' }}
            />
            <Tooltip content={<VolumeTooltip />} />
            <Bar 
              dataKey="volume" 
              shape={<VolumeBar />}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

    
      {/* 当前周详细信息 */}
      <div className="current-week-indicator" style={{
        padding: '10px',
        backgroundColor: '#f8f9fa',
        borderRadius: '6px',
        fontSize: '13px',
        border: '1px solid #e9ecef'
      }}>
        <div style={{ 
          fontWeight: 'bold', 
          marginBottom: '0px', 
          fontSize: '14px',
          color: '#333',
          borderBottom: '1px solid #dee2e6',
          paddingBottom: '8px'
        }}>
          {formatText(t.currentWeek || '第{week}周', { week: currentWeek })}
        </div>
        {/* 涨跌幅信息 */}
            {/* <div>
              {(() => {
                const changeAmount = currentData.close_price - currentData.open_price;
                const changePercent = currentData.open_price !== 0 ? 
                  ((changeAmount / currentData.open_price) * 100).toFixed(2) : '0.00';
                const isRising = changeAmount > 0;
                const isFalling = changeAmount < 0;
                
                return (
                  <div style={{
                    color: isRising ? '#00AA00' : isFalling ? '#FF4444' : '#666',
                    fontWeight: 'bold',
                    fontSize: '14px'
                  }}>
                    {isRising ? `↗ ${t.rising || '上涨'}` : isFalling ? `↘ ${t.falling || '下跌'}` : `→ ${t.flat || '平盘'}`}

                    <span style={{ marginLeft: '8px' }}>
                      ${smartFormatPrice(Math.abs(changeAmount), priceRange)} ({changePercent}%)
                    </span>
                  </div>
                );
              })()}
            </div> */}
        {currentData && (
          <>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', 
              gap: '10px',
              marginBottom: '0px'
            }}>
              <div>
                <span style={{ color: '#666' }}>{t.openPrice || '开盘价'}:</span>
                <span style={{ marginLeft: '5px', fontWeight: 'bold' }}>
                  ${smartFormatPrice(currentData.open_price, priceRange)}
                </span>
              </div>
              <div>
                <span style={{ color: '#666' }}>{t.closePrice || '收盘价'}:</span>
                <span style={{ 
                  marginLeft: '5px', 
                  fontWeight: 'bold',
                  color: currentData.close_price >= currentData.open_price ? '#00AA00' : '#FF4444'
                }}>${smartFormatPrice(currentData.close_price, priceRange)}</span>
              </div>
              <div>
                <span style={{ color: '#666' }}>{t.highPrice || '最高价'}:</span>
                <span style={{ marginLeft: '5px', fontWeight: 'bold', color: '#FF6B6B' }}>
                  ${smartFormatPrice(currentData.high_price, priceRange)}
                </span>
              </div>
              <div>
                <span style={{ color: '#666' }}>{t.lowPrice || '最低价'}:</span>
                <span style={{ marginLeft: '5px', fontWeight: 'bold', color: '#4CAF50' }}>
                  ${smartFormatPrice(currentData.low_price, priceRange)}
                </span>
              </div>
              <div>
                <span style={{ color: '#666' }}>{t.volume || '成交量'}:</span>
                <span style={{ marginLeft: '5px', fontWeight: 'bold' }}>
                  {formatVolume(currentData.volume)}
                </span>
              </div>
            </div>
            
            
          </>
        )}
      </div>
    </div>
  );
};

export default StockChart;
