import ProductClient from "./ProductClient";

export const dynamic = "force-dynamic";
export const dynamicParams = true;

export async function generateStaticParams() {
  return [
    { slug: "custom-magazine" },
    { slug: "photo-album" },
    { slug: "recap-reel" },
    { slug: "custom-frame" },
    { slug: "birthday-magazine" },
    { slug: "anniversary-album" },
  ];
}

export default function Page() {
  return <ProductClient />;
}