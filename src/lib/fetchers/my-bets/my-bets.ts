import { client } from "@/lib/sanity";

export const fetchMyBetsData = async () => {
  return client.fetch(
    '*[_type == "myBetsData"]{..., "slug": slug.current, _type, type, gameTitle, betId, date, betAmount, multiplier, profitLoss, archiveDate, betCount}'
  );
};

export const fetchMyBetsByType = async (type: string) => {
  return client.fetch(
    `*[_type == "myBetsData" && type == $type]{..., slug: slug.current, _type, type, gameTitle, betId, date, betAmount, multiplier, profitLoss, archiveDate, betCount}`,
    { type }
  );
};
