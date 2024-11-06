import {
  Card,
  Flex,
  Typography,
  Form,
  InputNumber,
  Select,
  DatePicker,
  Button,
} from "antd";
import { useState } from "react";
import { useTag, useDetailsDispatch } from "../../../context";

const TransactionForm = ({ isExpense }) => {
  const tags = useTag();
  const dispatch = useDetailsDispatch();
  const [form] = Form.useForm();

  const options = tags
    .filter((tag) => tag.isExpense === isExpense)
    .map((tag) => ({
      label: tag.name,
      value: tag.name,
    }));

  const onFinish = (values) => {
    dispatch({
      type: "ADD_ITEM",
      ...values,
      category: values.category[0],
      date: values.date.format("YYYY-MM-DD"),
      isExpense: isExpense,
    });
    form.setFieldValue("amount", null);
  };

  return (
    <Form form={form} wrapperCol={{ span: 24 }} onFinish={onFinish}>
      <Form.Item
        name="category"
        rules={[{ required: true, message: "Please select category" }]}
      >
        <Select
          mode="tags"
          maxCount={1}
          options={options}
          placeholder="Select category"
          allowClear
          style={{ width: "100%" }}
        />
      </Form.Item>

      <Form.Item
        name="date"
        rules={[{ required: true, message: "Please select date" }]}
      >
        <DatePicker style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item
        name="amount"
        rules={[{ required: true, message: "Please enter amount" }]}
      >
        <InputNumber
          placeholder="Enter amount"
          min={0}
          step={0.01}
          suffix={"¥"}
          style={{ width: "100%" }}
        />
      </Form.Item>
      <Form.Item>
        {" "}
        <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
          {isExpense ? "Add Expense" : "Add Income"}
        </Button>
      </Form.Item>
    </Form>
  );
};

const tabList = [
  { key: "Expense", tab: "Expense" },
  { key: "Income", tab: "Income" },
];

const contentList = {
  Expense: <TransactionForm key="expense-form" isExpense={true} />,
  Income: <TransactionForm key="income-form" isExpense={false} />,
};

const AddNewItem = () => {
  const [activeTab, setActiveTab] = useState("Expense");
  const onTabChange = (key) => {
    setActiveTab(key);
  };

  return (
    <Flex vertical className="card" style={{ flex: 1, height: "100%" }}>
      <Card
        title={
          <Typography.Text
            className="card-title"
            style={{ padding: "0" }}
            strong
          >
            Quick Transaction
          </Typography.Text>
        }
        style={{ width: "100%", height: "100%" }}
        tabList={tabList}
        activeTabKey={activeTab}
        onTabChange={onTabChange}
        tabProps={{ size: "large" }}
      >
        {contentList[activeTab]}
      </Card>
    </Flex>
  );
};

export default AddNewItem;
