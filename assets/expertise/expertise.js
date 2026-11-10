(() => {
  const area = document.getElementById('expertise');
  if (!area) return;
  const viewport = area.querySelector('.expertise-viewport');
  const track = area.querySelector('.expertise-track');
  const controls = area.querySelector('.expertise-controls');
  const [prev,next] = controls.querySelectorAll('button');
  const cards = Array.from(track.querySelectorAll('.expertise-tile'));
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  function sync() {
    const end = viewport.scrollWidth - viewport.clientWidth;
    controls.hidden = end <= 2;
    prev.disabled = viewport.scrollLeft <= 2;
    next.disabled = viewport.scrollLeft >= end - 2;
  }
  function shift(dir) {
    const left = viewport.scrollLeft, max = viewport.scrollWidth - viewport.clientWidth;
    const origin = viewport.getBoundingClientRect().left + 2;
    const stops = cards.map(a => left + a.getBoundingClientRect().left - origin);
    const step = left + dir * viewport.clientWidth * .82;
    const target = dir > 0 ? stops.find(x => x >= step) ?? max
                           : stops.slice().reverse().find(x => x <= step) ?? 0;
    viewport.scrollTo({left: Math.max(0,Math.min(max,target)),behavior: motion.matches ? 'instant' : 'smooth'});
  }
  prev.addEventListener('click',() => shift(-1));
  next.addEventListener('click',() => shift(1));
  viewport.addEventListener('scroll',sync,{passive:true});
  if ('ResizeObserver' in window) {
    const observer = new ResizeObserver(sync);
    observer.observe(viewport); observer.observe(track);
  } else window.addEventListener('resize',sync);
  sync();
})();
