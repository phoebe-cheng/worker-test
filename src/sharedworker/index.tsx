/**
 * sharedworker
 *
 * https://html.spec.whatwg.org/demos/workers/multiviewer/viewer.html
 */
import React, { useEffect, useRef, useState } from 'react';

const Test = () => {
  const myWorker = useRef<SharedWorker | null>(null);
  const [result, setResult] = useState(0);

  useEffect(() => {
    if (!!window.SharedWorker) {
      myWorker.current = new SharedWorker(new URL('./test.worker.js', import.meta.url), { name: 'sharedWorker123' });

      // 开启端口
      myWorker.current.port.start();

      // 如果采用 onmessage 方法，则默认开启端口，不需要再手动调用SharedWorker.port.start()方法
      myWorker.current.port.onmessage = (e) => {
        setResult(e.data);
      };
    }
  }, []);

  const handleAdd = () => {
    if (myWorker.current) {
      myWorker.current.port.postMessage('add');
    }
  };

  const handleReset = () => {
    if (myWorker.current) {
      myWorker.current.port.postMessage('reset');
    }
  };

  const handleStop = () => {
    if (myWorker.current) {
      myWorker.current.port.postMessage('stop');

      console.log('closed sharedworker success...');
    }
  };

  const handleOpen = () => {
    window.open(window.location.href, '_blank', 'width=1000,height=1000');
  };

  return (
    <>
      <button onClick={handleOpen}>open</button>
      <h2> 计算 </h2>
      结果: <span id="container">{result}</span>
      <br />
      <button onClick={handleAdd}>add</button>
      <button onClick={handleReset}>reset</button>
      <button onClick={handleStop}>stop</button>
    </>
  );
};

export default Test;
