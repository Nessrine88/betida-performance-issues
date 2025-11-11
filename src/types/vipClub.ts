export type InternationalizedStringValue = {
  _key: string;
  _type: string;
  value: string;
};

export type InternationalizedString = InternationalizedStringValue[];

export type InternationalizedText = InternationalizedStringValue[];

export type VipLevelItem = {
  _key?: string;
  value: InternationalizedString;
};

export type VipLevel = {
  _key?: string;
  icon: string;
  price: number;
  progress: string;
  items: VipLevelItem[];
};

export type VipRankingLevel1 = {
  title: InternationalizedString;
  levels: VipLevel[];
};

export type Advantage = {
  _key?: string;
  id: number;
  icon: string;
  title: InternationalizedString;
  details: InternationalizedString;
};

export type VipRankingLevel2 = {
  title: InternationalizedString;
  advantages: Advantage[];
};

export type Faq = {
  _key?: string;
  title: InternationalizedString;
  content: InternationalizedText;
};

export type Tab = {
  _key?: string;
  slug: { current: string };
  title: InternationalizedString;
  faqs: Faq[];
};

export type TypeSection = {
  tabs: Tab[];
};

export type VipClubData = {
  _id: string;
  stakeVipRankingLevel: VipRankingLevel1;
  stakeVipRankingLevel2: VipRankingLevel2;
  type: TypeSection;
  modalData?: ModalData;
};

export interface FaqItem {
  title: string;
  content: string;
}

export interface TabData {
  slug: { current: string };
  title: string;
  faqs: FaqItem[];
}

export interface TypeSectionProps {
  data: TypeSection;
}

export interface AdvantageData {
  id: number;
  icon: string;
  title: string;
  details: string;
}

export interface ExclusiveAdvantagesData {
  title: string;
  advantages: AdvantageData[];
}

export type VipLevelDisplay = {
  progress?: string;
  icon: string;
  price?: string;
  items: string[];
};

export type ModalItem = {
  _key?: string;
  tier: InternationalizedString;
  icon: string;
  perks: any[];
};

export type ModalSection = {
  _key?: string;
  title: InternationalizedString;
  locked: boolean;
  items: ModalItem[];
};

export type OverviewData = ModalSection[];

export type RewardSection = ModalSection & {
  description: InternationalizedString;
};

export type RewardData = RewardSection[];

export type ModalData = {
  overview: OverviewData;
  reward: RewardData;
};
