import Button from "../../ui/Button";
import useDelivered from "./useDelivered";

function DeliverButton({ orderId }) {
  const { delivered, isDelivering } = useDelivered();
  return (
    <Button
      variation="primary"
      size="small"
      onClick={() => delivered(orderId)}
      disabled={isDelivering}
    >
      Delivered?
    </Button>
  );
}

export default DeliverButton;
