import { fetchGet } from "@/lib/customFetch";
import { useQuery } from "@tanstack/react-query";

export const useGetWebsiteByDomain = (domainName: string | null) => {
  return useQuery<any>({
    queryKey: ["useGetWebsiteByDomain", domainName],
    queryFn: () =>
      fetchGet(
        `websites?filter=[[["domain.name","eq","${domainName}"]]]`,
        true
      ),
    retry: false,
    enabled: !!domainName,
  });
};
