// lib/fetchers/pokerTags.ts
import { client } from "../sanity";

export const fetchPokerTags = async () => {
  return client.fetch(`*[_type == "pokerTags"][0]{
    tags
  }`);
};