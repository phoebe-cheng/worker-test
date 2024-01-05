const express = require('express');
const https = require('https');
const fs = require('fs');
const path = require('path');

const app = express();

// 配置静态文件目录
app.use(express.static('serviceWorker'));

// 创建 HTTPS 服务器
const options = {
  // key: fs.readFileSync(path.join(__dirname, 'localhost-key.pem')),
  // cert: fs.readFileSync(path.join(__dirname, 'localhost.pem')),
};

const server = https.createServer(options, app);

// 启动服务器
const port = 3001;
server.listen(port, () => {
  console.log(`Server running on https://localhost:${port}`);
});
