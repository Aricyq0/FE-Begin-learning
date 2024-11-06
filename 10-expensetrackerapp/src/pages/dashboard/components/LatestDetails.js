import { Flex } from "antd";
import { useDetails } from "../../../context";
import { useTag } from "../../../context";
import { Tag, Table, Typography } from "antd";

const LatestDetails = () => {
  const details = useDetails();
  const latestExpense = details
    .filter((item) => item.isExpense)
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  const latestIncome = details
    .filter((item) => !item.isExpense)
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  const LatestCard = ({ title, items }) => {
    const tags = useTag();

    const status = tags.map((tag) => ({
      color: tag.color,
      text: tag.name,
    }));

    const columns = [
      {
        title: "NAME",
        dataIndex: "category",
        render: (text) => {
          const index = status.findIndex((tag) => tag.text === text);
          const color = index !== -1 ? status[index].color : "green"; // 使用你的默认颜色
          return <Tag color={color}>{text}</Tag>;
        },
      },

      {
        title: "DATE",
        dataIndex: "date",
        render: (text) => <span>{text}</span>,
      },
      {
        title: "PRICE",
        dataIndex: "amount",
        render: (text) => <span>¥{text}</span>,
      },
    ];
    return (
      <Flex
        vertical
        justify="flex-start"
        align="space-between"
        style={{ padding: "12px", flex: 1, height: "100%" }}
        className="card"
      >
        <Typography.Text
          className="card-title"
          style={{ paddingBottom: "12px", paddingLeft: "12px" }}
        >
          {title}
        </Typography.Text>
        <Flex vertical justify="center" align="space-between" gap={"middle"}>
          <Table
            pagination={false}
            size={"large"}
            columns={columns}
            dataSource={items}
            rowKey={"id"}
          />
        </Flex>
      </Flex>
    );
  };

  return (
    <Flex
      justify="space-between"
      gap="large"
      style={{ flex: 3, height: "100%" }}
    >
      <LatestCard title="Recent Expense" items={latestExpense} />
      <LatestCard title="Recent Income" items={latestIncome} />
    </Flex>
  );
};

export default LatestDetails;
