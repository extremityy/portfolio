/** Portfolio palette — brand #18A5FD + gradients shared across pages */
export const siteTheme = {
  brand: "#18A5FD",
  brandHover: "#1290e0",
  brandMuted: "rgba(24, 165, 253, 0.35)",
  /** Soft radial/glow overlays — same hue as brand for visual consistency */
  brandGlowSoft: "rgba(24, 165, 253, 0.42)",
  brandGlowStrong: "rgba(24, 165, 253, 0.55)",
  navy: "#1a3a5c",
  navyDeep: "#0d2440",
  /** Legacy cyan aliases → align with brand */
  cyan: "#18A5FD",
  cyanBright: "#5ec9ff",
  sky: "#7ec8e3",
  ice: "#d6eef8",
  /** Light interior pages */
  pageGradient:
    "linear-gradient(180deg, #e3f4ff 0%, #c8eafd 38%, #a8dcfc 72%, #8ad0fa 100%)",
  /** Hero / top folds */
  heroGradient:
    "linear-gradient(155deg, #eaf6ff 0%, #d2ecfe 22%, #9fd9fc 52%, #18A5FD 88%, #0d8bd6 100%)",
  /** Why / mid sections */
  sectionGradientCool:
    "linear-gradient(180deg, #5ec9ff 0%, #42b8f8 28%, #18A5FD 58%, #0f9de0 100%)",
  projectsHeroGradient:
    "linear-gradient(118deg, #b8e8ff 0%, #5ec9ff 35%, #18A5FD 62%, #0d8bd6 100%)",
  projectsListBg:
    "linear-gradient(180deg, #c8eafd 0%, #dff2ff 48%, #eaf6ff 100%)",
  /** Footer — dominant brand sky blue (matches CTAs / links using `brand`) */
  footerGradient:
    "linear-gradient(180deg, #5ec9ff 0%, #18A5FD 22%, #18A5FD 55%, #18A5FD 78%, #1290e0 100%)",
  /** CTA strip */
  ctaGradient:
    "linear-gradient(180deg, #dff2ff 0%, #b8e5fc 28%, #7ec8f5 55%, #42b8f8 88%, #18A5FD 100%)",
  projectsTitle: "#e63946",
  /** Case study / project detail */
  darkBg: "#0a111e",
  darkBgElevated: "#0f172a",
  darkPageGradient:
    "linear-gradient(165deg, #0a111e 0%, #0f172a 45%, #0c1524 78%, rgba(24,165,253,0.14) 100%)",
  darkSurface: "#121c2e",
  darkBorder: "rgba(148, 163, 184, 0.12)",
  darkText: "#f1f5f9",
  darkTextMuted: "#94a3b8",
  darkHeading: "#cbd5e1",
  accentBlue: "#18A5FD",
  accentBlueHover: "#1290e0",
} as const
