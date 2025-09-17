import React from 'react';

interface MonthViewProps {
  year: number;
  month: number;
  onMonthChange: (y: number, m: number) => void;
  onYearChange: (y: number) => void;
  todayInfo: { year: number; month: number; date: number };
}

const MonthView: React.FC<MonthViewProps> = ({ year, month, onMonthChange, onYearChange, todayInfo }) => {
  const [yearPanelOpen, setYearPanelOpen] = React.useState(false);
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const weekDays = ['日', '一', '二', '三', '四', '五', '六'];
  const startWeekDay = firstDay.getDay();
  const calendarCells = [];
  for (let i = 0; i < startWeekDay; i++) {
    calendarCells.push(null);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    calendarCells.push(d);
  }
  while (calendarCells.length % 7 !== 0) {
    calendarCells.push(null);
  }
  const yearOptions = Array.from({ length: 21 }, (_, i) => year - 10 + i);
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8, position: 'relative' }}>
        <button onClick={() => onMonthChange(year, month - 1)} style={{ marginRight: 8 }}>&lt;</button>
        <span
          style={{ fontWeight: 'bold', fontSize: 18, cursor: 'pointer', marginRight: 8 }}
          onClick={() => setYearPanelOpen(v => !v)}
        >
          {year}年
        </span>
        <span style={{ fontWeight: 'bold', fontSize: 18 }}>{month + 1}月</span>
        <button onClick={() => onMonthChange(year, month + 1)} style={{ marginLeft: 8 }}>&gt;</button>
        {yearPanelOpen && (
          <div style={{ position: 'absolute', top: 36, left: 60, zIndex: 10, background: '#fff', border: '1px solid #1976d2', borderRadius: 6, boxShadow: '0 2px 8px #0002', padding: 8, width: 120 }}>
            <div style={{ maxHeight: 200, overflowY: 'auto' }}>
              {yearOptions.map(y => (
                <div
                  key={y}
                  style={{
                    padding: '6px 0',
                    textAlign: 'center',
                    cursor: 'pointer',
                    background: y === year ? '#e3f2fd' : undefined,
                    color: y === year ? '#1976d2' : undefined,
                    fontWeight: y === year ? 'bold' : undefined
                  }}
                  onClick={() => {
                    onYearChange(y);
                    setYearPanelOpen(false);
                  }}
                >
                  {y}年
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4, marginBottom: 4 }}>
        {weekDays.map((wd, i) => (
          <div key={i} style={{ fontWeight: 'bold', textAlign: 'center', color: '#1976d2' }}>{wd}</div>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4 }}>
        {calendarCells.map((day, idx) => {
          if (day === null) return <div key={idx}></div>;
          const dateObj = new Date(year, month, day);
          const weekDay = weekDays[dateObj.getDay()];
          const isToday = year === todayInfo.year && month === todayInfo.month && day === todayInfo.date;
          return (
            <div
              key={idx}
              style={{
                border: isToday ? '2px solid #1976d2' : '1px solid #ccc',
                borderRadius: 4,
                padding: 8,
                textAlign: 'center',
                background: isToday ? '#e3f2fd' : undefined,
                color: isToday ? '#1976d2' : undefined,
                fontWeight: isToday ? 'bold' : undefined
              }}
            >
              <div>{day}</div>
              <div style={{ fontSize: 12, color: isToday ? '#1976d2' : '#888' }}>{weekDay}</div>
            </div>
          );
        })}
      </div>
      <p>（此处可展示本月事件）</p>
    </div>
  );
};

export default MonthView;
