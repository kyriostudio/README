/**
 * URLs publiques — fichiers dans public/carentan/hero-title/ (extensions et noms réels).
 */
function publicHeroUrl(relativePath) {
  const base = import.meta.env.BASE_URL || "/";
  const trimmed = relativePath.startsWith("/") ? relativePath.slice(1) : relativePath;
  return base.endsWith("/") ? `${base}${trimmed}` : `${base}/${trimmed}`;
}

/** Ordre du diaporama : exode → place → gare → mairie */
export const HERO_TITLE_SLIDE_URLS = [
  publicHeroUrl(
    "carentan/hero-title/exode-carentan-juin2018-74ddaya-c.cauchard-ot-baie-du-cotentin-12-1920x1080-f50_50.webp"
  ),
  publicHeroUrl("carentan/hero-title/hero-place-republique.webp"),
  publicHeroUrl("carentan/hero-title/Site_GARE1-scaled.jpg"),
  publicHeroUrl("carentan/hero-title/Mairie_Plan2.jpg"),
];
