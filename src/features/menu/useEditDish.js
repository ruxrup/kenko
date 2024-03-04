import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createEditDish } from "../../services/apiMenu";

function useEditDish() {
  const queryClient = useQueryClient();

  const { mutate: editDish, isLoading: isEditing } = useMutation({
    mutationFn: createEditDish,
    onSuccess: () => {
      toast.success("Dish successfully updated");
      queryClient.invalidateQueries({ queryKey: ["dishes"] });
    },
    onError: (err) => toast.error(err.message),
  });
  return { editDish, isEditing };
}

export default useEditDish;
