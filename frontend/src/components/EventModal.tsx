import React from 'react';

export interface EventModalProps {
  startHour: number;
  endHour: number;
  date: Date;
  onClose: () => void;
  onCreate: (date: Date, startHour: number, endHour: number, title: string, desc: string) => void;
}

const EventModal: React.FC<EventModalProps> = ({ startHour, endHour, date, onClose, onCreate }) => {
  const [title, setTitle] = React.useState('');
  const [desc, setDesc] = React.useState('');
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreate(date, startHour, endHour, title, desc);
    setTitle('');
    setDesc('');
    onClose();
  };
  return (
    <div style={{
      position: 'absolute',
      top: 40,
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 100,
      background: 'linear-gradient(135deg, #e3f2fd 0%, #fff 100%)',
      border: '1.5px solid #1976d2',
      borderRadius: 16,
      boxShadow: '0 8px 32px #1976d233, 0 1.5px 8px #1976d222',
      padding: 24,
      minWidth: 320,
      animation: 'modalFadeIn 0.3s',
      fontFamily: 'inherit',
    }}>
      <h3 style={{
        margin: 0,
        marginBottom: 12,
        fontSize: 20,
        color: '#1976d2',
        fontWeight: 700,
        letterSpacing: 1
      }}>新建事件 / 待办事项</h3>
      <div style={{ marginBottom: 12, fontSize: 15, color: '#333', lineHeight: 1.6 }}>
        <span style={{ fontWeight: 500 }}>日期：</span>{date.toLocaleDateString()}<br />
        <span style={{ fontWeight: 500 }}>时间：</span>{startHour}:00 - {endHour + 1}:00
      </div>
      <div style={{ borderBottom: '1px solid #e3e3e3', marginBottom: 16 }} />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="请输入标题（必填）"
          value={title}
          onChange={e => setTitle(e.target.value)}
          style={{
            width: '100%',
            marginBottom: 12,
            padding: '10px 12px',
            fontSize: 15,
            border: '1.5px solid #90caf9',
            borderRadius: 8,
            outline: 'none',
            boxSizing: 'border-box',
            transition: 'border-color 0.2s',
          }}
          required
        />
        <textarea
          placeholder="描述（可选）"
          value={desc}
          onChange={e => setDesc(e.target.value)}
          style={{
            width: '100%',
            marginBottom: 12,
            padding: '10px 12px',
            fontSize: 15,
            border: '1.5px solid #bbdefb',
            borderRadius: 8,
            outline: 'none',
            boxSizing: 'border-box',
            resize: 'vertical',
            minHeight: 60,
            maxHeight: 120,
            transition: 'border-color 0.2s',
          }}
          rows={3}
        />
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 8 }}>
          <button type="button" onClick={onClose} style={{
            padding: '8px 24px',
            background: '#fff',
            color: '#1976d2',
            border: '1.5px solid #90caf9',
            borderRadius: 8,
            cursor: 'pointer',
            fontWeight: 500,
            fontSize: 15,
            boxShadow: '0 1px 4px #1976d211',
            transition: 'background 0.2s, color 0.2s',
          }}>取消</button>
          <button type="submit" style={{
            padding: '8px 24px',
            background: 'linear-gradient(90deg, #1976d2 60%, #64b5f6 100%)',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: 15,
            boxShadow: '0 1px 4px #1976d211',
            letterSpacing: 1,
            transition: 'background 0.2s',
          }}>保存</button>
        </div>
      </form>
      <style>{`
        @keyframes modalFadeIn {
          from { opacity: 0; transform: translateX(-50%) scale(0.95); }
          to { opacity: 1; transform: translateX(-50%) scale(1); }
        }
      `}</style>
    </div>
  );
};

export default EventModal;
