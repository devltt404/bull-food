import throttle from "@/utils/throttle";
import { useEffect } from "react";

export const useInfiniteScroll = (
  fetchMore: () => void,
  isFetching: boolean,
  hasMore: boolean,
  triggerPoint: number, // The pixel value from the bottom of the page to trigger the fetchMore
) => {
  const handleScroll = throttle(() => {
    if (
      document.body.scrollHeight - triggerPoint <
      window.scrollY + window.innerHeight
    ) {
      if (hasMore && !isFetching) {
        fetchMore();
      }
    }
  }, 500);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);
};
