import type { Meta, StoryObj } from "@storybook/react";
import { GlobalAccordion } from "../global-components/global-accordion";

type SliderData = {
  title: string;
  content: string;
};

const meta: Meta<typeof GlobalAccordion> = {
  title: "Components/Global Accordion",
  component: GlobalAccordion,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof GlobalAccordion>;

const sampleData: SliderData[] = [
  {
    title: "Who is BETIDA",
    content:
      "Leading the online gambling industry since 2017, betida.com offers a wide variety of online casino and sports betting options, operating globally in 15 different languages...",
  },
  {
    title: "Is BETIDA Licensed?",
    content: "Yes, betida.com is a licensed platform...",
  },
  {
    title: "Is Betting on BETIDA Safe?",
    content: "Yes, betting on betida.com is safe...",
  },
];

export const Default: Story = {
  args: {
    data: sampleData,
  },
};

export const Empty: Story = {
  args: {
    data: [],
  },
};
