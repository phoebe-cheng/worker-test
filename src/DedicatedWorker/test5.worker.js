self.onmessage = function(e) {
  const { blockSize, startX, startY } = e.data;
  const imageData = createRect(blockSize, startX, startY, 'hsl(0, 50%, 50%)');
  self.postMessage({ startX, startY, imageData });
};

function createRect(num, startX, startY, hsl) {
  const canvas = new OffscreenCanvas(10 * num, 10 * num);
  const ctx = canvas.getContext('2d');

  let y;
  for (let i = 0; i < num; i++) {
    if (i % 10 === 0) startX += 10;
    y = startY;

    for (let j = 0; j < num; j++) {
      if (j % 10 === 0) y += 10;

      ctx.fillStyle = hsl;
      ctx.fillRect(startX, y, 10, 10);

      y += 12;
    }

    startX += 12;
  }

  return ctx.getImageData(0, 0, canvas.width, canvas.height);
}