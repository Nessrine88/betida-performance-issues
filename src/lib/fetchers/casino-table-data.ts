import { client } from "../sanity";
import type { BetData } from "@/types/bets-table-types";

export const fetchCasinoTableData = async () => {
  return client.fetch(`*[_type=="casino"]{
    game, user, time, betAmount, multiplier, payout, type
  }`);
};

export const fetchMyBets = async (): Promise<BetData[]> => {
  return client.fetch(`*[_type == "myBet"]{
    _id,
    game,
    user,
    time,
    betAmount,
    multiplier,
    payout,
    type
  }`);
};

export const fetchAllBets = async (): Promise<BetData[]> => {
  return client.fetch(`*[_type == "allBet"]{
    _id,
    game,
    user,
    time,
    betAmount,
    multiplier,
    payout,
    type
  }`);
};

export const fetchHighRollers = async (): Promise<BetData[]> => {
  return client.fetch(`*[_type == "highRoller"]{
    _id,
    game,
    user,
    time,
    betAmount,
    multiplier,
    payout,
    type
  }`);
};
