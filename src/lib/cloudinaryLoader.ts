export const cloudinaryLoader = ({
  src,
  width,
  quality = 'auto' 
}: {
  src: string;
  width: number;
  quality?: string | number;
}) => {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  
  // Remove leading slash if present
  const cleanSrc = src.startsWith('/') ? src.slice(1) : src;
  
  // Use the quality parameter
  return `https://res.cloudinary.com/${cloudName}/image/upload/w_${width},c_fill,f_auto,q_${quality}/${cleanSrc}`; 
};