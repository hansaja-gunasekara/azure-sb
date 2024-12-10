import { useQuery } from "@tanstack/react-query";
import { APIClient } from "../services/api-client";

const apiClient = new APIClient("/bookings");

const useBooking = (id) =>
  useQuery({
    queryKey: ["bookings", id],
    queryFn: () => apiClient.getOne(id),
  });

export default useBooking;
