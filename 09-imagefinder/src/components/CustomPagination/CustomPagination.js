import { Pagination } from "antd";
import React from "react";

const CustomPagination = ({
  size,
  totalSize,
  currentPage,
  setCurrentPage,
  setLoading,
}) => {
  const handlePageChange = (page) => {
    setCurrentPage(page);
    setLoading(true);
  };
  return (
    <Pagination
      className="custom-pagination"
      align="center"
      defaultCurrent={1}
      current={currentPage}
      total={totalSize}
      pageSize={size}
      onChange={(page) => {
        handlePageChange(page);
      }}
      hideOnSinglePage={true}
    />
  );
};

export default CustomPagination;
