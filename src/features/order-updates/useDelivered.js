import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateOrder } from "../../services/apiOrders";
import toast from "react-hot-toast";

function useDelivered() {
  const queryClient = useQueryClient();
  const { mutate: delivered, isLoading: isDelivering } = useMutation({
    mutationFn: (orderId) =>
      updateOrder(orderId, {
        status: "delivered",
        isPaid: "true",
      }),
    onSuccess: (data) => {
      toast.success(`Order #${data.id} successfully delivered.`);
      queryClient.invalidateQueries({ active: true });
    },
    onError: () => toast.error("An error occurred"),
  });
  return { delivered, isDelivering };
}

export default useDelivered;
