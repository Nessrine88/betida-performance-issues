import { client } from "../sanity";

export const fetchSportsTableData = async () => {
  return client.fetch(`*[_type=="sports"]{
    game, user, time, betAmount, multiplier, payout
  }`);
};
