/* Decorative thread positions follow the real CSS grid, never image dimensions. */
(() => {
  const board = document.querySelector('.board-content');
  const svg = document.querySelector('.board-threads');
  if (!board || !svg) return;
  const pins = ['.board-budget .pin', '.board-food .pin', '.board-toolkit .pin', '.board-rings .pin'];
  let frame;
  function draw() {
    // offset coordinates avoid perspective-transformed bounding rectangles.
    const points = pins.map(selector => {
      const pin = board.querySelector(selector);
      if (!pin) return null;
      const paper = pin.parentElement;
      return [paper.offsetLeft + paper.offsetWidth / 2, paper.offsetTop + pin.offsetTop + pin.offsetHeight / 2];
    }).filter(Boolean);
    svg.setAttribute('viewBox', `0 0 ${board.clientWidth} ${board.clientHeight}`);
    svg.querySelector('path').setAttribute('d', points.map((point, index) => `${index ? 'L' : 'M'}${point.join(',')}`).join(' '));
  }
  function schedule() { cancelAnimationFrame(frame); frame = requestAnimationFrame(draw); }
  if ('ResizeObserver' in window) new ResizeObserver(schedule).observe(board);
  else addEventListener('resize', schedule);
  document.fonts?.ready.then(schedule);
  draw();
})();
