import { spWebContext } from "api/SPWebContext";
import { useQuery } from "@tanstack/react-query";

export interface OSF {
  Title: string;
  email: string;
}

export const useOSFs = () => {
  return useQuery({
    queryKey: ["OSFs"],
    queryFn: () => spWebContext.web.lists.getByTitle("OSFs").items<OSF[]>(),
    staleTime: Infinity, // Prevent refetch
    cacheTime: Infinity, // Prevent garbage collection
  });
};
