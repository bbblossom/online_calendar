import React from 'react';

interface YearViewProps {
  year: number;
  onMonthClick: (m: number) => void;
}

const YearView: React.FC<YearViewProps> = ({ year, onMonthClick }) => {
  return (
    <div>
      <p>{year}年</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
        {Array.from({ length: 12 }, (_, i) => (
          <div key={i} style={{ border: '1px solid #1976d2', borderRadius: 4, padding: 12, textAlign: 'center', cursor: 'pointer', background: '#f5faff' }} onClick={() => onMonthClick(i)}>
            {i + 1}月
          </div>
        ))}
      </div>
      <p>点击月份可查看对应月</p>
    </div>
  );
};

export default YearView;
