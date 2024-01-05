const calc = (num) => {
  let temp = 0;

  const startTime = performance.now();

  for (let i = 0; i <= num; i++) {
    temp += i;
  }

  const endTime = performance.now();
  // 计算执行时间（以秒为单位）
  const executionTime = (endTime - startTime) / 1000;

  return {
    result: temp,
    executionTime,
  };
};
