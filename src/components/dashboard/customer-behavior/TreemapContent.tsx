
import React from 'react';

interface TreemapContentProps {
  root: any;
  depth: number;
  x: number;
  y: number;
  width: number;
  height: number;
  index: number;
  name: string;
  value: number;
  description?: string;
  fill: string;
}

export const CustomizedTreemapContent = (props: TreemapContentProps) => {
  const { depth, x, y, width, height, name, value, fill } = props;

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        style={{
          fill,
          stroke: '#fff',
          strokeWidth: 2,
          fillOpacity: depth < 2 ? 0.9 : 0.8,
        }}
      />
      {width > 60 && height > 30 && (
        <text
          x={x + width / 2}
          y={y + height / 2 - 10}
          textAnchor="middle"
          fill="#fff"
          fontSize={12}
          fontWeight="bold"
        >
          {name}
        </text>
      )}
      {width > 60 && height > 50 && (
        <text
          x={x + width / 2}
          y={y + height / 2 + 10}
          textAnchor="middle"
          fill="#fff"
          fontSize={10}
        >
          {value} customers
        </text>
      )}
    </g>
  );
};
