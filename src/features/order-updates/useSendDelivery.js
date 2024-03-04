import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateOrder } from "../../services/apiOrders";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function useSendDelivery() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: send, isLoading: isSending } = useMutation({
    mutationFn: (orderId) =>
      updateOrder(orderId, {
        status: "out-for-delivery",
        isPaid: "true",
      }),
    onSuccess: (data) => {
      toast.success(`Order #${data.id} successfully sent.`);
      queryClient.invalidateQueries({ active: true });
      navigate("/");
    },
    onError: () => toast.error("An error occurred"),
  });
  return { send, isSending };
}

export default useSendDelivery;
