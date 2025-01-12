import { useEffect, useState } from 'react';

const breakpoints: Record<string, string> = {
  mobile: '(max-width: 768px)',
  tablet: '(min-width: 769px) and (max-width: 1024px)',
  pc: '(min-width: 1025px)',
};

type Breakpoint = keyof typeof breakpoints | string;

const useMediaQuery = (breakpoint: Breakpoint) => {
  const query = breakpoints[breakpoint as keyof typeof breakpoints] || breakpoint;
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [query]);

  return matches;
};

export default useMediaQuery;
