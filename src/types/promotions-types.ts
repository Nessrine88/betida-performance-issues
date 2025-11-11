export interface PromotionCard {
  id: number;
  title: string;
  subtitle: string;
  priceQuote: string;
  category: { name: string; slug: string };
  endsAt: string;
  thumbnail: string;
  slug: string;
  redirectUrl: string;
  details: {
    description: string;
    howToEnter: string;
    selectedGames?: string;
    prizesBreakdown: {
      position: string;
      prize: string;
    }[];
    leaderboard: {
      position: string;
      user: string;
      result: string;
    }[];
    leaderboardNote: string;
    terms: string;
  };
}

export type PromotionType = {
  _id: string;
  id: number;
  title: Array<{ _key: string; value: string }>;
  subtitle?: Array<{ _key: string; value: string }>;
  type: string;
  priceQuote?: string;
  category: {
    name: Array<{ _key: string; value: string }>;
    slug: string;
  };
  endsAt: string;
  thumbnail: string;
  slug: any;
  redirectUrl?: string;
  redirectButtonTitle?: Array<{ _key: string; value: string }>;
  redirectButtonUrl?: string;
  details: {
    description: Array<{ language: string; text: string }>;
    howToEnter: Array<{ language: string; blocks: any[] }>;
    selectedGames: Array<{ language: string; blocks: any[] }>;
    prizesBreakdown: Array<{
      position: string;
      prize: Array<{ _key: string; value: string }>;
    }>;
    leaderboard: Array<{
      position: string;
      user: string;
      result: string;
    }>;
    leaderboardNote: Array<{ language: string; blocks: any[] }>;
    terms: Array<{ language: string; blocks: any[] }>;
  };
};
