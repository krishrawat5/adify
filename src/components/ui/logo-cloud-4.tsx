import React from "react";
import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";

type LogoCloudProps = React.ComponentProps<"div"> & {
  services: string[];
};

export function LogoCloud({ services }: LogoCloudProps) {
  return (
    <div className="relative mx-auto w-full bg-transparent py-6 md:border-x border-slate-200">
      <div className="-translate-x-1/2 -top-px pointer-events-none absolute left-1/2 w-screen border-t border-slate-200" />

      <InfiniteSlider gap={64} reverse duration={30} durationOnHover={60}>
        {services.map((service, idx) => (
          <span
            key={`service-${idx}`}
            className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tighter opacity-30 hover:opacity-60 transition-opacity duration-300 select-none whitespace-nowrap"
          >
            {service}
          </span>
        ))}
      </InfiniteSlider>

      <ProgressiveBlur
        blurIntensity={1}
        className="pointer-events-none absolute top-0 left-0 h-full w-[160px]"
        direction="left"
      />
      <ProgressiveBlur
        blurIntensity={1}
        className="pointer-events-none absolute top-0 right-0 h-full w-[160px]"
        direction="right"
      />

      <div className="-translate-x-1/2 -bottom-px pointer-events-none absolute left-1/2 w-screen border-b border-slate-200" />
    </div>
  );
}
