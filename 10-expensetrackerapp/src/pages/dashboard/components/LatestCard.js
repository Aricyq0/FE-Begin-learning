import { Tag, Flex, Table, Typography } from "antd";
import { useTag } from "../../../context";

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
export default LatestCard;
