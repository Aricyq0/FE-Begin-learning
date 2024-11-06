import React, { useState } from "react";
import {
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Table,
  Typography,
  Tag,
  Card,
  Space,
} from "antd";
import { useDetails, useDetailsDispatch, useTag } from "../context";

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  children,
  ...restProps
}) => {
  const inputNode =
    inputType === "number" ? (
      <InputNumber />
    ) : inputType === "date" ? (
      <Input type="date" />
    ) : (
      <Input />
    );

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[{ required: true, message: `Please Input ${title}!` }]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const TransactionDetails = () => {
  const Data = useDetails();
  const tags = useTag();
  const dispatch = useDetailsDispatch();
  const [form] = Form.useForm();

  const [activeTab, setActiveTab] = useState("Expense");
  const [editingId, setEditingId] = useState("");
  const isEditing = (record) => record.id === editingId;

  const onTabChange = (key) => {
    setActiveTab(key);
  };

  const Tabdata = {
    Expense: Data.filter((item) => item.isExpense),
    Income: Data.filter((item) => !item.isExpense),
  };

  const edit = (record) => {
    form.setFieldsValue({
      amount: record.amount,
      date: record.date,
      ...record,
    });

    setEditingId(record.id);
  };

  const cancel = () => {
    setEditingId("");
  };

  const save = async (id) => {
    try {
      const row = await form.validateFields();

      dispatch({
        type: Data.some((item) => item.id === id) ? "UPDATE_ITEM" : "ADD_ITEM",
        id,
        ...row,
      });
      setEditingId("");
    } catch (errInfo) {
      console.error("Validate Failed:", errInfo);
    }
  };

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      width: "25%",
      editable: true,
      sorter: (a, b) => new Date(a.date) - new Date(b.date),
    },
    {
      title: "Category",
      dataIndex: "category",
      width: "25%",
      editable: false,
      render: (tag) => {
        const tagData = tags.find((item) => item.name === tag);
        return tagData ? <Tag color={tagData.color}>{tag}</Tag> : null;
      },
      filters: [...new Set(Data.map((item) => item.category))].map(
        (category) => ({ text: category, value: category })
      ),
      onFilter: (value, record) => record.category === value,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      width: "25%",
      editable: true,
      sorter: (a, b) => parseFloat(a.amount) - parseFloat(b.amount),
    },
    {
      title: "Operation",
      dataIndex: "operation",
      editable: false,
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <Space>
            <Typography.Link onClick={() => save(record.id)}>
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </Space>
        ) : (
          <Space>
            <Typography.Link
              disabled={editingId !== ""}
              onClick={() => edit(record)}
            >
              Edit
            </Typography.Link>

            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => dispatch({ type: "DELETE_ITEM", id: record.id })}
            >
              <Typography.Link>delete</Typography.Link>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType:
          col.dataIndex === "amount"
            ? "number"
            : col.dataIndex === "date"
            ? "date"
            : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <>
      <Card
        style={{ width: "100%" }}
        tabList={[
          { key: "Expense", label: "Expense" },
          { key: "Income", label: "Income" },
        ]}
        onTabChange={onTabChange}
        activeTabKey={activeTab}
      >
        <Form
          key={activeTab}
          component={false}
          form={form}
          vertical
          justify="center"
          align="space-between"
          style={{ width: "100%" }}
        >
          <Table
            components={{ body: { cell: EditableCell } }}
            bordered
            dataSource={Tabdata[activeTab]}
            columns={mergedColumns}
            rowClassName="editable-row"
            pagination={{ onChange: cancel }}
          />
        </Form>
      </Card>
    </>
  );
};

export default TransactionDetails;
