import { client } from "../sanity";

export const fetchSlots = async () => {
  return client.fetch(
    `*[_type=="slots"]{id, src, alt, players}`
  );
};