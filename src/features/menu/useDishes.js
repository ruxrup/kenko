import { useQuery } from "@tanstack/react-query";
import { getMenu } from "../../services/apiMenu";

function useDishes() {
  const { isLoading, data: dishes } = useQuery({
    queryKey: ["dishes"],
    queryFn: getMenu,
  });
  return { isLoading, dishes };
}

export default useDishes;
