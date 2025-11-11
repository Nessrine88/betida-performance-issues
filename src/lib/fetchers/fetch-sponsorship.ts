import { client } from "../sanity";

export type SponsorshipData = {
  _id: string;
  title: any; // internationalizedArrayString
  slug: { current: string };
  subtitle: any; // internationalizedArrayString
  logo: string;
  section1: {
    thumbnail: string;
    text: Array<{
      language: string;
      blocks: any[];
    }>;
  };
  section2: {
    thumbnail: string;
    text: Array<{
      language: string;
      blocks: any[];
    }>;
  };
  footerTitle: any; // internationalizedArrayString
  redirectUrl: string;
  buttonText: any; // internationalizedArrayString
  youtubeEmbed: string;
};

export const fetchSponsorshipBySlug = async (
  slug: string
): Promise<SponsorshipData | null> => {
  if (!client) {
    throw new Error("Sanity client not configured");
  }

  const query = `
    *[_type == "sponsorship" && slug.current == $slug][0]{
      _id,
      title,
      slug,
      subtitle,
      logo,
      section1 {
        thumbnail,
        text[] {
          language,
          blocks
        }
      },
      section2 {
        thumbnail,
        text[] {
          language,
          blocks
        }
      },
      footerTitle,
      redirectUrl,
      buttonText,
      youtubeEmbed
    }
  `;

  const result = await client.fetch<SponsorshipData | null>(query, { slug });

  return result;
};
