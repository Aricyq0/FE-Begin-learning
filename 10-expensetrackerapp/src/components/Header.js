import {
  MessageOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Flex, Avatar } from "antd";
import Search from "antd/es/transfer/search";
import { blue } from "@ant-design/colors";

const CustomHeader = () => {
  return (
    <>
      <Flex align="center" gap={"3rem"}>
        <Search placeholder="Search" allowClear />
        <Flex align="center" gap="10px">
          <MessageOutlined className="header-icon" />
          <NotificationOutlined className="header-icon" />
          <Avatar
            icon={<UserOutlined />}
            style={{ backgroundColor: blue.primary }}
          />
        </Flex>
      </Flex>
    </>
  );
};
export default CustomHeader;
