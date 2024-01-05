import React, { useRef, useEffect } from 'react';

const Test = () => {
  const input = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const width = 1500;
      const height = 1500;

      canvas.width = width;
      canvas.height = height;
    }
  }, []);

  const create = () => {
    console.time('耗时：');
    const number = +(input.current?.value || 10);

    if (canvasRef.current) {
      // 创建多个 Web Worker
      const numWorkers = 1;
      const workers = [];
      for (let i = 0; i < numWorkers; i++) {
        const worker = new Worker(new URL('./test5.worker.js', import.meta.url), { type: 'module', name: 'testWorker' });
        workers.push(worker);
      }

      const blockSize = Math.ceil(number / numWorkers);
      
      workers.forEach((worker, index) => {
        worker.postMessage({ blockSize, startX: index * blockSize, startY: 0 });

        worker.onmessage = (e: MessageEvent) => {
          const { data } = e;
          if (canvasRef.current) {
            const ctx = canvasRef.current.getContext('2d')!;
            const { startX, startY, imageData } = data;
            ctx.putImageData(imageData, startX, startY);
          }
        };
      });

      console.timeEnd('耗时：');
    }
  };

  const clear = () => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d')!;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  return (
    <>
      <input ref={input} type="number" defaultValue={100}></input>
      <button onClick={create}>创建</button>
      <button onClick={clear}>清除</button>
      <br />
      <canvas ref={canvasRef}></canvas>
    </>
  );
};

export default Test;
