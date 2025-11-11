"use client";

import { useRef, useCallback, useEffect } from "react";
import { Button } from "../../../components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useSidebarStore } from "@/store/sidebar-store";
import { useState } from "react";

interface GlobalCarouselProps<T> {
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
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const { setRouteLoading } = useSidebarStore();
  const cardWidthRef = useRef(392);

  // --- Measure card width ---
  useEffect(() => {
    const updateWidth = () => {
      if (scrollRef.current?.firstElementChild) {
        cardWidthRef.current = (scrollRef.current.firstElementChild as HTMLElement).clientWidth || 143;
      }
    };
    updateWidth();

    const observer = new ResizeObserver(updateWidth);
    if (scrollRef.current) observer.observe(scrollRef.current);
    return () => observer.disconnect();
  }, []);

  // --- Scroll ---
  const scroll = useCallback((direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const gap = 16;
    const amount = cardWidthRef.current + gap;
    const target = scrollRef.current.scrollLeft + (direction === "left" ? -amount : amount);
    scrollRef.current.scrollTo({ left: target, behavior: "smooth" });
  }, []);

  // --- Check scroll boundaries ---
  const checkScroll = useCallback(() => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
  }, []);

  // --- Momentum & drag ---
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollStart = useRef(0);
  const velocity = useRef(0);
  const lastX = useRef(0);
  const lastTime = useRef(0);
  const momentumID = useRef<number | null>(null);

  const startMomentum = useCallback((v: number) => {
    const el = scrollRef.current;
    if (!el) return;
    let vel = v;
    const step = () => {
      if (Math.abs(vel) < 0.05) return;
      el.scrollLeft -= vel;
      vel *= 0.95;
      checkScroll();
      momentumID.current = requestAnimationFrame(step);
    };
    momentumID.current = requestAnimationFrame(step);
  }, [checkScroll]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const down = (e: MouseEvent) => {
      e.preventDefault();
      if (momentumID.current) cancelAnimationFrame(momentumID.current);
      isDragging.current = true;
      startX.current = e.pageX - el.offsetLeft;
      scrollStart.current = el.scrollLeft;
      lastX.current = e.pageX;
      lastTime.current = performance.now();
      el.classList.add("cursor-grabbing");
      document.addEventListener("mousemove", move);
      document.addEventListener("mouseup", up);
    };

    const move = (e: MouseEvent) => {
      if (!isDragging.current) return;
      e.preventDefault();
      const x = e.pageX - el.offsetLeft;
      const walk = (x - startX.current) * 1;
      el.scrollLeft = scrollStart.current - walk;
      const now = performance.now();
      const dx = e.pageX - lastX.current;
      const dt = now - lastTime.current;
      velocity.current = dt > 0 ? dx / dt : 0;
      lastX.current = e.pageX;
      lastTime.current = now;
      checkScroll();
    };

    const up = () => {
      if (!isDragging.current) return;
      isDragging.current = false;
      el.classList.remove("cursor-grabbing");
      if (Math.abs(velocity.current) > 0.2) startMomentum(velocity.current * 5);
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseup", up);
    };

    el.addEventListener("mousedown", down);
    el.addEventListener("scroll", checkScroll);

    return () => {
      el.removeEventListener("mousedown", down);
      el.removeEventListener("scroll", checkScroll);
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseup", up);
      if (momentumID.current) cancelAnimationFrame(momentumID.current);
    };
  }, [checkScroll, startMomentum]);

  return (
    <div className="w-full h-auto select-none">
      <div className="flex items-center justify-between mb-2.5">
        {title_href ? (
          <Link
            href={title_href}
            aria-label="title link"
            onClick={() => setRouteLoading(true)}
            className="text-foreground-muted text-base font-semibold"
          >
            {title}
          </Link>
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
            <ChevronLeft className={`size-6 p-0.5 ${canScrollLeft ? "text-foreground" : "text-muted-foreground"}`} />
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
            <ChevronRight className={`size-6 p-0.5 ${canScrollRight ? "text-foreground" : "text-muted-foreground"}`} />
            <span className="sr-only">Scroll right</span>
          </Button>
        </div>
      </div>
      <div
        ref={scrollRef}
        className="flex gap-2 app-container-2 h-auto overflow-x-auto no-scrollbar cursor-grab active:cursor-grabbing"
        onScroll={checkScroll}
      >
        {items.map((item, index) => (
          <div key={index}>{renderItem(item, index)}</div>
        ))}
      </div>
    </div>
  );
}