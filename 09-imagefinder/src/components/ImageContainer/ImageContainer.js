import { Col, Row } from "antd";
import ImageCard from "./ImageCard";

const ImageContainer = ({ data }) => {
  return (
    <Row
      className="image-container"
      gutter={[
        { xs: 16, sm: 16, md: 24, lg: 24, xl: 32, xxl: 64 },
        { xs: 16, sm: 16, md: 24, lg: 24, xl: 32, xxl: 32 },
      ]}
      justify="start"
      wrap={true}
    >
      {data.map((item, index) => (
        <Col
          className="gutter-row image-card"
          key={index}
          xs={24}
          sm={24}
          md={8}
          lg={8}
          xl={8}
          xxl={6}
        >
          <ImageCard item={item} />
        </Col>
      ))}
    </Row>
  );
};

export default ImageContainer;
