import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteOrder as deleteOrderApi } from "../../services/apiOrders";
import { useNavigate } from "react-router-dom";

function useDeleteOrder() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { isLoading: isDeleting, mutate: deleteOrder } = useMutation({
    mutationFn: deleteOrderApi,
    onSuccess: () => {
      toast.success("Order successfully deleted.");
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      navigate(`/orders`);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { isDeleting, deleteOrder };
}

export default useDeleteOrder;
