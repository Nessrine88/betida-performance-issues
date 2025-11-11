import { Cloudinary } from "@cloudinary/url-gen";
import { fill } from "@cloudinary/url-gen/actions/resize";

const cld = new Cloudinary({
  cloud: {
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!,
  },
  url: {
    secure: true,
  },
});

export function getCloudinaryImage(publicId: string, width: number, height: number) {
  const myImage = cld.image(publicId);
  myImage.resize(fill().width(width).height(height));
  return myImage.toURL();
}

// helper for responsive srcSet
export function getCloudinarySrcSet(publicId: string, sizes: number[]) {
  return sizes.map((w) => `${getCloudinaryImage(publicId, w, w)} ${w}w`).join(", ");
}
