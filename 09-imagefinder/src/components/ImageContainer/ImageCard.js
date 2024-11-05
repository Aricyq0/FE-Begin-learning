import { Avatar, Card, Button } from "antd";
import { DownloadOutlined, HeartFilled } from "@ant-design/icons";
import styled from "styled-components";
import "./imageCard.css";

const imgStyle = {
  display: "block",
  width: "100%",
  height: "360px",
  objectFit: "cover",
};
const { Meta } = Card;

const LikesButton = styled(Button)`
  position: absolute;
  bottom: 86px;
  right: 14px;
  background: rgba(var(--grad8-rgb), 0.4);
  border: none;
  color: white;
  border-radius: 50%;
  font-size: 10px;
`;

const HeartFilledWhite = styled(HeartFilled)`
  color: white;
`;

/* 实现图片下载，不触发链接跳转*/
const handleDownloadClick = async (imageUrl) => {
  // 使用 fetch 获取图片文件
  const response = await fetch(imageUrl);
  // 将响应转换为 Blob 对象，即将跨域URL转换为本地资源存储，解决跨域a标签无法下载问题
  console.log(response);

  const blob = await response.blob();
  // console.log(blob);

  const url = window.URL.createObjectURL(blob); // 创建临时的 Blob URL

  // 创建 <a> 元素进行下载
  const link = document.createElement("a");
  link.href = url;
  link.download = "image.jpg"; // 设置下载文件名
  document.body.appendChild(link); // 将 <a> 标签添加到 DOM 中
  link.click(); // 模拟点击，触发下载
  document.body.removeChild(link); // 删除 <a> 标签

  // 释放 Blob URL
  window.URL.revokeObjectURL(url);
};

const ImageCard = ({ item }) => {
  const avatarURL = item.userImageURL ? item.userImageURL : `./momo.jpg`;
  console.log(avatarURL);

  return (
    <Card
      hoverable
      style={{ width: "100%", overflow: "hidden" }}
      cover={
        <a href={item.largeImageURL} target="_blank" rel="noopener noreferrer">
          <img src={item.largeImageURL} style={imgStyle} />
          <LikesButton size="small" icon={<HeartFilledWhite />}>
            {item.likes}
          </LikesButton>
        </a>
      }
    >
      <Meta
        avatar={<Avatar src={avatarURL} />}
        title={item.user}
        description={
          <Button
            icon={<DownloadOutlined />}
            onClick={() => handleDownloadClick(item.largeImageURL)}
          ></Button>
        }
        className="card-meta"
      />
    </Card>
  );
};

export default ImageCard;
