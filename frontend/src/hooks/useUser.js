import { useQuery } from "@tanstack/react-query";
import { APIClient } from "../services/api-client";

const apiClient = new APIClient("/user");

const useUser = (id) =>
  useQuery({
    queryKey: ["user", id],
    queryFn: () => apiClient.getOne(id),
  });

export default useUser;
