import type { Category } from "@/lib/content/schemas";

export const categories = [
  {
    id: "Hotwheels",
    slug: "hotwheels",
    title: "Hotwheels",
    themeToken: "hotwheels",
    subcategories: [
      {
        id: "Display_Racks",
        title: "Display Racks",
      },
    ],
  },
  {
    id: "Retro_Gaming",
    slug: "retro-gaming",
    title: "Retro Gaming",
    themeToken: "retro",
    subcategories: [
      {
        id: "Snes",
        title: "Snes",
      },
    ],
  },
  {
    id: "Misc_Items",
    slug: "misc-items",
    title: "Misc Items",
    themeToken: "misc",
    subcategories: [
      {
        id: "Drinks",
        title: "Drink Holders",
      },
      {
        id: "Key_Rings",
        title: "Key Rings",
      },
    ],
  },
  {
    id: "Vial_Storage",
    slug: "pep-things",
    title: "Pep Things",
    themeToken: "pep",
    subcategories: [
      {
        id: "3ml_Cases",
        title: "Cases",
      },
      {
        id: "Labeling",
        title: "Labeling",
      },
      {
        id: "Travel_Cases",
        title: "Travel Cases",
      },
      {
        id: "Misc_Items",
        title: "Misc Items",
      },
      {
        id: "Pens",
        title: "Pens",
      },
    ],
  },
] as const satisfies readonly Category[];
