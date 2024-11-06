import { Typography, Flex } from "antd";
import { useDetails } from "../../../context";
import React from "react";
import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  ResponsiveContainer,
} from "recharts";

const MonthlyTracker = () => {
  const Details = useDetails();

  // 遍历数据以计算最近12个月的支出和收入
  const currentDate = new Date(); // 获取当前日期
  const currentYear = currentDate.getFullYear(); // 获取当前年份
  const currentMonth = currentDate.getMonth(); // 获取当前月份（0-11）
  const monthlyData = {};

  // 计算最近12个月的月份

  // 遍历数据
  Details.forEach((item) => {
    const date = new Date(item.date);
    const month = date.toLocaleString("en-US", { month: "short" }); // 获取月份
    const year = date.getFullYear(); // 获取年份

    // 仅处理最近12个月的数据
    if (
      (date.getMonth() >= currentMonth &&
        date.getFullYear() === currentYear - 1) ||
      year === currentYear
    ) {
      const key = `${month}-${year}`; // 创建包含年月的键

      if (!monthlyData[key]) {
        monthlyData[key] = { name: `${month} ${year}`, expense: 0, income: 0 };
      }

      if (item.isExpense) {
        monthlyData[key].expense += item.amount;
      } else {
        monthlyData[key].income += item.amount;
      }
    }
  });

  // 将对象转换为数组
  const resultArray = Object.values(monthlyData);

  // 按时间顺序排序
  resultArray.sort((a, b) => {
    const dateA = new Date(a.name);
    const dateB = new Date(b.name);
    return dateA - dateB; // 按时间先后排序
  });

  return (
    <Flex
      vertical
      justify="space-between"
      style={{ width: "100%", padding: "24px", flex: 3 }}
      className="card"
    >
      <Typography.Text
        className="card-title"
        style={{ paddingBottom: "16px", flex: 1 }}
      >
        Monthly Tracker
      </Typography.Text>
      <ResponsiveContainer minHeight={300} style={{ flex: 14 }}>
        <LineChart data={resultArray}>
          <CartesianGrid
            vertical={false}
            stroke="#e5e5e5"
            strokeDasharray="3 3"
          />
          <XAxis
            dataKey="name"
            axisLine={{ stroke: "#e5e5e5", strokeWidth: 1 }}
            tick={{ fontSize: "12px" }}
          />
          <YAxis axisLine={false} tickLine={false} />
          <Tooltip
            wrapperStyle={{
              border: "none",
              boxShadow: "4px 4px 40px rgba(0,0,0,0.05)",
            }}
          />
          <Legend
            verticalAlign="top"
            height={"44px"}
            iconType={"circle"}
            iconSize={"8px"}
            wrapperStyle={{ fontSize: "16px", fontWeight: "500" }}
          />
          <Line
            type="monotone"
            dataKey="expense"
            stroke="#ff4f42"
            strokeWidth={3}
            dot={{ fill: "#ff4f42" }}
            activeDot={{ r: 5, strokeWidth: 0 }}
          />
          <Line
            type="monotone"
            dataKey="income"
            stroke="#52c41a"
            strokeWidth={3}
            dot={{ fill: "#52c41a" }}
            activeDot={{ r: 5, strokeWidth: 0 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Flex>
  );
};

export default MonthlyTracker;
