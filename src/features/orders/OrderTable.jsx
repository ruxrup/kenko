import OrderRow from "./OrderRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";
import useOrders from "./useOrders";
import Spinner from "../../ui/Spinner";
import Pagination from "../../ui/Pagination";

function OrderTable() {
  const { orders, isLoading, count } = useOrders();
  if (isLoading) return <Spinner />;

  if (!orders.length) return <Empty resource={"orders"} />;

  return (
    <Menus>
      <Table columns="1.5fr 1.2fr 1.2fr 1fr 1fr 1fr 2rem">
        <Table.Header>
          <div>User</div>
          <div>Date/Time</div>
          <div>Address/Phone</div>
          <div>Amount</div>
          <div>Priority</div>
          <div>Status</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={orders}
          render={(order) => <OrderRow key={order.id} order={order} />}
        />

        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default OrderTable;
