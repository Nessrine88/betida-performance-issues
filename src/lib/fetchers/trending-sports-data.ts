import { unstable_cache } from "next/cache";
import { client } from "../sanity";

export const fetchTrendingSports = unstable_cache(
  async () => {
    return client.fetch(
      `*[_type=="trendingSport"]{id, src, alt,"blurDataURL": src + "?w_10,h_10,c_fill,f_auto,q_10"}`
    );
  },
  ["hero-data"],
  { revalidate: 60 }
);
