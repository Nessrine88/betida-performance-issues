import type { PortableTextBlock } from "@portabletext/types";
import { client } from "../sanity";

export type TSliderItem = {
  videoUrl?: string;
  image?: string;
  alt?: string;
};

export type TStakeDrakeData = {
  _id: string;
  title: string;
  videoSlider: TSliderItem[];
  journeySection: {
    title: string;
  };
  giveawaysSection: {
    title: string;
    description: PortableTextBlock[];
    image: string;
  };
  historySection: {
    title: string;
    description: PortableTextBlock[];
    image: string;
  };
};

export const fetchStakeDrake = async (): Promise<TStakeDrakeData | null> => {
  if (!client) {throw new Error("Sanity client not configured")};
  const query = `
    *[_type == "stakeDrake"][0]{
      _id,
      title,
      videoSlider[] {
        videoUrl,
        image,
        alt
      },
      journeySection {
        title
      },
      giveawaysSection {
        title,
        description,
        image
      },
      historySection {
        title,
        description,
        image
      }
    }
  `;
  return await client.fetch<TStakeDrakeData>(query);
};