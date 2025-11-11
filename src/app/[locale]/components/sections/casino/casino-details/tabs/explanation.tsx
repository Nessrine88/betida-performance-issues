import React from "react";
import pokerDetails from "@/data/poker-details-data.json";
import CImage from "@/lib/CIdImage";
const tags = [
  {
    title: "crash share",
  },
  { title: "bonus buy" },
  { title: "enhance rtp" },
  { title: "pragmatic play" },
  { title: "slots" },
  { title: "stack exclusive" },
  { title: "bonus buy" },
  { title: "enhance rtp" },
  { title: "pragmatic play" },
];
function Explanation() {
  return (
    <div className="flex flex-col gap-4 text-foreground">
      <div className="flex flex-col lg:flex-row gap-2 lg:gap-3">
        <CImage
          publicId="poker-card"
          alt="poker"
          width={143}
          height={188}
          className="rounded-lg"
          priority
        />

        <div className="flex flex-row h-fit gap-2 flex-wrap">
          {tags.map((tag, i) => (
            <div
              key={i}
              className="rounded-xl h-fit w-fit capitalize px-2 bg-background"
            >
              {tag?.title}
            </div>
          ))}
        </div>
      </div>
      <div className="details flex flex-col gap-3">
        {pokerDetails?.map((data: any, i: number) => (
          <div className="flex flex-col gap-2" key={i}>
            <h3 className="text-foreground text-base">{data?.title}</h3>
            <p className="text-foreground/55 text-sm">{data?.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Explanation;
