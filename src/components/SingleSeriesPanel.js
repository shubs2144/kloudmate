import React, { useState, useEffect, useRef } from "react";

const SingleSeriesPanel = ({ data }) => {
  const containerRef = useRef(null);
  const [fontSize, setFontSize] = useState(100);
  const [labelFontSize, setLabelFontSize] = useState(24);

  useEffect(() => {
    const calculateFontSize = () => {
      if (!containerRef.current) return;

      const containerWidth = containerRef.current.clientWidth;
      const containerHeight = containerRef.current.clientHeight;

      // Calculate font size based on container dimensions
      const calculatedFontSize = Math.min(
        containerWidth / 4,
        containerHeight * 0.8
      );
      setFontSize(Math.min(calculatedFontSize, 200)); // Cap at 200px

      // Set label font size proportionally but cap at 32px
      const calculatedLabelSize = Math.min(
        containerWidth / 20,
        containerHeight * 0.15
      );
      setLabelFontSize(Math.min(calculatedLabelSize, 32));
    };

    calculateFontSize();

    const resizeObserver = new ResizeObserver(calculateFontSize);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        resizeObserver.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex flex-col justify-center items-center h-full w-full"
    >
      {data.label && (
        <div
          className="text-gray-400 mb-2"
          style={{ fontSize: `${labelFontSize}px` }}
        >
          {data.label}
        </div>
      )}
      <div
        className="font-bold text-green-400"
        style={{ fontSize: `${fontSize}px`, lineHeight: "1" }}
      >
        {typeof data.value === "number"
          ? data.value.toLocaleString()
          : data.value}
      </div>
    </div>
  );
};

export default SingleSeriesPanel;
