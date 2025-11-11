import { unstable_cache } from "next/cache";
import { client } from "../sanity";

export const fetchHero = unstable_cache(
  async () => {
    return client.fetch(
      `*[_type=="hero"]{title, imageSrc, imagePublicId, players, url}`
    );
  },
  ["hero-data"],
  { revalidate: 3600 }
);

export const fetchProfileData = async () => {
  return client.fetch(` *[_type == "profile"][0]{
      username,
      vipProgress,
      level,
      nextLevel,
      showPopupItem
    }`);
};
