export const cloudinaryLoader = ({
  src,
  width,
}: {
  src: string;
  width: number;
}) => {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  return `https://res.cloudinary.com/${cloudName}/image/upload/w_${width},c_fill,f_auto,q_auto/${src}`; 
};
