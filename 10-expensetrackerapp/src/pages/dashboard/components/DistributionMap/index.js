import { useDetails } from "../../../../context";
import { Flex, Typography } from "antd";
import { CustomPieChart } from "./CustomPieChart";

const computeDistributionData = (data) => {
  const newData = {};
  data.forEach((item) => {
    if (newData[item.category]) {
      newData[item.category] += item.amount;
    } else {
      newData[item.category] = item.amount;
    }
  });

  // 将新数据转换为数组并排序
  const distributionArray = Object.keys(newData).map((key) => {
    return { name: key, value: newData[key] };
  });

  // 根据 value 值进行排序
  distributionArray.sort((a, b) => b.value - a.value);

  // 如果有超过 5 个项，则合并第六个及后面的项
  if (distributionArray.length > 5) {
    const othersValue = distributionArray
      .slice(5) // 获取第七个及以后的项
      .reduce((sum, item) => sum + item.value, 0); // 计算它们的总和

    // 保留前六个项，并添加“others”
    return [
      ...distributionArray.slice(0, 5),
      { name: "others", value: othersValue },
    ];
  }

  return distributionArray; // 如果项不超过 5 个，返回原数组
};

const DistributionMap = () => {
  const data = useDetails();

  const expensesDistributionData = computeDistributionData(
    data.filter((item) => item.isExpense)
  );

  const incomeDistributionData = computeDistributionData(
    data.filter((item) => !item.isExpense)
  );

  return (
    <Flex
      vertical
      align="center"
      justify="flex-start"
      className="card"
      style={{
        width: "100%",
        height: "100%",
        flex: 1,
        overflow: "hidden",
      }}
      gap={"small"}
    >
      <Typography.Text
        className="card-title"
        style={{
          textAlign: "left",
          flex: 1,
          paddingTop: "24px",
          paddingLeft: "16px",
        }}
      >
        Expense Distribution Map
      </Typography.Text>
      <CustomPieChart data={expensesDistributionData} />
      <Typography.Text
        className="card-title"
        style={{
          textAlign: "left",
          flex: 1,
          paddingTop: "24px",
          paddingLeft: "16px",
        }}
      >
        Income Distribution Map
      </Typography.Text>
      <CustomPieChart data={incomeDistributionData} />
    </Flex>
  );
};

export default DistributionMap;
