import { set } from "lodash";
import { useEffect, useState } from "react";

export default function ScreenChecker() {
  const breakPoints = {
    xs: 320,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
  };
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const [windowHeight, setWindowHeight] = useState<number>(0);
  useEffect(() => {
    function handleResize() {
      setWindowWidth(Number(window.innerWidth));
      setWindowHeight(Number(window.innerHeight));
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const screenSize = () => {
    // switch case

    if (windowWidth < breakPoints.sm && windowWidth > breakPoints.xs) {
      return "xs";
    } else if (windowWidth < breakPoints.md && windowWidth > breakPoints.sm) {
      return "sm";
    } else if (windowWidth < breakPoints.lg && windowWidth > breakPoints.md) {
      return "md";
    } else if (windowWidth < breakPoints.xl && windowWidth > breakPoints.lg) {
      return "lg";
    } else {
      return "xl";
    }
  };

  return (
    <div className="flex flex-row gap-1 fixed bottom-0 z-50 right-0">
      <div
        className="                   
        xs:text-purple-500
        sm:text-red-400
        md:text-blue-400
        lg:text-green-400"
      >
        Window Size:
        {screenSize()?.toUpperCase()}
        <br />
        Window Height: {windowHeight}
        <br />
        Window Width: {windowWidth}
        <br />
        Alex's Height: 707
      </div>
      {/* <p className="text-purple-500">purple xs: {breakPoints.xs}</p>
      <p className="text-red-500">red sm: {breakPoints.sm}</p>
      <p className="text-blue-500">blue md: {breakPoints.md}</p>
      <p className="text-green-500">green lg: {breakPoints.lg}</p> */}
    </div>
  );
}
