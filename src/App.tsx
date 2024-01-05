import React from 'react';
// import Test from './DedicatedWorker/index1';  // 未使用worker
// import Test from './DedicatedWorker/index2'; // 使用js worker
// import Test from './DedicatedWorker/index3'; // 使用 ts worker
// import Test from './DedicatedWorker/index4'; // 使用 ts worker
// import Test from './DedicatedWorker/index5'; // offscreenCanvass
import Test from './sharedworker/index'; // sharedWorker

const App = () => {
  return <Test />;
};

export default App;
