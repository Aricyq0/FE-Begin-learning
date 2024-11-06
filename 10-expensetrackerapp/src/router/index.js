import React from "react";
import { Navigate } from "react-router-dom";

const DashBoard = React.lazy(() => import("../pages/dashboard"));
const TransactionDetails = React.lazy(() =>
  import("../pages/TransactionDetails")
);

const routes = [
  {
    path: "/",
    element: <DashBoard />,
  },
  {
    path: "/transactions",
    element: <TransactionDetails />,
  },
  { path: "*", element: <Navigate to="/" /> },
];

export default routes;
