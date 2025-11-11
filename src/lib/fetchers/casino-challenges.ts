// lib/fetchers/casino-challenges.ts
import { client } from "../sanity";

export const fetchActiveCasinoChallenges = async () => {
  return client.fetch(
    '*[_type == "casinoChallenges" && category == "active"]{id, title, slug, provider, thumbnail, multiplier, minBet, betCurrency, prizeAmount, prizeCurrency, createdBy, createdByImage, category}'
  );
};

export const fetchAllClaimedCasinoChallenges = async () => {
  return client.fetch(
    '*[_type == "casinoChallenges" && category == "all-claimed"]{id, title, slug, provider, thumbnail, multiplier, minBet, betCurrency, prizeAmount, prizeCurrency, createdBy, createdByImage, category}'
  );
};

export const fetchMyClaimedCasinoChallenges = async () => {
  return client.fetch(
    '*[_type == "casinoChallenges" && category == "my-claimed"]{id, title, slug, provider, thumbnail, multiplier, minBet, betCurrency, prizeAmount, prizeCurrency, createdBy, createdByImage, category}'
  );
};

export const fetchAllCasinoChallenges = async () => {
  return client.fetch(
    '*[_type == "casinoChallenges"]{id, title, slug, provider, thumbnail, multiplier, minBet, betCurrency, prizeAmount, prizeCurrency, createdBy, createdByImage, category}'
  );
};
