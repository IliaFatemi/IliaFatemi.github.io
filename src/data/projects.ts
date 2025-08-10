export type Project = {
  slug: string;
  title: string;
  category: "Full-stack" | "Frontend" | "Backend" | "Other";
  desc: string;
  tags: readonly string[];
  link: string;      // GitHub or live
  img: string;       // cover
};

export const projects: readonly Project[] = [
  {
    slug: "pocketpass",
    title: "PocketPass",
    category: "Full-stack",
    desc: "Password manager with Flask API (20+ endpoints), Angular UI, pytest coverage.",
    tags: ["Flask", "Angular", "PostgreSQL", "Azure"],
    link: "https://pocket-pass.azurewebsites.net/",
    img: "https://pocket-pass.azurewebsites.net/assets/pocketpass_logo_orange.svg"
  },
  {
    slug: "PrisonEscape",
    title: "Prison Escape",
    category: "Full-stack",
    desc: "2D Game created in Java and managed with Apache Maven. ",
    tags: ["Java", "JUnit", "Apache Maven"],
    link: "https://github.com/IliaFatemi/Prison-Escape",
    img: "https://raw.githubusercontent.com/IliaFatemi/Prison-Escape/refs/heads/master/Prison_Escape/src/main/resources/menu/backgroundMenuImg2.png"
  },
  {
    slug: "BeerIQ",
    title: "BeerIQ",
    category: "Full-stack",
    desc: "A beer locator made with Android Studios using Kotlin.",
    tags: ["Kotlin", "Android Studios"],
    link: "https://github.com/vincenteab/BeerIQ",
    img: "https://raw.githubusercontent.com/vincenteab/BeerIQ/refs/heads/main/app/src/main/ic_launcher-playstore.png"
  },
  {
    slug: "sbig",
    title: "So Bad It’s Good",
    category: "Full-stack",
    desc: "Movie review app; Node.js + PostgreSQL; fun ranking & search for bad movies.",
    tags: ["Node", "PostgreSQL", "Angular", "GCP"],
    link: "https://github.com/IliaFatemi/SoBadItsGood-WebApp",
    img: "https://raw.githubusercontent.com/IliaFatemi/SoBadItsGood-WebApp/refs/heads/master/sobaditsgood/src/assets/weblogo.png"
  }
] as const;
