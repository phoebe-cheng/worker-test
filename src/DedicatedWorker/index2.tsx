/**
 * 使用Web worker,  加载worker.js文件
 *
 * 1. 加载worker
 * 2. 发送消息
 * 3. 监听消息
 * 4. 终止worker
 */
import React from 'react';
import { useEffect, useRef, useState } from 'react';

// 1. 主线程采用new命令，调用Worker()构造函数，新建一个 Worker 线程。
// Webpack5对Web Workers提供了原生支持。
// import.meta 是一个内置在 ES 模块内部的对象,用于获取当前模块的URL。
// import.meta.url 表示一个模块在浏览器和 Node.js 的绝对路径。该特性属于 es2020 的一部分，webpack5 才支持。
const worker = new Worker(new URL('./test2.worker.js', import.meta.url), { name: 'testWorker2' });

// 相对于根目录
// const worker = new Worker('./test2.worker.js', { name : 'testWorker' });

const Test = () => {
  const [result, setResult] = useState(0);
  const [executionTime, setExecutionTime] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    // 3. 主线程通过worker.onmessage指定监听函数，接收Worker线程发回来的消息
    worker.onmessage = (e: MessageEvent) => {
      const { data } = e;
      // 事件对象的data属性可以获取 Worker 发来的数据。
      console.log('worker message:', data);
      const { result, executionTime } = data;

      setResult(result);

      setExecutionTime(executionTime);
    };

    worker.onmessageerror = (e) => {
      console.error(`Error receiving message from worker: ${e}`);
    };

    worker.addEventListener(
      'error',
      (e) => {
        console.log('Error: Line: ', {
          line: e.lineno,
          filename: e.filename,
          message: e.message,
        });
      },
      false
    );

    return () => {
      // 4.Worker 完成任务以后，主线程就可以把它关掉。
      worker.terminate();
    };
  }, []);

  const clear = () => {
    setResult(0);
    setExecutionTime(0);
  };

  const calc = () => {
    clear();

    const value = inputRef.current?.value;

    if (value) {
      const num = +value;

      // 2. 主线程调用worker.postMessage()方法，向 Worker 发消息.
      worker.postMessage({ type: 'calc', data: num });
    }
  };

  return (
    <>
      <h2>计算斐波那契数列</h2>
      <input type="number" placeholder="请输入数字" ref={inputRef} defaultValue="1" />

      <button onClick={calc}>计算</button>

      <h3>
        计算结果：<span>{result}</span>
        <br />
        计算花费时间：<span>{executionTime}s</span>
      </h3>

      <h2>请输入</h2>
      <input type="text" placeholder="请输入姓名" />
    </>
  );
};

export default Test;
