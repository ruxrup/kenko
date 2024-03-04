import { useQuery } from "@tanstack/react-query";
import { getOrder } from "../../services/apiOrders";
import { useParams } from "react-router-dom";

function useOrder() {
  const { orderId } = useParams();
  const { isLoading, data: order } = useQuery({
    queryKey: ["order", orderId],
    queryFn: () => getOrder(orderId),
    retry: false,
  });
  return { isLoading, order };
}

export default useOrder;
