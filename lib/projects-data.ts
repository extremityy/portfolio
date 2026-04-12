export interface Project {
  id: string
  title: string
  slug: string
  role: string
  tagline: string
  description: string
  fullDescription: string
  heroImage: string
  previewImages: string[]
  insights: string
  problemStatement: string
  features: string[]
  technologies: string[]
  liveUrl?: string
  githubUrl?: string
  color: string
  accentColor: string
  /** Optional captions for `previewImages`, same order */
  galleryCaptions?: string[]
}

export const projects: Project[] = [
  {
    id: "1",
    title: "Scan2Dine",
    slug: "scan2dine",
    role: "UI/UX Designer | Frontend Developer",
    tagline: "Hassle-Free Dining Your Digital Menu Awaits",
    description:
      "SCAN2Dine is a smart dining platform that makes eating at restaurants faster and easier. Customers simply scan a QR code to view the menu, order food, and pay using their phones.",
    fullDescription:
      "SCAN2Dine is a smart dining platform that makes eating at restaurants faster and easier. Customers simply scan a QR code to view the menu, order food, and pay using their phones. It removes the need for physical menus and long waits. SCAN2Dine focuses on convenience, speed, and a smooth contactless dining experience for both customers and restaurants.",
    heroImage: "/projects/scan2dine/scan2dine-hero.png",
    previewImages: [
      "/projects/scan2dine/scan2dine-about.png",
      "/projects/scan2dine/scan2dine-contact.png",
      "/projects/scan2dine/scan2dine-promo.png",
      "/projects/scan2dine/scan2dine-dashboard.png",
      "/projects/scan2dine/scan2dine-admin-edit.png",
    ],
    galleryCaptions: [
      "About Scan2Dine",
      "Contact page",
      "Brand & marketing",
      "Restaurant dashboard",
      "Menu management — edit item",
    ],
    insights:
      "Traditional restaurant systems rely on physical menus and manual order-taking, which often cause delays, order errors, and miscommunication between staff and the kitchen. Physical menus can also be unhygienic and difficult to update, while customers usually have no clear visibility of their order status. These issues show the need for a digital solution that improves efficiency, transparency, and the overall dining experience.",
    problemStatement:
      "Restaurants that depend on physical menus and manual ordering often experience slow service, communication errors, and longer waiting times. Customers also cannot track their order status, which can lead to dissatisfaction. Therefore, a digital platform is needed to simplify ordering, improve transparency, and enhance the dining experience.",
    features: [
      "QR Code Menu Scanning",
      "Digital Order Placement",
      "Real-time Order Tracking",
      "Contactless Payment",
      "Restaurant Dashboard",
    ],
    technologies: ["React", "Node.js", "MongoDB", "Stripe", "Socket.io"],
    liveUrl: "https://scan2dine.example.com",
    color: "#0a111e",
    accentColor: "#FACC15",
  },
  {
    id: "2",
    title: "Omnicart",
    slug: "omnicart",
    role: "UI/UX Designer | Frontend Developer",
    tagline: "Where Fashion Meets Convenience",
    description:
      "OmniCart is a mini e-commerce platform designed to provide a convenient and organized online shopping experience for fashion products.",
    fullDescription:
      "OmniCart is a mini e-commerce platform designed to provide a convenient and organized online shopping experience for fashion products. The platform brings together different product categories such as clothes, jewelry, and cosmetics into a single system, allowing customers to browse and purchase multiple items in one place. By offering a centralized digital platform, OmniCart aims to simplify the shopping process and make it easier for customers to explore a variety of fashion products.",
    heroImage: "/projects/omnicart/omnicart-hero.png",
    previewImages: [
      "/projects/omnicart/omnicart-home.png",
      "/projects/omnicart/omnicart-landing-fashion.png",
      "/projects/omnicart/omnicart-browse-featured.png",
      "/projects/omnicart/omnicart-product-list.png",
      "/projects/omnicart/omnicart-product-detail.png",
      "/projects/omnicart/omnicart-cart.png",
      "/projects/omnicart/omnicart-contact.png",
      "/projects/omnicart/omnicart-forgot-password.png",
      "/projects/omnicart/omnicart-logo.png",
    ],
    galleryCaptions: [
      "Home — hero & browse by category",
      "Landing — Fashion Without Boundaries",
      "Categories, promo & products",
      "Product listing — Clothing",
      "Product detail page",
      "Shopping cart & checkout",
      "Contact Us",
      "Forgot password — OTP flow",
      "Brand logo",
    ],
    insights:
      "Many small fashion retailers rely on offline stores or social media, which lack proper e-commerce features like secure checkout, product organization, and order tracking. Customers increasingly prefer one-stop online platforms where they can buy multiple fashion products in one place.",
    problemStatement:
      "Many small fashion stores lack proper online platforms and sell limited product categories, reducing customer convenience and accessibility. Therefore, a digital e-commerce platform is needed to improve shopping convenience and business competitiveness.",
    features: [
      "Product Categories",
      "Shopping Cart",
      "Secure Checkout",
      "Order Tracking",
      "User Accounts",
    ],
    technologies: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Stripe"],
    liveUrl: "https://omnicart.example.com",
    color: "#0a111e",
    accentColor: "#CA8A04",
  },
  {
    id: "3",
    title: "Unravel",
    slug: "unravel",
    role: "UI/UX Designer | Frontend Developer",
    tagline: "Discover Your Heritage Through Play",
    description:
      "Many Bhutanese youths today are disconnected from their culture and history, finding traditional learning methods unengaging.",
    fullDescription:
      "Many Bhutanese youths today are disconnected from their culture and history, finding traditional learning methods unengaging. Unravel is a gamified platform designed to make exploring Bhutan's rich heritage fun and interactive, helping youths learn about their past, culture, and traditions through engaging gameplay.",
    heroImage: "/projects/unravel/unravel-home-hero.png",
    previewImages: [
      "/projects/unravel/unravel-landing.png",
      "/projects/unravel/unravel-about.png",
      "/projects/unravel/unravel-signup.png",
      "/projects/unravel/unravel-key-features.png",
      "/projects/unravel/unravel-game-narrative.png",
      "/projects/unravel/unravel-theme-select.png",
      "/projects/unravel/unravel-level-select.png",
      "/projects/unravel/unravel-merch.png",
      "/projects/unravel/unravel-logo.png",
    ],
    galleryCaptions: [
      "Landing — Bhutan & storytelling",
      "About Us",
      "Sign Up — split layout",
      "Key Features",
      "Game narrative — historical battle",
      "Theme selection",
      "Level selection",
      "Merch — product page",
      "Brand logo",
    ],
    insights:
      "Bhutanese youths have limited awareness of their cultural heritage and history, and traditional learning methods fail to engage them effectively.",
    problemStatement:
      "There is a need for an interactive, gamified platform that makes learning Bhutanese history and culture engaging and accessible, motivating youths to explore and connect with their heritage.",
    features: [
      "Interactive Quizzes",
      "Cultural Stories",
      "Achievement System",
      "Leaderboards",
      "Progress Tracking",
    ],
    technologies: ["React Native", "Firebase", "Node.js", "MongoDB"],
    liveUrl: "https://unravel.example.com",
    color: "#0a111e",
    accentColor: "#FFCC00",
  },
]
