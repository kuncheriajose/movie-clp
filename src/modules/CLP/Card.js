import React, { memo, useRef } from "react";
import useIntersectionObserver from "../../hooks/useIntersectionObserver";

function Card({ name, imageUrl }) {
  const imageRef = useRef();
  const isVisible = useIntersectionObserver(imageRef, { rootMargin: "500px" }, true);

  return (
    <div className="relative">
      <div className="relative pt-[149%] bg-gray-100">
        <img className="absolute top-0 left-0 right-0" ref={imageRef} src={isVisible ? imageUrl : ""} alt="" />
      </div>
      <div className="font-light text-xs mt-1">{name}</div>
    </div>
  );
}

export default memo(Card);
