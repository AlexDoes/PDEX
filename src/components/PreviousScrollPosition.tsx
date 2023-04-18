import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export function usePreviousScrollPosition() {
  const router = useRouter();
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleRouteChange = () => {
      setScrollPosition(window.scrollY);
    };

    const handleRouteChangeComplete = () => {
      window.scrollTo(0, scrollPosition);
    };

    router.events.on("routeChangeStart", handleRouteChange);
    router.events.on("routeChangeComplete", handleRouteChangeComplete);

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
    };
  }, [router.events, scrollPosition]);

  return null;
}
