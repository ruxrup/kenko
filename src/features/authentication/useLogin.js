import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user.user);
      toast.success("Successfully Logged in");
      navigate("/dashboard", { replace: true });
    },
    onError: (err) => {
      console.log("ERROR:", err);
      toast.error("The provided email or password is incorrect.");
    },
  });
  return { login, isLoading };
}
