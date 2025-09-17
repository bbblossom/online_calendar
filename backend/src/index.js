import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Online Calendar Backend Running');
});

// 事件相关 API 路由（后续补充）

// 简单内存存储（可后续换为数据库）
let events = [];

// 获取所有事件
app.get('/api/events', (req, res) => {
  res.json(events);
});

// 创建事件
app.post('/api/events', (req, res) => {
  const event = req.body;
  event.id = Date.now().toString();
  events.push(event);
  res.json({ success: true, event });
});

// 删除事件
app.delete('/api/events/:id', (req, res) => {
  const { id } = req.params;
  events = events.filter(e => e.id !== id);
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
