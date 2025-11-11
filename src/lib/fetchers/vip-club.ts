import type {
  Faq,
  InternationalizedString,
  VipClubData,
} from "@/types/vipClub";
import { client } from "../sanity";

export const fetchVipClub = async (): Promise<VipClubData | null> => {
  const query = `
    *[_type == "vipClub"][0] {
      _id,
      stakeVipRankingLevel {
        title,
        levels[] {
          _key,
          icon,
          price,
          progress,
          items[] {
            _key,
            value
          }
        }
      },
      stakeVipRankingLevel2 {
        title,
        advantages[] {
          _key,
          id,
          iconPublicId,
          title,
          details
        }
      },
      type {
        tabs[] {
          _key,
          slug,
          title,
          faqs[] {
            _key,
            title,
            content
          }
        }
      },
      modalData {
  overview[] {
    _key,
    title,
    locked,
    items[] {
      _key,
      tier,
      icon,
      perks[] {
        value
      }
    }
  },
  reward[] {
    _key,
    title,
    description,
    locked,
    items[] {
      _key,
      tier,
      icon,
      perks[] {
        value
      }
    }
  }
}
    }
  `;

  try {
    const data = await client.fetch<VipClubData>(query);
    return data || null;
  } catch (error) {
    console.error("Error fetching VIP Club data:", error);
    return null;
  }
};

export const fetchVipClubFaqsBySlug = async (
  slug: string
): Promise<{
  title: InternationalizedString;
  faqs: Faq[];
} | null> => {
  const query = `
    *[_type == "vipClub"][0] {
      "tab": type.tabs[slug.current == $slug][0] {
        title,
        faqs[] {
          title,
          content
        }
      }
    }.tab
  `;

  try {
    return await client.fetch(query, { slug });
  } catch (error) {
    console.error("Error fetching VIP Club FAQs by slug:", error);
    return null;
  }
};
