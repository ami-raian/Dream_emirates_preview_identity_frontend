import { fetchGet } from "@/lib/customFetch";
import { useQuery } from "@tanstack/react-query";

export const commonImageFunction = (imagePath: string | null | undefined) => {
  return useQuery({
    queryKey: ["imagePath", imagePath],
    queryFn: () =>
      fetchGet(`media-svc/image/public/get-presigned-url/${imagePath}`),
    enabled: !!imagePath,
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 10,
  });
};
