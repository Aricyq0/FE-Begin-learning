import React from "react";
import { useDetails } from "../../../context";
import { Flex, Typography } from "antd";
import { Button } from "antd";
import { GrTransaction } from "react-icons/gr";
import { TransactionOutlined } from "@ant-design/icons";
import Countup from "react-countup";
import { blue, red, green } from "@ant-design/colors";

const ReviewCardGroup = () => {
  const details = useDetails();

  // 计算总收入, 总支出, 余额
  const { Expense, Income } = details.reduce(
    (acc, curr) => {
      const amount = Number(curr.amount); // 确保将 curr.amount 转换为数字
      if (curr.isExpense) {
        acc.Expense += amount;
      } else {
        acc.Income += amount;
      }
      return acc;
    },
    { Expense: 0, Income: 0 }
  );
  const Balance = Income - Expense;

  // 统计各类别的数量
  const ExpenseItemCounts = details.filter((item) => item.isExpense).length;
  const IncomeItemCounts = details.filter((item) => !item.isExpense).length;
  const TotalItemCount = details.length;

  const ReviewCard = ({ title, counts, amount, color }) => {
    return (
      <Flex
        vertical
        justify="center"
        align="flex-start"
        gap={"small"}
        style={{
          flex: 1,
          height: "100%",
          position: "relative",
          padding: "24px",
          backgroundColor: color,
          color: "white",
        }}
        className="card"
      >
        <Button
          type="Text"
          autoInsertSpace={false}
          icon={
            <GrTransaction
              size={12}
              style={{
                color: "white",
              }}
            />
          }
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            zIndex: 1,
            fontSize: 12,
            padding: 4,
            gap: 4,
            height: 24,
            color: "white",
            borderColor: "transparent",
          }}
        >
          {counts} items
        </Button>

        <TransactionOutlined style={{ fontSize: 28 }} />

        <Typography.Text
          className="card-title"
          style={{
            margin: "0",
            fontSize: 14,
            color: "white",
            fontFamily: "DM Sans Display",
          }}
        >
          {title}
        </Typography.Text>
        <Typography.Title
          level={4}
          style={{
            fontFamily: "DM Serif Display",
            textAlign: "center",
            color: "white",
            fontSize: 32,
            margin: "0",
          }}
        >
          <Countup
            start={0}
            end={amount}
            duration={2.5}
            useEasing
            useGrouping
            separator=","
          />
        </Typography.Title>
      </Flex>
    );
  };

  return (
    <>
      <Flex
        justify="space-between"
        gap={"large"}
        style={{ height: "100%", flex: 1, minWidth: "100%" }}
      >
        <ReviewCard
          title={"BALANCE"}
          counts={TotalItemCount}
          amount={Balance}
          color={blue.primary}
        />

        <ReviewCard
          title={"INCOME"}
          counts={IncomeItemCounts}
          amount={Income}
          color={green.primary}
        />
        <ReviewCard
          title={"EXPENSE"}
          counts={ExpenseItemCounts}
          amount={Expense}
          color={red.primary}
        />
      </Flex>
    </>
  );
};

export default ReviewCardGroup;
