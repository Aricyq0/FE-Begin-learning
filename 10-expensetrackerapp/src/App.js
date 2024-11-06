import React, { useState } from "react";
import { Flex, Layout, Button } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { useRoutes } from "react-router-dom";

import { SideBar, CustomHeader, CustomFooter } from "./components";
import routes from "./router";

import "normalize.css";
import "./App.css";

const { Sider, Header, Content, Footer } = Layout;

function App() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className="App">
      <Layout>
        <Sider
          theme="light"
          trigger={null}
          collapsible
          collapsed={collapsed}
          className="sider"
          width={256}
        >
          <SideBar />
        </Sider>
        <Layout>
          <Header className="header">
            <Flex
              align="center"
              justify="space-between"
              style={{
                width: "100%",
                paddingTop: "1rem",
                paddingBottom: "1rem",
              }}
            >
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                className="triger-btn"
              />
              <CustomHeader />
            </Flex>
          </Header>
          <Content className="content" style={{ width: "100%" }}>
            {useRoutes(routes)}
          </Content>
          <Footer
            className="footer"
            style={{ width: "100%", background: "#ffffff" }}
          >
            <CustomFooter />
          </Footer>
        </Layout>
      </Layout>
    </div>
  );
}

export default App;
