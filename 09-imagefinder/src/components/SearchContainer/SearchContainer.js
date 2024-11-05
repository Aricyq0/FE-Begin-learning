import { Input, Select, Flex, InputNumber, ConfigProvider } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import "./SearchContainer.css";
import "hover.css";
const { Search } = Input;

const { Option } = Select;

const SearchContainer = ({
  onSearch,
  setType,
  defaultType,
  onChange,
  defaultSize,
  isImageDisplay,
}) => {
  const TypeSelector = (
    <Select
      defaultValue={defaultType}
      className="select-type"
      onSelect={(value) => {
        setType(value);
      }}
      style={{ width: "100px", height: "40px" }}
    >
      <Option value="all">All Image</Option>
      <Option value="photo">Photo</Option>
      <Option value="illustration">Illustration</Option>
      <Option value="vector">Vector</Option>
    </Select>
  );

  const SizeInput = (
    <InputNumber
      size="large"
      className="size-input"
      defaultValue={defaultSize}
      style={{
        width: "6%",
        minWidth: "50px",
        maxWidth: "100px",
        height: "40px",
      }}
      min={3}
      max={100}
      onChange={onChange}
    />
  );

  const searchInput = (
    <Search
      size="large"
      placeholder="input search text"
      enterButton={<SearchOutlined style={{ color: "#666" }} />}
      onSearch={onSearch}
      className="search-input "
      style={{ width: "50%", maxWidth: "600px", minWidth: "400px" }}
      prefix
    />
  );

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#fff",
          borderRadius: 6,
        },
      }}
    >
      <div className="search-container-bg"></div>
      <Flex
        justify="center"
        align="center"
        className="search-container"
        gap={"middle"}
      >
        {searchInput}
        {TypeSelector}
        {SizeInput}
      </Flex>
    </ConfigProvider>
  );
};

export default SearchContainer;
