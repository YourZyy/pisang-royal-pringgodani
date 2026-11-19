import React from "react";
import { getMenuById, getMenuImageProps } from "../lib/order";

export default function CartItemVisual({
  flavorIds,
  className = "w-16 h-16",
}: {
  flavorIds: string[];
  className?: string;
}) {
  const flavors = flavorIds
    .map((id) => getMenuById(id))
    .filter((m): m is NonNullable<typeof m> => Boolean(m));

  if (flavors.length === 0) {
    return (
      <div
        className={`${className} rounded-ui bg-paper-2 border border-line shrink-0`}
        aria-hidden="true"
      />
    );
  }

  if (flavors.length === 1) {
    return (
      <div
        className={`${className} rounded-ui overflow-hidden bg-paper-2 border border-line shrink-0`}
      >
        <img
          {...getMenuImageProps(flavors[0].foto, "80px")}
          alt={flavors[0].alt}
          loading="lazy"
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className={`${className} rounded-ui overflow-hidden bg-paper-2 border border-line shrink-0 grid grid-cols-2 gap-[1px]`}
    >
      {flavors.slice(0, 2).map((f) => (
        <img
          key={f.id}
          {...getMenuImageProps(f.foto, "40px")}
          alt={f.alt}
          loading="lazy"
          className="w-full h-full object-cover"
        />
      ))}
    </div>
  );
}
