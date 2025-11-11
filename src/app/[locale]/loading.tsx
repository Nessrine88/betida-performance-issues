import Image from "next/image";

export default function Loading() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-background z-9999 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-linear-to-br from-transparent via-black/50 to-transparent animate-diagonal-sweep"/>
      </div>

      <div className="relative z-10 animate-bounce-slow">
        <Image
          src="/logos/logo.webp" 
          alt="BETIDA Logo"
          width={60}
          height={60}
          className="object-contain"
          priority
        />
      </div>

      <div className="relative z-10 flex space-x-2 overflow-hidden">
        {Array.from("BETIDA").map((letter, i) => (
          <span
            key={i}
            className="text-4xl font-bold text-foreground inline-block animate-wave"
            style={{
              animationDelay: `${i * 0.1}s`,
              display: "inline-block",
            }}
          >
            {letter === " " ? "\u00A0" : letter}
          </span>
        ))}
      </div>
    </div>
  );
}
