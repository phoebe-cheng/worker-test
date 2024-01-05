let num = 0;
const workerList = [];

console.log('self.name::', self.name);

self.onconnect = (e) => {
  const port = e.ports[0];
  let stop = false;

  port.onmessage = (e) => {
    switch (e.data) {
      case 'add':
        num += 1;
        break;
      case 'reset':
        num = 0;
        break;
      case 'stop':
        stop = true;
        break;
    }

    workerList.forEach((port) => {
      // 遍历所有已连接的part，发送消息
      port.postMessage(num);

      if (stop) port.close(); // 关闭part
    });
  };

  port.start();

  workerList.push(port); // 存储已连接的part
};


