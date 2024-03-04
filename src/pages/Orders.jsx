import OrderTable from "../features/orders/OrderTable";
import OrderTableOperations from "../features/orders/OrderTableOperations";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Orders() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All orders</Heading>
        <OrderTableOperations />
      </Row>

      <OrderTable />
    </>
  );
}

export default Orders;
