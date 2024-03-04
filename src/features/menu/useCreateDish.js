import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditDish } from "../../services/apiMenu";
import toast from "react-hot-toast";

function useCreateDish() {
  const queryClient = useQueryClient();

  const { mutate: createDish, isLoading: isCreating } = useMutation({
    mutationFn: createEditDish,
    onSuccess: () => {
      toast.success("New Dish Successfully created.");
      queryClient.invalidateQueries({ queryKey: ["dishes"] });
    },
    onError: (err) => toast.error(err.message),
  });
  return { createDish, isCreating };
}

export default useCreateDish;
