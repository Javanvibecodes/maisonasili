'use client';

import * as React from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Props for the InteractiveTravelCard component.
 */
export interface InteractiveTravelCardProps {
  /** The main title for the card, e.g., "Sapa Valley" */
  title: string;
  /** A subtitle or location, e.g., "Vietnam" */
  subtitle: string;
  /** The URL for the background image. */
  imageUrl: string;
  /** The text for the primary action button, e.g., "Book your trip" */
  actionText: string;
  /** The destination URL for navigation. */
  href: string;
  /** Callback function when the primary action button is clicked. */
  onActionClick?: () => void;
  /** Optional additional class names for custom styling. */
  className?: string;
}

/**
 * A responsive and theme-adaptive travel card with a 3D tilt effect on hover.
 */
export const InteractiveTravelCard = React.forwardRef<
  HTMLDivElement,
  InteractiveTravelCardProps
>(
  (
    { title, subtitle, imageUrl, actionText, href, onActionClick, className },
    ref
  ) => {
    // --- 3D Tilt Animation Logic ---
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 15, stiffness: 150 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    const rotateX = useTransform(springY, [-0.5, 0.5], ["10.5deg", "-10.5deg"]);
    const rotateY = useTransform(springX, [-0.5, 0.5], ["-10.5deg", "10.5deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const { width, height, left, top } = rect;
      const mouseXVal = e.clientX - left;
      const mouseYVal = e.clientY - top;
      const xPct = mouseXVal / width - 0.5;
      const yPct = mouseYVal / height - 0.5;
      mouseX.set(xPct);
      mouseY.set(yPct);
    };

    const handleMouseLeave = () => {
      mouseX.set(0);
      mouseY.set(0);
    };

    return (
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className={cn(
          // Base styles for the card container, using theme variables for border
          "relative h-[22rem] w-full rounded-2xl bg-transparent shadow-2xl border border-border/30 sm:h-[26rem]",
          className ?? ''
        )}
      >
        <div
          style={{
            transform: "translateZ(50px)",
            transformStyle: "preserve-3d",
          }}
          className="absolute inset-3 grid h-[calc(100%-1.5rem)] w-[calc(100%-1.5rem)] grid-rows-[1fr_auto] rounded-xl shadow-lg sm:inset-4 sm:h-[calc(100%-2rem)] sm:w-[calc(100%-2rem)]"
        >
          {/* Background Image */}
          <img
            src={imageUrl}
            alt={`${title}, ${subtitle}`}
            className="absolute inset-0 h-full w-full rounded-xl object-cover"
          />
          
          {/* Darkening overlay for better text contrast over the image */}
          <div className="absolute inset-0 h-full w-full rounded-xl bg-gradient-to-b from-black/25 via-transparent to-black/70" />

          {/* Card Content (Header & Footer) */}
          <div className="relative flex flex-col justify-between rounded-xl p-3.5 text-white sm:p-4">
            
            {/* Header section with text */}
            <div className="flex items-start justify-between">
              <div>
                <motion.h2 
                  style={{ transform: "translateZ(50px)" }}
                  className="font-sans text-xl font-bold uppercase tracking-wider sm:text-2xl"
                >
                  {title}
                </motion.h2>
                <motion.p 
                  style={{ transform: "translateZ(40px)" }}
                  className="text-xs font-light text-white/85 sm:text-sm"
                >
                  {subtitle}
                </motion.p>
              </div>
            </div>

            {/* Footer Button / Link */}
            <Link
              href={href}
              onClick={onActionClick}
              className="block w-full cursor-pointer"
            >
              <motion.span
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                style={{ transform: "translateZ(40px)" }}
                className={cn(
                  "block w-full rounded-lg py-2.5 text-center text-xs font-semibold uppercase tracking-[0.2em] text-white transition-colors sm:py-3 sm:text-sm",
                  // Glassmorphism styling for the button, designed to work over a dark image overlay
                  "bg-white/15 backdrop-blur-md ring-1 ring-inset ring-white/25 hover:bg-white/25"
                )}
              >
                {actionText}
              </motion.span>
            </Link>
          </div>
        </div>
      </motion.div>
    );
  }
);
InteractiveTravelCard.displayName = "InteractiveTravelCard";
