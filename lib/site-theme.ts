/** Portfolio palette — brand #18A5FD + light blue throughout */
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
  /** Consistent light blue background across all pages */
  lightBlue: "#d4e9f7",
  lightBlueBg: "linear-gradient(180deg, #d4e9f7 0%, #d4e9f7 100%)",
  /** Light interior pages - now using consistent light blue */
  pageGradient: "#d4e9f7",
  /** Hero / top folds - now using consistent light blue */
  heroGradient: "#d4e9f7",
  /** Why / mid sections - consistent light blue */
  sectionGradientCool: "#d4e9f7",
  projectsHeroGradient: "#d4e9f7",
  projectsListBg: "#d4e9f7",
  /** Footer — consistent light blue */
  footerGradient: "#d4e9f7",
  /** CTA strip - consistent light blue */
  ctaGradient: "#d4e9f7",
  projectsTitle: "#18A5FD",
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
