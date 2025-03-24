/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";

const MultiSeriesPanel = ({ data }) => {
  const containerRef = useRef(null);
  const [gridConfig, setGridConfig] = useState({
    columns: 5,
    fontSize: 40,
    labelSize: 16,
  });

  useEffect(() => {
    const calculateLayout = () => {
      if (!containerRef.current) return;

      const containerWidth = containerRef.current.clientWidth;
      const containerHeight = containerRef.current.clientHeight;
      const itemCount = data.length;

      // Adaptive column calculation
      let columns = Math.min(Math.ceil(Math.sqrt(itemCount)), 5);

      // Ensure at least 2 columns for better spacing
      columns = Math.max(columns, 2);

      // Calculate rows
      const rows = Math.ceil(itemCount / columns);

      // Calculate cell dimensions with padding consideration
      const cellWidth = (containerWidth / columns) * 0.9; // 90% of cell width
      const cellHeight = (containerHeight / rows) * 0.9; // 90% of cell height

      // Calculate font sizes
      const valueFontSize = Math.min(cellWidth * 0.4, cellHeight * 0.5);
      const labelFontSize = Math.min(valueFontSize * 0.3, 24);

      setGridConfig({
        columns,
        fontSize: Math.min(valueFontSize, 80),
        labelSize: Math.min(labelFontSize, 24),
      });
    };

    calculateLayout();

    const resizeObserver = new ResizeObserver(calculateLayout);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        resizeObserver.unobserve(containerRef.current);
      }
    };
  }, [data.length]);

  return (
    <div
      ref={containerRef}
      className="h-full w-full flex items-center justify-center"
    >
      <div
        className="grid gap-4 place-items-center w-full"
        style={{
          gridTemplateColumns: `repeat(${gridConfig.columns}, minmax(0, 1fr))`,
        }}
      >
        {data.map((item, index) => (
          <div
            key={index}
            className="flex flex-col justify-center items-center text-center p-2 w-full"
          >
            <div
              className="font-bold text-white text-center"
              style={{
                fontSize: `${gridConfig.fontSize}px`,
                lineHeight: "1",
                wordBreak: "break-word",
              }}
            >
              {typeof item.value === "number"
                ? item.value.toLocaleString()
                : item.value}
            </div>
            {item.label && (
              <div
                className="text-gray-300 text-center mt-1 truncate w-full"
                style={{
                  fontSize: `${gridConfig.labelSize}px`,
                  wordBreak: "break-word",
                }}
              >
                {item.label}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultiSeriesPanel;
