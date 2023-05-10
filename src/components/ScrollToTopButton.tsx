import { FaArrowUp } from "react-icons/fa";
import { useEffect, useState } from "react";

interface ScrollToOptions {
  left?: number;
  top?: number;
  behavior?: "auto" | "smooth";
}
export default function ScrollToTopButton() {
  const isBrowser = () => typeof window !== "undefined";

  function scrollToTop() {
    if (!isBrowser()) return;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <button
      className={`fixed bottom-0 right-0 p-10
        transition-all duration-500 ease-in-out
        ${isVisible ? "visible" : "invisible"}
    `}
      onClick={scrollToTop}
    >
      <div
        className="flex justify-center items-center border-2-border-green-100 rounded-full 
      w-10 h-10 bg-green-100 opacity-70
      hover:opacity-100 
      hover:bg-green-200
      transition-all duration-500 ease-in-out
      
      "
      >
        <FaArrowUp className="" />
      </div>
    </button>
  );
}
