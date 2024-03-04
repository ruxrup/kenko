import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteDish as deleteDishApi } from "../../services/apiMenu";
import toast from "react-hot-toast";

function useDeleteDish() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteDish } = useMutation({
    mutationFn: deleteDishApi,
    onSuccess: () => {
      toast.success("Dish successfully deleted.");
      queryClient.invalidateQueries({ queryKey: ["dishes"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { isDeleting, deleteDish };
}

export default useDeleteDish;
