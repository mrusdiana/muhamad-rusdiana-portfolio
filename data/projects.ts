export type Project = {
  slug: string;
  number: string;
  name: string;
  type: string;
  description: string;
  overview: string[];
  highlights: { title: string; description: string }[];
  image: string | null;
  href: string | null;
  github: string | null;
  demoId: string | null;
  cardStack: string[];
  stack: string[];
  gallery: string[];
};

export const projects: Project[] = [
  {
    slug: "dolan",
    number: "01",
    name: "Dolan",
    type: "Social Travel & Trip Companion",
    description: "A mobile-first travel platform for discovering destinations, planning trips and budgets, and connecting with compatible travel companions.",
    overview: [
      "Dolan brings destination discovery, trip planning, and traveler connections into one responsive web app. People can explore places across Indonesia, build a route and budget, and find companions whose plans fit their own.",
      "I built the Next.js interface for destination discovery, trip details, itineraries, profiles, and social activity. The frontend uses a backend-for-frontend layer with secure cookie-based authentication, while an Express service handles the underlying application data.",
      "Planning combines Google Places and Groq to suggest destinations and produce an itinerary with reusable trip templates, route planning, personalized recommendations, and estimated costs. Public trip discussions, join approvals, group chat, follow relationships, and post-trip reviews turn a plan into a shared journey.",
    ],
    highlights: [
      { title: "Plan the full trip", description: "Search destinations, inspect trip details, build routes, reuse templates, and estimate travel budgets in one flow." },
      { title: "Travel together", description: "Public discussions and join approvals connect travelers; Socket.IO supports real-time group chat." },
      { title: "Keep data reliable", description: "Shared Zod schemas and PostgreSQL unique constraints guard against duplicate memberships, follows, and reviews." },
    ],
    image: "/dolan/LandingPage(before login).png",
    href: "https://app.dolanan.my.id/",
    github: "https://github.com/Dolan-Project/dolan-repo.git",
    demoId: "iN1FUvy-vjo",
    cardStack: ["Next.js", "TypeScript", "Express", "PostgreSQL", "Socket.IO"],
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Express", "PostgreSQL", "Sequelize", "Socket.IO", "Zod", "Groq", "Google Places API", "REST API"],
    gallery: [
      "/dolan/LandingPage(before login).png",
      "/dolan/Detail Provinsi.png",
      "/dolan/Detail Provinsi 2.png",
      "/dolan/Homepage(After login).png",
      "/dolan/Jelajah.png",
      "/dolan/Generate Result.png",
      "/dolan/Trip saya.png",
      "/dolan/Room chat.png",
      "/dolan/Detail Trip.png",
      "/dolan/Detail Trip 2.png",
      "/dolan/Profile.png",
    ],
  },
  {
    slug: "berybox",
    number: "02",
    name: "BeryBox",
    type: "Community Reuse Platform",
    description: "A community platform that enables people and organizations to donate, claim, and barter usable goods nearby.",
    overview: [
      "BeryBox helps usable goods find a new home. Individuals and organizations can list items, discover nearby offers, arrange donations or barter, and coordinate the exchange through a real-time inbox.",
      "I built the React user app and a separate admin CMS with Vite, Tailwind CSS, and Redux Toolkit. The experience covers listing and discovery, organization verification, map-based browsing, login, claims, courier checkout, tracking, reviews, and barter credits.",
      "I extended the existing Express and Sequelize API with Gemini/Groq assistance for BeryBot and barter matching. ImageKit handles uploads, Socket.IO powers chat and notifications, Midtrans Snap supports paid courier checkout, and the deployed client/CMS and API run on Vercel and AWS EC2 respectively. The API work was backed by Jest and Supertest coverage above 90%.",
    ],
    highlights: [
      { title: "Give, claim, or barter", description: "A single platform covers donation approvals, pickup or courier arrangements, barter settlement, and reviews." },
      { title: "Find the right match", description: "Leaflet maps and AI-assisted matching help people find relevant items and nearby organizations." },
      { title: "Coordinate in real time", description: "Socket.IO messaging and notifications keep both sides informed through the exchange." },
    ],
    image: "/berybox/Landingpage1.png",
    href: "https://berybox.web.id/",
    github: "https://github.com/mrusdiana/berybox.git",
    demoId: "fGVI3XwgQmc",
    cardStack: ["React", "Express", "PostgreSQL", "Socket.IO", "Gemini API"],
    stack: ["React", "Vite", "Tailwind CSS", "Redux Toolkit", "Express", "Sequelize", "PostgreSQL", "Socket.IO", "REST API", "JWT", "Google OAuth", "Gemini API", "Groq", "Midtrans", "ImageKit", "Leaflet", "AWS EC2", "Vercel", "Jest", "Supertest"],
    gallery: [
      "/berybox/Landingpage1.png",
      "/berybox/Landingpage2.png",
      "/berybox/Landingpage3.png",
      "/berybox/Landingpage4.png",
      "/berybox/Homepage.png",
      "/berybox/OrganizationPage.png",
      "/berybox/BarterPage.png",
      "/berybox/MessagePage.png",
      "/berybox/ActivityPage.png",
      "/berybox/ProfilePage.png",
      "/berybox/LoginPage.png",
    ],
  },
  {
    slug: "renaiflix",
    number: "03",
    name: "RenAiFlix",
    type: "AI Movie Recommendation",
    description: "An AI-powered movie platform helping couples and friends discover films through shared genre matching.",
    overview: [
      "RenAiFlix makes choosing a movie together less of a negotiation. Viewers can browse a searchable catalog, filter by genre, save films to a personal watchlist, and track what they have watched.",
      "I built the React, Vite, Tailwind CSS, and Redux Toolkit interface alongside an Express API that proxies TMDB for movie catalogs, details, and trailers. A Gemini-powered matcher combines two people's genre preferences and returns five shared recommendations enriched with TMDB information.",
      "The free matcher has daily usage limits; Premium unlocks unlimited matching through Midtrans Snap and payment verification. JWT and Google login protect accounts, while owner-scoped watchlist CRUD, bcrypt password hashing, and PostgreSQL unique indexes protect personal data. The project includes more than 130 Jest and Supertest tests with over 90% coverage.",
    ],
    highlights: [
      { title: "Discover together", description: "The AI matcher turns two genre choices into five movie recommendations with supporting catalog details." },
      { title: "Keep a personal watchlist", description: "Search, filters, viewing status, and owner-protected CRUD make the catalog useful beyond one visit." },
      { title: "Unlock Premium", description: "Midtrans Snap checkout and payment verification lift the daily AI-matching limit." },
    ],
    image: "/renaiflix/Homepage_RenAiFlix.png",
    href: "https://renaiflix.my.id/",
    github: "https://github.com/mrusdiana/renaiflix.git",
    demoId: "kHW6WYm2i4E",
    cardStack: ["React", "Express", "PostgreSQL", "Gemini API", "Midtrans"],
    stack: ["React", "Vite", "Tailwind CSS", "Redux Toolkit", "Express", "Sequelize", "PostgreSQL", "REST API", "JWT", "Google OAuth", "bcryptjs", "TMDB API", "Gemini API", "Midtrans", "Jest", "Supertest", "Vercel"],
    gallery: [
      "/renaiflix/Homepage_RenAiFlix.png",
      "/renaiflix/Homepage2_RenAiFlix.png",
      "/renaiflix/Movies_RenAiFlix.png",
      "/renaiflix/AiMatcher_RenAiFlix.png",
      "/renaiflix/Premium_RenAiFlix.png",
      "/renaiflix/Profile_RenAiFlix.png",
    ],
  },
  {
    slug: "mimoo",
    number: "04",
    name: "Mimoo",
    type: "Catalog & Wishlist App",
    description: "A responsive ice cream catalog with search, category filters, infinite scrolling, and personalized wishlists.",
    overview: [
      "Mimoo is a playful catalog for discovering ice cream flavors. Visitors can search and filter products, explore galleries and details, and save favorites to a personal wishlist.",
      "I built the server-rendered experience with Next.js and TypeScript, including dynamic metadata and Open Graph tags so each product has a useful preview when shared. Debounced search, category filtering, infinite scrolling, and MongoDB pagination keep a growing catalog easy to browse.",
      "JWT-based authentication and bcrypt password hashing protect accounts and wishlists. Zod validates incoming data, while MongoDB unique indexes prevent duplicate users and wishlist entries.",
    ],
    highlights: [
      { title: "Browse without friction", description: "Debounced search, categories, and infinite scrolling reveal flavors without overwhelming the page." },
      { title: "Save what you love", description: "Authenticated wishlists keep favorite products tied to each account." },
      { title: "Share a flavor", description: "Product-specific metadata and Open Graph previews make individual flavors easy to share." },
    ],
    image: "/mimoo/HomePage.png",
    href: "https://mimoo-zeta.vercel.app/",
    github: "https://github.com/mrusdiana/mimoo.git ",
    demoId: "izFLo3j5xzU",
    cardStack: ["Next.js", "TypeScript", "MongoDB", "Zod", "Motion"],
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "MongoDB", "JWT", "bcryptjs", "Zod", "Motion", "REST API"],
    gallery: [
      "/mimoo/HomePage.png",
      "/mimoo/section 1.png",
      "/mimoo/section 2.png",
      "/mimoo/menu 1.png",
      "/mimoo/menu 2.png",
      "/mimoo/detail.png",
      "/mimoo/wishlist.png",
    ],
  },
  {
    slug: "hacktivo",
    number: "05",
    name: "Hacktivo",
    type: "Social Media Mobile App",
    description: "An Instagram-inspired mobile application with social feeds and a GraphQL data layer, supported by Redis caching.",
    overview: [
      "Hacktivo explores the familiar rhythm of a social feed in a mobile-first app. It brings an Instagram-inspired interface to React Native and Expo, with GraphQL as the data layer and Redis for caching.",
      "Apollo Client connects the mobile experience to the GraphQL service, while Redis supports repeated data reads behind the social experience.",
    ],
    highlights: [
      { title: "Mobile-first interface", description: "React Native and Expo provide the app shell and social-feed presentation." },
      { title: "Structured data access", description: "GraphQL and Apollo Client organize the app's requests around the data each screen needs." },
      { title: "Faster repeat reads", description: "Redis supports caching behind the social experience." },
    ],
    image: "/hacktivo/login.PNG",
    href: "https://expo.dev/preview/update?message=Upgrade+to+Expo+SDK+57&updateRuntimeVersion=1.0.0&createdAt=2026-09-21T06%3A09%3A26.830Z&slug=exp&projectId=1c8ec54d-a0bf-46b3-b744-8fdd3c00739f&group=b7737b39-4dda-4c2e-b7c4-6f9e667c060c",
    github: "https://github.com/mrusdiana/hacktivo.git",
    demoId: "-5UByp899KU",
    cardStack: ["React Native", "Expo", "Apollo Client", "GraphQL", "Redis"],
    stack: ["React Native", "Expo", "Apollo Client", "GraphQL", "Redis"],
    gallery: [
      "/hacktivo/login.PNG",
      "/hacktivo/Beranda.PNG",
      "/hacktivo/Search User.PNG",
      "/hacktivo/profile.PNG",
      "/hacktivo/Add.PNG",
      "/hacktivo/comment.PNG",
      "/hacktivo/followers.PNG",
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
