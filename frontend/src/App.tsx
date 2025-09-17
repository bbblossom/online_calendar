import React from 'react';
import DayView from './components/DayView';
import WeekView from './components/WeekView';
import MonthView from './components/MonthView';
import YearView from './components/YearView';
import AgendaView from './components/AgendaView';

export interface EventType {
  id: string;
  date: string;
  startHour: number;
  endHour: number;
  title: string;
  desc: string;
}

const App: React.FC = () => {
  const today = new Date();
  const [view, setView] = React.useState<'day' | 'week' | 'month' | 'year' | 'agenda'>('month');
  const [currentYear, setCurrentYear] = React.useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = React.useState(today.getMonth());
  const [events, setEvents] = React.useState<EventType[]>([]);

  React.useEffect(() => {
    fetch('/api/events')
      .then(res => res.json())
      .then(data => setEvents(data));
  }, []);

  const handleCreateEvent = (date: Date, startHour: number, endHour: number, title: string, desc: string) => {
    const dateStr = date.toISOString().slice(0, 10);
    fetch('/api/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ date: dateStr, startHour, endHour, title, desc })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success && data.event) {
          setEvents(evts => [...evts, data.event]);
        }
      });
  };

  const todayYear = today.getFullYear();
  const todayMonth = today.getMonth();
  const todayDate = today.getDate();
  const weekDays = ['日', '一', '二', '三', '四', '五', '六'];
  const todayWeek = weekDays[today.getDay()];

  const viewNames = {
    day: '日',
    week: '周',
    month: '月',
    year: '年',
    agenda: '日程'
  };

  const handleMonthChange = (year: number, month: number) => {
    let y = year, m = month;
    if (m < 0) {
      y -= 1;
      m = 11;
    } else if (m > 11) {
      y += 1;
      m = 0;
    }
    setCurrentYear(y);
    setCurrentMonth(m);
    setView('month');
  };

  const handleYearMonthClick = (month: number) => {
    setCurrentMonth(month);
    setView('month');
  };

  return (
    <div style={{ padding: 24, fontFamily: 'sans-serif' }}>
      <h1>在线日历</h1>
      <div style={{ marginBottom: 12, color: '#1976d2', fontWeight: 'bold' }}>
        今天：{todayYear}年{todayMonth + 1}月{todayDate}日 星期{todayWeek}
      </div>
      <div style={{ marginBottom: 16 }}>
        {Object.entries(viewNames).map(([key, label]) => (
          <button
            key={key}
            style={{
              marginRight: 8,
              padding: '6px 16px',
              background: view === key ? '#1976d2' : '#f0f0f0',
              color: view === key ? '#fff' : '#333',
              border: 'none',
              borderRadius: 4,
              cursor: 'pointer',
              fontWeight: view === key ? 'bold' : 'normal'
            }}
            onClick={() => setView(key as typeof view)}
          >
            {label}
          </button>
        ))}
      </div>
      <div style={{ minHeight: 200, border: '1px solid #eee', borderRadius: 8, padding: 16 }}>
        <h2>{viewNames[view]}视图</h2>
        {view === 'day' && <DayView events={events} onCreateEvent={handleCreateEvent} />}
        {view === 'week' && <WeekView events={events} onCreateEvent={handleCreateEvent} />}
        {view === 'month' && (
          <MonthView
            year={currentYear}
            month={currentMonth}
            onMonthChange={handleMonthChange}
            onYearChange={setCurrentYear}
            todayInfo={{ year: todayYear, month: todayMonth, date: todayDate }}
          />
        )}
        {view === 'year' && (
          <YearView year={currentYear} onMonthClick={handleYearMonthClick} />
        )}
        {view === 'agenda' && <AgendaView />}
      </div>
    </div>
  );
};

export default App;