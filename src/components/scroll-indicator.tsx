'use client';

import * as React from 'react';

const HIDE_DELAY = 1200;

/**
 * Page scroll indicator.
 *
 * The native scrollbar is hidden in globals.css. This draws a slim, dark-grey,
 * rounded bar that spans only the space between the fixed header and the top of
 * the footer, fading out shortly after scrolling stops like an overlay
 * scrollbar. It never runs under the header or the footer.
 */
export function ScrollIndicator() {
  const [track, setTrack] = React.useState({ top: 0, height: 0 });
  const [active, setActive] = React.useState(false);
  const hideTimer = React.useRef<number | undefined>(undefined);

  React.useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;

      const doc = document.documentElement;
      const viewport = window.innerHeight;
      const headerHeight = document.getElementById('site-header')?.getBoundingClientRect().height ?? 80;
      const footer = document.querySelector('footer');
      const footerTop = footer ? Math.min(viewport, footer.getBoundingClientRect().top) : viewport;

      const trackTop = headerHeight;
      const trackBottom = Math.max(trackTop, footerTop);
      const trackHeight = trackBottom - trackTop;

      const total = doc.scrollHeight;
      const scrollable = total - viewport;

      if (trackHeight < 40 || scrollable < 8) {
        setTrack((current) => (current.height ? { ...current, height: 0 } : current));
        return;
      }

      const height = Math.max(40, Math.min(trackHeight, Math.round((viewport / total) * trackHeight)));
      const travel = Math.max(0, trackHeight - height);
      const progress = Math.min(1, Math.max(0, window.scrollY / scrollable));

      setTrack({ top: Math.round(trackTop + progress * travel), height });
    };

    const startHideTimer = () => {
      window.clearTimeout(hideTimer.current);
      hideTimer.current = window.setTimeout(() => setActive(false), HIDE_DELAY);
    };

    const onScroll = () => {
      setActive(true);
      if (!frame) frame = window.requestAnimationFrame(measure);
      startHideTimer();
    };

    const onResize = () => {
      if (!frame) frame = window.requestAnimationFrame(measure);
    };

    measure();
    startHideTimer();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);

    const observer = new ResizeObserver(onResize);
    observer.observe(document.body);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(hideTimer.current);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      observer.disconnect();
    };
  }, []);

  const visible = active && track.height > 0;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-y-0 right-0 z-20 w-2">
      <div
        className="absolute right-[3px] w-[5px] rounded-full bg-[#4a4a4a] transition-opacity duration-500"
        style={{
          top: `${track.top}px`,
          height: `${track.height}px`,
          opacity: visible ? 1 : 0
        }}
      />
    </div>
  );
}
