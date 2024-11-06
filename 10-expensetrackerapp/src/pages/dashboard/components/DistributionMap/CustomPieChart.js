import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Sector } from "recharts";
import { Typography } from "antd";
import React, { useState } from "react";

const COLORS = [
  "#00C49F",
  "#0088FE",
  "#FFBB28",
  "#FF8042",
  "#774DD6",

  "#64B5F6",
  "#C2185B",
  "#D32F2F",
  "#F57C00",
  "#FFC107",
];
// recharts raw code
const renderActiveShape = (props) => {
  const {
    cx,
    cy,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
  } = props;

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
    </g>
  );
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className={"card"} style={{ padding: "14px" }}>
        <Typography.Title
          level={5}
          style={{ margin: "0", color: payload[0].payload.fill }}
        >{`${payload[0].name}`}</Typography.Title>
        <Typography.Text>{`Total: ¥${payload[0].value}`}</Typography.Text>
      </div>
    );
  }
};

export function CustomPieChart({ data }) {
  const [state, setState] = useState({ activeIndex: 0 });
  const onPieEnter = (_, index) => {
    setState({
      activeIndex: index,
    });
  };
  return (
    <ResponsiveContainer width="100%" minHeight={280} style={{ flex: 9 }}>
      <PieChart style={{ backgroundColor: "#fff", margin: 0 }}>
        <Pie
          activeIndex={state.activeIndex}
          activeShape={renderActiveShape}
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          onMouseEnter={onPieEnter}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend
          layout="vertical"
          verticalAlign="top"
          align="left"
          iconType="circle"
          iconSize={6}
          wrapperStyle={{ top: 20, left: 20 }}
        />
        <Tooltip content={<CustomTooltip />} />
      </PieChart>
    </ResponsiveContainer>
  );
}
