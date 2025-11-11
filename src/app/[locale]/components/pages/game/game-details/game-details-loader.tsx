"use client"
import { memo } from "react";

const GameCardLoader: React.FC = memo(() => {
  return (
    <div className="w-full h-auto">
      <div
        className="
          grid gap-2
          grid-cols-2
          sm:grid-cols-4
          md:grid-cols-3
          lg:grid-cols-5
          xl:grid-cols-6
        "
      >
        {Array.from({ length: 12 }).map((_, index) => (
          <div
            key={index}
            className="relative overflow-hidden rounded-lg bg-muted animate-pulse flex flex-col gap-2 w-35.75 m:w-31.75 h-62"
          >
            <div className="w-full h-62 bg-muted rounded-lg" />
          </div>
        ))}
      </div>
    </div>
  );
});
GameCardLoader.displayName = "GameCardLoader";

export default GameCardLoader;