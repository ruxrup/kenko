import { formatCurrency } from "../../utils/helpers";
import Stat from "./Stat";
import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineChartBar,
  HiOutlineStar,
} from "react-icons/hi2";

function Stats({ orders }) {
  const numOrders = orders.length;

  const sales = orders.reduce(
    (acc, cur) => acc + cur.price + cur.extraPrice,
    0
  );
  const numPriorityOrders = orders.filter((order) => order.isPriority).length;
  const mostSoldDish = orders
    .sort(
      (a, b) =>
        orders.filter((v) => v.dishCode === a.dishCode).length -
        orders.filter((v) => v.dishCode === b.dishCode).length
    )
    .pop();
  return (
    <>
      <Stat
        title="Orders"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numOrders}
      />
      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      />
      <Stat
        title="Priority Orders"
        color="red"
        icon={<HiOutlineStar />}
        value={numPriorityOrders}
      />
      <Stat
        title="#1 Dish (Most sales)"
        color="indigo"
        icon={<HiOutlineChartBar />}
        value={mostSoldDish?.dishes?.name || "N/A"}
      />
    </>
  );
}

export default Stats;
