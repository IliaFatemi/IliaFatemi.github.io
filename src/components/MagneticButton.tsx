import { useRef } from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  asLink?: string;
};

export default function MagneticButton({ asLink, children, ...rest }: Props) {
  const ref = useRef<HTMLButtonElement>(null);

  function onMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const mx = e.clientX - (rect.left + rect.width / 2);
    const my = e.clientY - (rect.top + rect.height / 2);
    el.style.transform = `translate(${mx * 0.1}px, ${my * 0.1}px)`;
  }
  function reset() {
    const el = ref.current;
    if (el) el.style.transform = "translate(0,0)";
  }

  const classes =
    "relative overflow-hidden rounded-xl px-5 py-3 font-semibold " +
    "bg-white text-black transition-transform will-change-transform";

  const Btn = (
    <button
      style={{ cursor: "pointer" }}
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className={classes}
      {...rest}
    >
      {children}
    </button>
  );
  return asLink ? (
    <a href={asLink} className="inline-block">
      {Btn}
    </a>
  ) : (
    Btn
  );
}
