import React, { useEffect, useState } from "react";
import { AiOutlineArrowUp } from "react-icons/ai";
import { scrollToTop } from "../../service/effect";

export default function ScrollTopBtn() {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const onScroll = () => setOffset(window.scrollY);

    window.removeEventListener("scroll", onScroll);

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return offset > 500 ? (
    <button
      onClick={() => {
        scrollToTop();
      }}
      className="btn btn-one btn-totop btn-pill btn-primary"
    >
      <AiOutlineArrowUp className="btn-totop__icon" />
    </button>
  ) : null;
}
