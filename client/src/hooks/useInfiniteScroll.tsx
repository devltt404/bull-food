import throttle from "@/utils/throttle";
import { useEffect } from "react";

interface UseInfiniteScrollParams {
  fetchFn: () => void;
  isFetching: boolean;
  hasMore: boolean;
  /**
   * The pixel value from the bottom of the page to trigger the fetchFn
   */
  triggerPoint: number;
}

export const useInfiniteScroll = ({
  fetchFn,
  isFetching,
  hasMore,
  triggerPoint,
}: UseInfiniteScrollParams) => {
  const handleScroll = throttle(() => {
    if (
      document.body.scrollHeight - triggerPoint <
      window.scrollY + window.innerHeight
    ) {
      if (hasMore && !isFetching) {
        fetchFn();
      }
    }
  }, 500);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);
};
