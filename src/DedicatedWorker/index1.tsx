/**
 * 未使用Web worker
 */
import React from 'react';
import { useRef, useState } from 'react';

const Test = () => {
  const [result, setResult] = useState(0);
  const [executionTime, setExecutionTime] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const clear = () => {
    setResult(0);
    setExecutionTime(0);
  };

  const fibonacci = (n: number): number => {
    if (n == 1 || n == 2) {
      return 1;
    }
    return fibonacci(n - 2) + fibonacci(n - 1);
  };

  const calc = () => {
    clear();

    const value = inputRef.current?.value;

    if (value) {
      const startTime = new Date().getTime();

      const result = fibonacci(+value);

      setResult(result);

      const endTime = new Date().getTime();
      // 计算执行时间（以秒为单位）
      const executionTime = (endTime - startTime) / 1000;

      setExecutionTime(executionTime);
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
