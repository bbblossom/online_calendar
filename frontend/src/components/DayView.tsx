import React from 'react';
import EventModal from './EventModal';

export interface EventType {
  date: string;
  startHour: number;
  endHour: number;
  title: string;
  desc: string;
}

interface DayViewProps {
  events: EventType[];
  onCreateEvent: (date: Date, startHour: number, endHour: number, title: string, desc: string) => void;
}

const DayView: React.FC<DayViewProps> = ({ events, onCreateEvent }) => {
  const now = new Date();
  const nowHour = now.getHours();
  const today = new Date();
  const todayStr = today.toISOString().slice(0, 10);
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const [selecting, setSelecting] = React.useState(false);
  const [startHour, setStartHour] = React.useState<number | null>(null);
  const [endHour, setEndHour] = React.useState<number | null>(null);
  const [showModal, setShowModal] = React.useState(false);
  const [modalRange, setModalRange] = React.useState<{ start: number; end: number } | null>(null);

  const dayEvents = events.filter(e => e.date === todayStr);

  const handleMouseDown = (h: number) => {
    setSelecting(true);
    setStartHour(h);
    setEndHour(h);
  };
  const handleMouseUp = (h: number) => {
    if (selecting && startHour !== null) {
      setEndHour(h);
      setSelecting(false);
      setModalRange({ start: Math.min(startHour, h), end: Math.max(startHour, h) });
      setShowModal(true);
    }
  };
  const handleMouseEnter = (h: number) => {
    if (selecting) setEndHour(h);
  };
  const closeModal = () => {
    setShowModal(false);
    setModalRange(null);
  };
  const getEventForHour = (h: number) => dayEvents.find(e => h >= e.startHour && h <= e.endHour);

  return (
    <div style={{ display: 'flex', height: 600, position: 'relative' }}>
      <div style={{ width: 60, borderRight: '1px solid #eee', background: '#fafafa' }}>
        {hours.map(h => (
          <div key={h} style={{ height: 24, textAlign: 'right', paddingRight: 8, fontSize: 12, color: '#888' }}>{h}:00</div>
        ))}
      </div>
      <div style={{ flex: 1, position: 'relative' }}>
        <div style={{ position: 'absolute', left: 0, top: 0, right: 0, bottom: 0 }}>
          <div style={{
            position: 'absolute',
            top: nowHour * 24,
            left: 0,
            right: 0,
            height: 2,
            background: 'red',
            zIndex: 10,
            pointerEvents: 'none'
          }} />
          {hours.map(h => {
            const event = getEventForHour(h);
            return (
              <div
                key={h}
                style={{
                  height: 24,
                  borderBottom: '1px solid #eee',
                  background: event ? '#fffde7' : selecting && startHour !== null && endHour !== null && h >= Math.min(startHour, endHour) && h <= Math.max(startHour, endHour) ? '#e3f2fd' : '#fff',
                  position: 'relative',
                  cursor: 'pointer',
                  transition: 'background 0.2s',
                }}
                onMouseDown={() => handleMouseDown(h)}
                onMouseUp={() => handleMouseUp(h)}
                onMouseEnter={() => handleMouseEnter(h)}
              >
                {event && h === event.startHour && (
                  <div style={{
                    position: 'absolute', left: 8, top: 2, fontSize: 13, color: '#b26a00', background: '#fffde7', borderRadius: 4, padding: '0 4px', zIndex: 2
                  }}>{event.title}</div>
                )}
              </div>
            );
          })}
        </div>
        <div style={{ padding: 8, fontWeight: 'bold' }}>今天：{today.toLocaleDateString()}</div>
        {showModal && modalRange && (
          <EventModal
            startHour={modalRange.start}
            endHour={modalRange.end}
            date={today}
            onClose={closeModal}
            onCreate={onCreateEvent}
          />
        )}
      </div>
    </div>
  );
};

export default DayView;
