export type QuestionData = {
  _id: string;
  title: string;
  content: string;
};

export type Bet = {
  _id: string;
  game: string;
  user: string;
  time: string;
  betAmount: string;
  multiplier: string;
  payout: string;
  type: string;
};
