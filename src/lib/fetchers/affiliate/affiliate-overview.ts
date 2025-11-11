import { client } from "@/lib/sanity";

export type InternationalizedString = {
  _key: string;
  value: string;
};

export type Stat = {
  value: string;
  label: InternationalizedString[];
};

export type StepData = {
  id: number;
  step: InternationalizedString[];
  title: InternationalizedString[];
  video: string;
  icon: string;
};

export type AdvantageData = {
  id: number;
  title: InternationalizedString[];
  details: InternationalizedString[];
  icon: string;
};

export type CommissionItem = {
  id: number;
  title: InternationalizedString[];
  details: InternationalizedString[];
  rate: InternationalizedString[];
};

export type TemplateData = {
  image: string;
  title: InternationalizedString[];
  description: InternationalizedString[];
  browseTemplateLink: string;
};

export type AffiliateOverviewData = {
  _id: string;
  _type: "affiliateOverview";
  referAndEarn: {
    title: InternationalizedString[];
    description: InternationalizedString[];
    stats: Stat[];
    image: string;
  };
  partneringWithUs: {
    title: InternationalizedString[];
    steps: StepData[];
  };
  exclusiveAdvantages: {
    title: InternationalizedString[];
    Advantages: AdvantageData[];
  };
  commissionRules: {
    title: InternationalizedString[];
    description: InternationalizedString[];
    rules: CommissionItem[];
  };
  templates: TemplateData;
};

export const fetchAffiliateOverview =
  async (): Promise<AffiliateOverviewData | null> => {
    const query = `
    *[_type == "affiliateOverview"][0] {
      _id,
      _type,
      referAndEarn,
      partneringWithUs,
      exclusiveAdvantages,
      commissionRules,
      templates
    }
  `;

    try {
      const result = await client.fetch(query);
      return result || null;
    } catch (error) {
      console.error("Error fetching affiliate overview data:", error);
      return null;
    }
  };
