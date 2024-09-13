"use client";

import { useState } from "react";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

type AnimatedTabsProps = {
  containerClassName?: string;
  activeTabClassName?: string;
  tabClassName?: string;
  onChange?: (index: number) => void;
};

export function AnimatedTabs({
  containerClassName,
  activeTabClassName,
  tabClassName,
  onChange,
}: AnimatedTabsProps) {
  const [activeIdx, setActiveIdx] = useState<number>(0);

  const tabs = [
    { title: "1h" },
    { title: "24h" },
    { title: "7d" },
  ];

  const handleTabClick = (index: number) => {
    setActiveIdx(index);
    if (onChange) onChange(index); // Trigger the onChange function if provided
  };

  return (
    <div
      className={cn(
        "relative flex flex-wrap items-center justify-end ",
        containerClassName
      )}
    >
      {tabs.map((tab, index) => (
        <button
          key={tab.title}
          onClick={() => handleTabClick(index)}
          className={cn(
            "group relative z-[1] rounded-full px-4 py-2",
            { "z-0": activeIdx === index },
            tabClassName
          )}
        >
          {activeIdx === index && (
            <motion.div
              layoutId="clicked-button"
              transition={{ duration: 0.2 }}
              className={cn(
                "absolute inset-0 rounded-full bg-white/10",
                activeTabClassName
              )}
            />
          )}

          <span
            className={cn(
              "relative text-[14px] block font-normal duration-200",
              activeIdx === index ? "text-white delay-100 font-medium" : "text-white/70"
            )}
          >
            {tab.title}
          </span>
        </button>
      ))}
    </div>
  );
}