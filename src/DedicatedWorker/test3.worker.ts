// self.name： Worker 的名字。该属性只读，由构造函数指定
console.log('self.name::', self.name);

// Worker 线程可以navigator对象和location对象, 无法使用window/document等对象
console.log('self.location::', location);
console.log('self.navigator::', navigator);

// self.onmessage 监听函数
self.onmessage = (event: MessageEvent) => {
  const { type, data } = event.data;

  console.log('self message:', { type, data });
};

// messageerror : 发送的数据无法序列化成字符串时，会触发这个事件。
self.onmessageerror = (error: MessageEvent) => {
  console.log('onmessageerror::', error);
};

self.onerror = (error: any) => {
  console.log('onerror::', error);
};

export default {} as typeof Worker & { new (): Worker };
