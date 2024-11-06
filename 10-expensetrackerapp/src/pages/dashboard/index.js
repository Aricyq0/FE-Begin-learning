import { Flex } from "antd";
import React from "react";
import {
  AddNewItem,
  MonthlyTracker,
  ReviewCardGroup,
  LatestDetails,
  DistributionMap,
} from "./components";

const Dashboard = () => {
  return (
    <>
      <Flex vertical justify="flex-start" gap={"large"}>
        <Flex
          justify="center"
          align="flex-start"
          gap={"large"}
          style={{ height: 750 }}
        >
          <Flex
            vertical
            justify="flex-start"
            style={{ height: "100%", flex: 3 }}
            gap={"large"}
          >
            <ReviewCardGroup />
            <MonthlyTracker />
          </Flex>
          <DistributionMap />
        </Flex>
        <Flex
          justify="center"
          align="flex-start"
          gap={"large"}
          style={{ height: 400 }}
        >
          <LatestDetails />
          <AddNewItem />
        </Flex>
      </Flex>
    </>
  );
};

export default Dashboard;
