import { client } from "../sanity";

export const fetchRaceLeaderboardTableData = async () => {
  return client.fetch(`*[_type=="raceLeaderboard"]{
    game, user, time, betAmount, multiplier, payout
  }`);
};
