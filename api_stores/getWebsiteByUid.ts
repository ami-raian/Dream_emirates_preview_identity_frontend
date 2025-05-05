import { fetchGet } from "@/lib/customFetch";
import { useQuery } from "@tanstack/react-query";

export const useGetWebsiteByUid = (uId: string | null) => {
  return useQuery<any>({
    queryKey: ["getWebsiteByUid", uId],
    queryFn: () => fetchGet(`websites/${uId}`, true),
    retry: false,
    enabled: !!uId,
  });
};
