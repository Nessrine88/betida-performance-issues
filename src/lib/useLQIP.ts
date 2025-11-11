"use client";

import { useEffect, useState } from "react";

export function useLQIP(publicId: string) {
  const [blurDataURL, setBlurDataURL] = useState<string | null>(null);

  useEffect(() => {
    const fetchLQIP = async () => {
      try {
        const res = await fetch(`/api/cloudinary/lqip?id=${encodeURIComponent(publicId)}`);
        const json = await res.json();
        setBlurDataURL(json.base64);
      } catch (err) {
        console.error("LQIP error", err);
      }
    };

    fetchLQIP();
  }, [publicId]);

  return blurDataURL;
}