const express = require('express');
const app = express();

app.get('/sse-stream', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header({
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
  });

  const messages = ['Hello', ' ', 'World', '!', '🚀'];
  let index = 0;

  const push = () => {
    if (index >= messages.length) {
      res.write('event: end\ndata: { "done": true }\n\n');
      res.end();
      return;
    }
    
    res.write(`data: ${JSON.stringify({
      value: messages[index++]
    })}\n\n`);
    setTimeout(push, 500);
  };

  push();
});
app.listen(3000, () => console.log('Server running on port 3000'));