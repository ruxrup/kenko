import styled from "styled-components";
import Stats from "./Stats";
import useRecentOrders from "./useRecentOrders";
import Spinner from "../../ui/Spinner";
import SalesChart from "./SalesChart";
import { useSearchParams } from "react-router-dom";
import DurationChart from "./DurationChart";
import TodayActivity from "../order-updates/TodayActivity";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const { orders, isLoading } = useRecentOrders();
  let ordersNew = [];
  if (!isLoading) ordersNew = orders.map((entry) => entry);

  const [searchParams] = useSearchParams();
  const numDays = !searchParams.get("last")
    ? 7
    : Number(searchParams.get("last"));

  if (isLoading) return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Stats orders={orders} />
      <TodayActivity />
      <DurationChart orders={ordersNew} />
      <SalesChart orders={orders} numdays={numDays} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
