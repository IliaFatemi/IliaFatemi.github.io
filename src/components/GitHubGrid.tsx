import { useEffect, useState } from "react";

type Repo = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
};
export default function GitHubGrid({
  username,
  count = 6,
}: {
  username: string;
  count?: number;
}) {
  const [repos, setRepos] = useState<Repo[]>([]);
  useEffect(() => {
    fetch(
      `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`
    )
      .then((r) => r.json())
      .then((data: Repo[]) => setRepos(data.slice(0, count)))
      .catch(() => setRepos([]));
  }, [username, count]);

  return (
    <section className="py-16">
      <h2 className="text-3xl md:text-4xl font-bold text-center">
        Latest on GitHub
      </h2>
      <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {repos.map((r) => (
          <a
            key={r.id}
            href={r.html_url}
            target="_blank"
            rel="noreferrer"
            className="glass rounded-xl p-4 block hover:translate-y-[-6px] transition"
          >
            <h3 className="font-semibold text-lg">{r.name}</h3>
            <p className="mt-1 text-sm text-white/70">
              {r.description ?? "No description"}
            </p>
          </a>
        ))}
      </div>
    </section>
  );
}
