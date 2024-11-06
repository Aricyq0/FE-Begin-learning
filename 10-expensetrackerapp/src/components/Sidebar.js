import React from "react";
import { Flex, Menu } from "antd";
import { Link, useLocation } from "react-router-dom"; // 导入 Link 组件
import { UserOutlined } from "@ant-design/icons";
import { FaWallet } from "react-icons/fa";
import { AiOutlineTransaction } from "react-icons/ai";

const SideBar = () => {
  const location = useLocation();
  const currentKey = location.pathname === "/" ? "1" : "2";
  return (
    <>
      <Flex align="center" justify="center">
        <div className="logo">
          <FaWallet color="#1890ff" />
        </div>
      </Flex>
      <Menu
        mode="inline"
        selectedKeys={[currentKey]}
        style={{ height: "100%" }}
        className="menu-bar"
        items={[
          {
            key: "1",
            icon: <UserOutlined />,
            label: <Link to="/">Dashboard</Link>,
          },
          {
            key: "2",
            icon: <AiOutlineTransaction />,
            label: <Link to="/transactions">All Transactions</Link>,
          },
        ]}
      />
    </>
  );
};

export default SideBar;
