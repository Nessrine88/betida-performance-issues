"use client";
import { useRef, useState, useEffect, useCallback } from "react";
import { Button } from "../../../components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useSidebarStore } from "@/store/sidebar-store";

interface GlobalCarouselProps<T extends unknown = unknown> {
  title: string;
  title_href?: string;
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
}

export default function GlobalCarousel<T>({
  title,
  items,
  renderItem,
  title_href,
}: GlobalCarouselProps<T>) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const { setRouteLoading } = useSidebarStore();
  const [cardWidth, setCardWidth] = useState(392);
  // --- drag scroll states ---
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollStart = useRef(0);
  const velocity = useRef(0);
  const lastX = useRef(0);
  const lastTime = useRef(0);
  const momentumID = useRef<number | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const updateCardWidth = () => {
      if (scrollRef.current && scrollRef.current.firstElementChild) {
        const firstChild = scrollRef.current.firstElementChild as HTMLElement;
        setCardWidth(firstChild.clientWidth || 143);
      }
    };
    updateCardWidth();
    window.addEventListener("resize", updateCardWidth);
    return () => window.removeEventListener("resize", updateCardWidth);
  }, [isClient]);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) {
      return;
    }
    const gap = 16;
    const scrollAmount = cardWidth + gap;
    const newScroll =
      scrollRef.current.scrollLeft +
      (direction === "left" ? -scrollAmount : scrollAmount);
    scrollRef.current.scrollTo({ left: newScroll, behavior: "smooth" });
  };

  const checkScroll = () => {
    if (!scrollRef.current) {
      return;
    }
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
  };

  useEffect(() => {
    checkScroll();
  }, [isClient]);

  // --- momentum scrolling logic ---
  const startMomentumScroll = useCallback((initialVelocity: number) => {
    const el = scrollRef.current;
    if (!el) {
      return;
    }
    let currentVelocity = initialVelocity;
    const step = () => {
      if (Math.abs(currentVelocity) < 0.05) {
        momentumID.current = null;
        return;
      }
      el.scrollLeft -= currentVelocity;
      currentVelocity *= 0.95;
      checkScroll();
      momentumID.current = requestAnimationFrame(step);
    };
    momentumID.current = requestAnimationFrame(step);
  }, []);

  // --- drag scroll handlers ---
  useEffect(() => {
    const carousel = scrollRef.current;
    if (!carousel) {
      return () => { };
    }

    const handleMouseDown = (e: MouseEvent) => {
      e.preventDefault();
      if (momentumID.current) {
        cancelAnimationFrame(momentumID.current);
      }
      isDragging.current = true;
      startX.current = e.pageX - carousel.offsetLeft;
      scrollStart.current = carousel.scrollLeft;
      lastX.current = e.pageX;
      lastTime.current = performance.now();
      carousel.classList.add("cursor-grabbing");
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", stopDragging);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) {
        return;
      }
      e.preventDefault();
      const x = e.pageX - carousel.offsetLeft;
      const walk = (x - startX.current) * 1;
      carousel.scrollLeft = scrollStart.current - walk;
      const now = performance.now();
      const deltaX = e.pageX - lastX.current;
      const deltaT = now - lastTime.current;
      velocity.current = deltaT > 0 ? deltaX / deltaT : 0;
      lastX.current = e.pageX;
      lastTime.current = now;
      checkScroll();
    };

    const stopDragging = (e: MouseEvent) => {
      if (isDragging.current) {
        e.preventDefault();
        isDragging.current = false;
        carousel.classList.remove("cursor-grabbing");
        if (Math.abs(velocity.current) > 0.2) {
          startMomentumScroll(velocity.current * 5);
        }
      }
      // Remove global listeners
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", stopDragging);
    };

    carousel.addEventListener("mousedown", handleMouseDown);

    return () => {
      carousel.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", stopDragging);
    };
  }, [isClient, startMomentumScroll]);

  if (!isClient) {
    return null;
  }

  return (
    <div className="w-full h-auto select-none">
      <div className="flex items-center justify-between mb-2.5">
        {title_href ? (
          <Link href={title_href} 
            aria-label="title link" 
            onClick={()=>{setRouteLoading(true)}}
            className="text-foreground-muted text-base font-semibold">{title}</Link>
        ) : (
          <h2 className="text-foreground-muted text-base font-semibold">
          {title}
        </h2>
        )}
        <div className="flex items-center gap-2">
          <Button
            aria-label="previous"
            variant="outline"
            className={`
              size-6 p-0.5 rounded-sm border
              ${canScrollLeft
                ? "border-foreground text-foreground bg-foreground/10 hover:bg-foreground/20"
                : "border-foreground-muted text-foreground-muted bg-transparent"
              }
              flex items-center justify-center
            `}
            disabled={!canScrollLeft}
            onClick={() => scroll("left")}
          >
            <ChevronLeft
              className={`size-6 p-0.5 ${canScrollLeft ? "text-foreground" : "text-muted-foreground"}`}
            />
            <span className="sr-only">Scroll left</span>
          </Button>
          <Button
            aria-label="next"
            variant="outline"
            className={`
              size-6 p-0.5 rounded-sm border
              ${canScrollRight
                ? "border-foreground text-foreground bg-foreground/10 hover:bg-foreground/20"
                : "border-foreground-muted text-foreground-muted bg-transparent"
              }
              flex items-center justify-center
            `}
            disabled={!canScrollRight}
            onClick={() => scroll("right")}
          >
            <ChevronRight
              className={`size-6 p-0.5 ${canScrollRight ? "text-foreground" : "text-muted-foreground"}`}
            />
            <span className="sr-only">Scroll right</span>
          </Button>
        </div>
      </div>
      <div
        ref={scrollRef}
        className="
          flex gap-2 app-container-2 h-auto overflow-x-auto no-scrollbar
          cursor-grab active:cursor-grabbing
        "
        onScroll={checkScroll}
      >
        {items?.map((item, index) => (
          <div key={index}>{renderItem(item, index)}</div>
        ))}
      </div>
    </div >
  );
}