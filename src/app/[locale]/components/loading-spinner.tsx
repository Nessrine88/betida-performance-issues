import Image from "next/image";

export default function LoadingSpinner() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-background z-50 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-black/50 to-transparent animate-diagonal-sweep" />
      </div>
      <div className="relative z-10 animate-bounce-slow">
        <Image
          src="/logos/logo.webp"
          alt="BETIDA Logo"
          fill
          sizes="(max-width: 768px) 80px,80px"
          className="object-contain"
          priority
        />
      </div>

      <div className="relative z-10 flex space-x-0 overflow-hidden">
        <span
          className="text-2xl font-bold text-foreground animate-wave flex flex-col items-center justify-center gap-3"
          style={{
            animationDelay: `0.1s`,
            display: "inline-block",
          }}
        >
          BETIDA
          <span className="!text-4xl">Loading...</span>
        </span>
      </div>
    </div>
  );
}
