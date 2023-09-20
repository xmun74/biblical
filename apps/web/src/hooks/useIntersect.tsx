import { useCallback, useEffect, useRef } from 'react';

type IntersectionObserverInitType = {
  root?: Element | Document | null;
  rootMargin?: string;
  threshold?: number | number[];
};

type OnIntersectHandler = (entry: IntersectionObserverEntry, observer: IntersectionObserver) => void;

type OffIntersectHandler = () => void;

const defaultOptions: IntersectionObserverInitType = {
  root: null,
  rootMargin: '0px',
  threshold: [0.0, 1.0],
};

export default function useIntersect(
  onIntersect: OnIntersectHandler,
  offIntersect?: OffIntersectHandler,
  options?: IntersectionObserverInitType
) {
  const target = useRef<HTMLDivElement>(null);

  const callback = useCallback(
    (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          onIntersect(entry, observer);
        } else {
          offIntersect && offIntersect();
        }
      });
    },
    [onIntersect, offIntersect]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(callback, {
      ...defaultOptions,
      ...options,
    });
    if (target.current) {
      observer.observe(target.current as Element);
    }
    return () => observer && observer.disconnect();
  }, [target, callback, options]);

  return target;
}
