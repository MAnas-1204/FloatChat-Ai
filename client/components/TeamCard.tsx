import { Github, Linkedin } from "lucide-react";

export default function TeamCard({
  name,
  role,
  img,
  linkedin,
  github,
}: {
  name: string;
  role: string;
  img: string;
  linkedin: string;
  github: string;
}) {
  return (
    <div className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur transition hover:border-brand-cyan/50 hover:bg-white/10">
      <img src={img} alt={name} className="h-28 w-28 rounded-2xl object-cover ring-2 ring-white/20" />
      <h3 className="mt-4 text-base font-semibold tracking-tight">{name}</h3>
      <p className="text-sm text-foreground/70">{role}</p>
      <div className="mt-3 flex items-center gap-3 text-foreground/70">
        <a href={linkedin} target="_blank" rel="noreferrer" className="hover:text-foreground">
          <Linkedin className="h-5 w-5" />
        </a>
        <a href={github} target="_blank" rel="noreferrer" className="hover:text-foreground">
          <Github className="h-5 w-5" />
        </a>
      </div>
    </div>
  );
}
