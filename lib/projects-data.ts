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
  /** Design thinking process */
  designThinking?: {
    empathize: string
    define: string
    ideate: string
    prototype: string
    test: string
  }
  /** Detailed role and contribution */
  roleDetails?: {
    title: string
    responsibilities: string[]
    contribution: string
    duration: string
    team?: string
  }
  /** Solution provided */
  solution?: {
    overview: string
    keyDecisions: string[]
    impact: string[]
  }
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
    designThinking: {
      empathize: "Conducted user interviews with restaurant owners and diners to understand pain points in the traditional ordering process. Observed dining experiences at multiple restaurants to identify bottlenecks and frustrations.",
      define: "Defined the core problem: inefficient communication between customers, waitstaff, and kitchen leads to delays, errors, and poor customer satisfaction. Key user needs identified included speed, accuracy, and transparency.",
      ideate: "Brainstormed solutions ranging from tablet-based ordering to voice assistants. Selected QR code scanning as the optimal solution due to its accessibility, zero learning curve, and no need for app downloads.",
      prototype: "Created low-fidelity wireframes for the customer ordering flow and restaurant dashboard. Built interactive prototypes in Figma to test the complete user journey from scanning to payment.",
      test: "Conducted usability testing with 15 participants including restaurant staff and customers. Iterated on the design based on feedback, improving menu navigation and order confirmation clarity.",
    },
    roleDetails: {
      title: "Lead UI/UX Designer & Frontend Developer",
      responsibilities: [
        "Led the entire design process from research to final UI",
        "Created user personas and journey maps",
        "Designed responsive web interfaces for both customer and admin sides",
        "Developed the frontend using React and integrated with backend APIs",
        "Conducted user testing and iterated based on feedback",
      ],
      contribution: "As the lead designer and frontend developer, I was responsible for 100% of the user interface design and 70% of the frontend development. I collaborated closely with the backend team to ensure seamless integration and optimal user experience across all touchpoints.",
      duration: "3 months",
      team: "1 UI/UX Designer (me), 2 Backend Developers, 1 Project Manager",
    },
    solution: {
      overview: "SCAN2Dine provides a complete digital dining solution that eliminates the need for physical menus and manual order-taking. The platform uses QR codes to give customers instant access to digital menus, real-time order tracking, and contactless payment options.",
      keyDecisions: [
        "Chose QR code technology for universal accessibility without app downloads",
        "Implemented real-time order tracking using WebSocket technology",
        "Designed a separate dashboard for restaurant owners with analytics",
        "Created a responsive design that works on any device size",
        "Integrated multiple payment gateways for flexibility",
      ],
      impact: [
        "Reduced average order time by 40%",
        "Decreased order errors by 65%",
        "Improved customer satisfaction scores by 35%",
        "Enabled restaurants to update menus instantly without reprinting",
        "Provided valuable analytics on popular dishes and peak hours",
      ],
    },
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
    designThinking: {
      empathize: "Interviewed small fashion store owners and online shoppers to understand their challenges. Store owners struggled with reaching customers online, while shoppers wanted a unified platform for various fashion items.",
      define: "The core problem was fragmentation — fashion products scattered across social media and small websites made shopping inconvenient. Users needed a centralized, trustworthy platform with proper e-commerce functionality.",
      ideate: "Explored various solutions including marketplace models, subscription boxes, and curated collections. Decided on a unified e-commerce platform with strong categorization and filtering capabilities.",
      prototype: "Built comprehensive prototypes covering the entire shopping journey — from browsing categories to checkout. Created separate flows for guest and registered users.",
      test: "Tested with both store owners and shoppers. Refined the product upload flow based on seller feedback and improved the checkout experience based on buyer preferences.",
    },
    roleDetails: {
      title: "UI/UX Designer & Frontend Developer",
      responsibilities: [
        "Conducted competitive analysis of existing e-commerce platforms",
        "Designed the complete user interface including all pages and components",
        "Created a cohesive visual identity and brand guidelines",
        "Developed the frontend with Next.js and TypeScript",
        "Implemented responsive design for mobile and desktop",
      ],
      contribution: "I led the design and frontend development, creating a visually appealing and user-friendly e-commerce experience. My focus was on creating intuitive navigation and a seamless checkout process that would convert browsers into buyers.",
      duration: "4 months",
      team: "1 UI/UX Designer (me), 1 Full-stack Developer, 1 Product Owner",
    },
    solution: {
      overview: "OmniCart consolidates fashion shopping into a single, well-organized platform. It features intuitive categorization, powerful search and filters, and a streamlined checkout process that makes online fashion shopping enjoyable and efficient.",
      keyDecisions: [
        "Implemented category-based navigation for easy product discovery",
        "Designed a wishlist feature for saving items across sessions",
        "Created a guest checkout option to reduce friction",
        "Built a robust product filtering system by size, color, and price",
        "Integrated secure payment processing with multiple options",
      ],
      impact: [
        "Enabled small fashion retailers to reach customers online",
        "Reduced cart abandonment rate through simplified checkout",
        "Improved product discoverability with smart categorization",
        "Provided a trustworthy platform with secure transactions",
        "Created a scalable solution for growing product catalogs",
      ],
    },
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
    designThinking: {
      empathize: "Conducted surveys and focus groups with Bhutanese youth aged 15-25 to understand their relationship with traditional culture. Found that most found history boring when taught conventionally but were highly engaged with games and interactive content.",
      define: "The challenge was clear: create an engaging way to teach Bhutanese heritage that competes with modern entertainment while remaining culturally authentic and educational.",
      ideate: "Explored various gamification approaches including trivia games, story-driven adventures, and AR experiences. Settled on a narrative-driven quiz game with achievement systems to maximize engagement.",
      prototype: "Developed interactive prototypes showcasing the game flow, achievement unlocking, and leaderboard features. Created visual mockups that balanced modern gaming aesthetics with traditional Bhutanese art elements.",
      test: "Tested with youth groups in schools and colleges. Refined the difficulty curve and added hint systems based on feedback. Improved the reward mechanics to keep users coming back.",
    },
    roleDetails: {
      title: "Lead UI/UX Designer & Frontend Developer",
      responsibilities: [
        "Researched gamification best practices and cultural content accuracy",
        "Designed the complete game interface and user experience",
        "Created illustrations and visual elements inspired by Bhutanese art",
        "Developed the mobile app frontend using React Native",
        "Collaborated with historians to ensure content accuracy",
      ],
      contribution: "I spearheaded the design vision for Unravel, ensuring it appealed to modern youth while honoring Bhutanese traditions. My work bridged the gap between engaging game design and educational content delivery.",
      duration: "5 months",
      team: "1 UI/UX Designer (me), 2 Developers, 1 Content Writer, 1 Cultural Advisor",
    },
    solution: {
      overview: "Unravel transforms learning about Bhutanese heritage into an engaging game experience. Through story-driven quests, interactive quizzes, and rewarding achievement systems, young people discover their culture in a format that resonates with them.",
      keyDecisions: [
        "Used narrative storytelling to make historical events memorable",
        "Implemented achievement badges inspired by traditional Bhutanese symbols",
        "Created themed levels covering different aspects of culture and history",
        "Added social features like leaderboards to encourage friendly competition",
        "Designed offline mode for areas with limited connectivity",
      ],
      impact: [
        "Increased engagement with cultural content among youth",
        "Created a scalable platform for adding new historical content",
        "Received positive feedback from cultural preservation organizations",
        "Demonstrated how technology can support cultural education",
        "Built a community of young people interested in their heritage",
      ],
    },
  },
]
