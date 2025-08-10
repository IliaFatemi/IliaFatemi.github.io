export type SkillGroup = {
  title: string;
  skills: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Languages & Frameworks",
    skills: [
      "TypeScript", "JavaScript", "Python", "Java", "C/C++",
      "Kotlin", "SQL", "Angular", "Node.js", "Express.js",
      "HTML", "CSS"
    ],
  },
  {
    title: "Data & ML",
    skills: ["NumPy", "Pandas", "scikit-learn"],
  },
  {
    title: "Databases",
    skills: ["PostgreSQL"],
  },
  {
    title: "Cloud & Infra",
    skills: ["Azure", "GCP", "Docker", "Linux", "IIS", "Apache"],
  },
  {
    title: "Build & Tooling",
    skills: ["Git", "CMake"],
  },
];
