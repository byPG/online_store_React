import { useEffect, useState } from "react";

function FloatingScrollButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldScrollToTop, setShouldScrollToTop] = useState(false);

  useEffect(() => {
    function handleScroll() {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      const isPageScrollable = documentHeight > windowHeight + 100;
      const middleOfPage = (documentHeight - windowHeight) / 2;

      setIsVisible(isPageScrollable);
      setShouldScrollToTop(scrollTop > middleOfPage);
    }

    handleScroll();

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  function handleClick() {
    if (shouldScrollToTop) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    }
  }

  if (!isVisible) {
    return null;
  }

  return (
    <button
      className="floating-scroll-button"
      type="button"
      onClick={handleClick}
      aria-label={shouldScrollToTop ? "Scroll to top" : "Scroll to bottom"}
      title={shouldScrollToTop ? "Scroll to top" : "Scroll to bottom"}
    >
      <svg
        className={
          shouldScrollToTop ? "scroll-icon scroll-icon-up" : "scroll-icon"
        }
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          d="M6 9l6 6 6-6"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.4"
        />
      </svg>
    </button>
  );
}

export default FloatingScrollButton;
