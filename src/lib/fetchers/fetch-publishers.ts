import { client } from "../sanity";

export type Publisher = {
  _id: string;
  img: string;
  name: string;
  players: number;
};

export const fetchPublishers = async (): Promise<Publisher[]> => {
  return client.fetch(`
    *[_type == "publisher"]{
      _id,
      img,
      name,
      players
    }
  `);
};
