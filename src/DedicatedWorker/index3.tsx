/**
 * 使用Web worker,  加载worker.ts文件
 *
 * 1. 加载worker
 * 2. 发送消息
 * 3. 监听消息
 * 4. 终止worker
 */
import React from 'react';
import { useEffect } from 'react';
import TestWorker from './test3.worker';

// const worker = new Worker(new URL('./test.worker', import.meta.url));

// 1. 主线程采用new命令，调用Worker()构造函数，新建一个 Worker 线程。
const worker = new TestWorker();

const Test = () => {
  useEffect(() => {
    // 可转移对象
    const uInt8Array = new Uint8Array(1024 * 1024 * 8).map((_v, i) => i);
    console.log('uInt8Array.byteLength11111:::', uInt8Array.byteLength); // 8388608

    // worker.postMessage({ array: uInt8Array });

    worker.postMessage(uInt8Array, [uInt8Array.buffer]);

    const arrayBuffer = new ArrayBuffer(10);
    // worker.postMessage({ buffer: arrayBuffer }, [arrayBuffer]);
    worker.postMessage({ buffer: arrayBuffer });

    console.log('arrayBuffer.byteLength:::', arrayBuffer.byteLength); // 0

    console.log('uInt8Array.byteLength22222:::', uInt8Array.byteLength); // 0

    // 3. 主线程通过worker.onmessage指定监听函数，接收Worker线程发回来的消息
    worker.onmessage = (e: any) => {
      // 事件对象的data属性可以获取 Worker 发来的数据。
      console.log('worker message:', e.data);
    };

    worker.onmessageerror = (e: MessageEvent) => {
      console.log('worker onmessageerror:', e);
    };

    worker.onerror = (e: ErrorEvent) => {
      console.log('worker onerror:', e);

      console.log(e.message, e.filename, e.lineno);
    };

    return () => {
      // 4.Worker 完成任务以后，主线程就可以把它关掉。
      worker.terminate();
    };
  }, []);

  return <></>;
};

export default Test;
