import { fetchGet } from "@/lib/customFetch";
import { useQuery } from "@tanstack/react-query";

// export const useGetBusinessById = (businessId: string | null) => {
//   return useQuery<any>({
//     queryKey: ["getBusinessById", businessId],
//     queryFn: () => fetchGet(`business-svc/business/${businessId}`),
//     enabled: !!businessId,
//   });
// };

export const useGetPublicBusinessById = (businessId: string | null) => {
  return useQuery<any>({
    queryKey: ["getBusinessById", businessId],
    queryFn: () => fetchGet(`business-svc/business/public/${businessId}`),
    retry: false,
    enabled: !!businessId,
  });
};
