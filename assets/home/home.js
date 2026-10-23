/* Keep a physical pin-and-thread layer above independently editable HTML cards. */
(() => {
  const surface = document.querySelector('.board-content');
  const overlay = surface?.querySelector('.board-overlay');
  if (!surface || !overlay) return;
  const board = surface.closest('.noticeboard');
  const selectors = ['.board-budget', '.board-food', '.board-toolkit', '.board-rings'];
  const ns = 'http://www.w3.org/2000/svg';
  const pins = overlay.querySelector('.board-pins');
  const knots = overlay.querySelector('.pin-knots');
  selectors.forEach((selector, i) => {
    const group = document.createElementNS(ns, 'g');
    const pin = document.createElementNS(ns, 'use');
    pin.setAttribute('href', '#board-pushpin');
    group.append(pin); pins.append(group);
    const knot = document.createElementNS(ns, 'ellipse');
    knot.setAttribute('rx', '3.7'); knot.setAttribute('ry', '1.7');
    knots.append(knot);
  });
  function anchorPoint(selector) {
    const card = surface.querySelector(selector);
    const anchor = card?.querySelector('.pin-anchor');
    if (!card || !anchor) return null;
    const style = getComputedStyle(card);
    const origin = style.transformOrigin.split(' ').map(parseFloat);
    const matrix = new DOMMatrix(style.transform === 'none' ? undefined : style.transform);
    // Work in the shared board plane. Parent perspective is applied to both layers.
    const local = new DOMPoint(anchor.offsetLeft + card.clientLeft - origin[0], anchor.offsetTop + card.clientTop - origin[1]).matrixTransform(matrix);
    return {x:card.offsetLeft + origin[0] + local.x, y:card.offsetTop + origin[1] + local.y};
  }
  let frame = 0;
  function draw() {
    const points = selectors.map(anchorPoint);
    if (points.some(point => !point)) return;
    const width = surface.clientWidth, height = surface.clientHeight;
    const scale = Math.max(.68, Math.min(1.12, width / 610));
    overlay.setAttribute('viewBox', `0 0 ${width} ${height}`);
    overlay.style.setProperty('--cord-scale', scale);
    // A Z-shaped route leaves the short paper captions unobstructed.
    const connections = [[0,1],[1,3],[3,2]];
    const d = connections.map(([a,b]) => {
      const p=points[a],q=points[b], sag=Math.min(7, Math.hypot(q.x-p.x,q.y-p.y)*.014);
      return `M${p.x},${p.y-1.8*scale}Q${(p.x+q.x)/2},${(p.y+q.y)/2+sag} ${q.x},${q.y-1.8*scale}`;
    }).join(' ');
    overlay.querySelectorAll('[data-thread]').forEach(path => path.setAttribute('d', d));
    points.forEach((point, i) => {
      pins.children[i].setAttribute('transform', `translate(${point.x} ${point.y}) scale(${scale}) rotate(${-12+i*7})`);
      knots.children[i].setAttribute('transform', `translate(${point.x} ${point.y-1.8*scale}) scale(${scale}) rotate(-8)`);
    });
    board.dataset.overlayReady = 'true';
  }
  function schedule() { cancelAnimationFrame(frame); frame = requestAnimationFrame(draw); }
  if ('ResizeObserver' in window) new ResizeObserver(schedule).observe(surface);
  else addEventListener('resize', schedule);
  document.fonts?.ready.then(schedule);
  addEventListener('pageshow', schedule);
  draw();
})();
