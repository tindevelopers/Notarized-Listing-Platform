import * as React from "react";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  // Start with false as a stable server-safe default to prevent hydration mismatch
  const [isMobile, setIsMobile] = React.useState<boolean>(false);
  const [isHydrated, setIsHydrated] = React.useState(false);

  React.useEffect(() => {
    setIsHydrated(true);
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  // Return stable false until hydrated to prevent hydration mismatch
  return isHydrated ? isMobile : false;
}
