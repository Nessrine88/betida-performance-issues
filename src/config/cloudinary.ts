export const CLOUD_NAME =
  process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "demo";

export const TRANSFORM_BY_SIZE = {
  sm: { name: "t_betida_card_sm_glass", width: 208 },
  md: { name: "t_betida_card_md_glass", width: 384 },
  lg: { name: "t_betida_card_lg_glass", width: 768 },
} as const;
