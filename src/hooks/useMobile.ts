import { useState, useEffect } from "react";

function useMobile(maxWidth: number): boolean {
  const [isMobile, setIsMobile] = useState(
    () => window.matchMedia(`(max-width: ${maxWidth}px)`).matches
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(max-width: ${maxWidth}px)`);

    const handleChange = () => setIsMobile(mediaQuery.matches);

    // Слушаем изменения размеров экрана
    mediaQuery.addEventListener("change", handleChange);

    // Очищаем слушатель при размонтировании
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [maxWidth]);

  return isMobile;
}

export default useMobile;
