import React from "react";
import { ResponsiveContainer, LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

interface LMSChartProps {
  data: any[];
  type?: "line" | "bar" | "area";
  xKey: string;
  series: {
    key: string;
    name: string;
    color: string;
  }[];
  height?: number | string;
  showGrid?: boolean;
}

export const LMSChart = ({ data, type = "line", xKey, series, height = 300, showGrid = true }: LMSChartProps) => {
  const commonProps = {
    data,
    margin: { top: 10, right: 10, left: -20, bottom: 0 }
  };

  const renderTooltip = () => (
    <Tooltip
      contentStyle={{ backgroundColor: "#080808", borderColor: "#ffffff20", borderRadius: "0" }}
      itemStyle={{ fontSize: "12px", fontFamily: "monospace" }}
      labelStyle={{ fontSize: "12px", color: "#ffffff50", marginBottom: "4px" }}
      cursor={{ fill: "#ffffff05", stroke: "#ffffff20" }}
    />
  );

  const renderAxes = () => (
    <>
      <XAxis dataKey={xKey} stroke="#ffffff50" fontSize={10} tickLine={false} axisLine={false} />
      <YAxis stroke="#ffffff50" fontSize={10} tickLine={false} axisLine={false} />
    </>
  );

  return (
    <div style={{ width: "100%", height }}>
      <ResponsiveContainer>
        {type === "line" ? (
          <LineChart {...commonProps}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />}
            {renderAxes()}
            {renderTooltip()}
            <Legend wrapperStyle={{ fontSize: '10px', paddingTop: '10px' }} />
            {series.map((s) => (
              <Line key={s.key} type="monotone" dataKey={s.key} name={s.name} stroke={s.color} strokeWidth={2} dot={false} activeDot={{ r: 4, fill: s.color, strokeDasharray: '' }} />
            ))}
          </LineChart>
        ) : type === "bar" ? (
          <BarChart {...commonProps}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />}
            {renderAxes()}
            {renderTooltip()}
            <Legend wrapperStyle={{ fontSize: '10px', paddingTop: '10px' }} />
            {series.map((s) => (
              <Bar key={s.key} dataKey={s.key} name={s.name} fill={s.color} />
            ))}
          </BarChart>
        ) : (
          <AreaChart {...commonProps}>
            <defs>
              {series.map((s) => (
                <linearGradient key={`grad-${s.key}`} id={`grad-${s.key}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={s.color} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={s.color} stopOpacity={0} />
                </linearGradient>
              ))}
            </defs>
            {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />}
            {renderAxes()}
            {renderTooltip()}
            <Legend wrapperStyle={{ fontSize: '10px', paddingTop: '10px' }} />
            {series.map((s) => (
              <Area key={s.key} type="monotone" dataKey={s.key} name={s.name} stroke={s.color} fillOpacity={1} fill={`url(#grad-${s.key})`} />
            ))}
          </AreaChart>
        )}
      </ResponsiveContainer>
    </div>
  );
};
