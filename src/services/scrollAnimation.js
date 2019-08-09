const _scrollTo = (to, duration) => {
  if (duration <= 0) return;
  const currentPos =
    window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
  const difference = to - currentPos;
  const perTick = (difference / duration) * 10;
  setTimeout(function() {
    window.scrollTo(0, currentPos + perTick);
    if (currentPos === to) return;
    _scrollTo(to, duration - 10);
  }, 10);
};

export const scrollToSection = id => {
  const el = document.getElementById(id.substr(0, 1) === '#' ? id.substr(1) : id);
  if (!el) return console.error('No element found to scroll to:', id);
  const position = el.offsetTop;
  const duration = 150;
  _scrollTo(position, duration);
};

export const scrollToTop = () => {
  window.scrollTo(0, 0);
};
