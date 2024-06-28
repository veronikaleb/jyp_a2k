const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

// Дані про відвідувачів (тут можна використовувати базу даних)
let visitorsData = [];

// Роут для отримання даних про відвідувачів у режимі реального часу (SSE)
app.get('/stream', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  const interval = setInterval(() => {
    const currentTime = Date.now();
    const onlineVisitors = visitorsData.filter(timestamp => currentTime - timestamp <= 5 * 60 * 1000).length;

    res.write(`data: ${JSON.stringify({ totalVisitors: visitorsData.length, onlineVisitors })}\n\n`);
  }, 1000); // Оновлення кожну секунду

  // Зупинка оновлення при закритті з'єднання
  req.on('close', () => {
    clearInterval(interval);
    res.end();
  });
});

// Прослуховування на порту 3000
server.listen(3000, () => {
  console.log('Server is running on port 3000');
});