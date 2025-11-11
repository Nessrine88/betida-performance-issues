import { cache } from "react";
import { client } from "../sanity";
import type { PromotionType } from "@/types/promotions-types";

/*  All-promotions  */
export const fetchAllPromotions = cache(async (): Promise<PromotionType[]> => {
  const query = `
      *[_type == "allPromotions" && category.slug == "all-promotions"] | order(endsAt asc) {
        _id,
        id,
        title,
        subtitle,
        type,
        priceQuote,
        category { name, slug },
        endsAt,
        thumbnail,
        slug,
        redirectUrl,
        redirectButtonTitle,
        redirectButtonUrl,
        details {
          description,
          howToEnter,
          selectedGames,
          prizesBreakdown[] { position, prize },
          leaderboard[] { position, user, result },
          leaderboardNote,
          terms
        }
      }
    `;
  const promotions: PromotionType[] = await client.fetch(query);
  return promotions;
});

/*  Casino promotions  */
export const fetchCasinoPromotions = cache(
  async (): Promise<PromotionType[]> => {
    const query = `
      *[_type == "casinoPromotion" && category.slug == "casino"] | order(endsAt asc) {
        _id,
        id,
        title,
        subtitle,
        type,
        priceQuote,
        category { name, slug },
        endsAt,
        thumbnail,
        slug,
        redirectUrl,
        redirectButtonTitle,
        redirectButtonUrl,
        details {
          description,
          howToEnter,
          selectedGames,
          prizesBreakdown[] { position, prize },
          leaderboard[] { position, user, result },
          leaderboardNote,
          terms
        }
      }
    `;
    const promotions: PromotionType[] = await client.fetch(query);
    return promotions;
  }
);

/*  Sports promotions  */
export const fetchSportsPromotions = cache(
  async (): Promise<PromotionType[]> => {
    const query = `
      *[_type == "sportsPromotion" && category.slug == "sports"] | order(endsAt asc) {
        _id,
        id,
        title,
        subtitle,
        type,
        priceQuote,
        category { name, slug },
        endsAt,
        thumbnail,
        slug,
        redirectUrl,
        redirectButtonTitle,
        redirectButtonUrl,
        details {
          description,
          howToEnter,
          selectedGames,
          prizesBreakdown[] { position, prize },
          leaderboard[] { position, user, result },
          leaderboardNote,
          terms
        }
      }
    `;
    const promotions: PromotionType[] = await client.fetch(query);
    return promotions;
  }
);

/*  Community promotions  */
export const fetchCommunityPromotions = cache(
  async (): Promise<PromotionType[]> => {
    const query = `
      *[_type == "communityPromotion" && category.slug == "community"] | order(endsAt asc) {
        _id,
        id,
        title,
        subtitle,
        type,
        priceQuote,
        category { name, slug },
        endsAt,
        thumbnail,
        slug,
        redirectUrl,
        redirectButtonTitle,
        redirectButtonUrl,
        details {
          description,
          howToEnter,
          selectedGames,
          prizesBreakdown[] { position, prize },
          leaderboard[] { position, user, result },
          leaderboardNote,
          terms
        }
      }
    `;
    const promotions: PromotionType[] = await client.fetch(query);
    return promotions;
  }
);

/*  Poker promotions  */
export const fetchPokerPromotions = cache(
  async (): Promise<PromotionType[]> => {
    const query = `
      *[_type == "pokerPromotion" && category.slug == "poker"] | order(endsAt asc) {
        _id,
        id,
        title,
        subtitle,
        type,
        priceQuote,
        category { name, slug },
        endsAt,
        thumbnail,
        slug,
        redirectUrl,
        redirectButtonTitle,
        redirectButtonUrl,
        details {
          description,
          howToEnter,
          selectedGames,
          prizesBreakdown[] { position, prize },
          leaderboard[] { position, user, result },
          leaderboardNote,
          terms
        }
      }
    `;
    const promotions: PromotionType[] = await client.fetch(query);
    return promotions;
  }
);

export const fetchPromotionBySlug = cache(
  async (slug: string): Promise<PromotionType | null> => {
    const query = `
      *[
        _type in [
          "allPromotions",
          "casinoPromotion",
          "sportsPromotion",
          "communityPromotion",
          "pokerPromotion"
        ] && slug.current == $slug
      ][0] {
        _id,
        id,
        title,
        subtitle,
        type,
        priceQuote,
        category { name, slug },
        endsAt,
        thumbnail,
        slug,
        redirectUrl,
        redirectButtonTitle,
        redirectButtonUrl,
        details
      }
    `;
    return client.fetch<PromotionType | null>(query, { slug });
  }
);

export const getAllPromotionSlugs = cache(async (): Promise<string[]> => {
  const query = `
    *[
      _type in [
        "allPromotions",
        "casinoPromotion",
        "sportsPromotion",
        "communityPromotion",
        "pokerPromotion"
      ] && defined(slug.current)
    ] { "slug": slug.current }
  `;
  const results: { slug: string }[] = await client.fetch(query);
  return results.map((r) => r.slug);
});
