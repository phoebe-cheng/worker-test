// self.name： Worker 的名字。该属性只读，由构造函数指定
console.log('self.name::', self.name);

// Worker 线程可以navigator对象和location对象, 无法使用window/document等对象
console.log('self.location::', location);
console.log('self.navigator::', navigator);

// importScripts('./calc.js');

import { calc } from './calc.js'; // 导入外部js


  // 触发error事件
  // postMessage(x * 2);

// self.onmessage 监听函数
onmessage = (event) => {
  const { type, data } = event.data;

  switch (type) {
    case 'calc':
      const result = calc(data);

      // 向产生这个 Worker 线程发送消息。
      self.postMessage(result);
      // throw new Error('Worker 发生错误！');
      break;
    case 'stop':
      self.postMessage('WORKER STOPPED: ' + data.msg);

      // Worker 内部关闭自身。
      self.close();
      break;
  }
};

// messageerror : 发送的数据无法序列化成字符串时，会触发这个事件。
self.onmessageerror = (error) => {
  console.log('onmessageerror::', error);
};

self.onerror = (error) => {
  console.log('onerror::', error);
};

export default self;
