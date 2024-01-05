const fibonacci = (n) => {
  if (n == 1 || n == 2) {
    return 1;
  }
  return fibonacci(n - 2) + fibonacci(n - 1);
};

const calc = (num) => {
  const startTime = performance.now();

  const result = fibonacci(num);

  const endTime = performance.now();
  // 计算执行时间（以秒为单位）
  const executionTime = (endTime - startTime) / 1000;

  return {
    result,
    executionTime,
  };
};

export { calc };
