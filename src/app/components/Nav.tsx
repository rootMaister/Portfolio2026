import { motion } from "motion/react";
import { Link, useLocation } from "react-router";
import { useLang } from "../../context/LanguageContext";
import { t } from "../../data/translations";

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
}

function NavLink({ to, children }: NavLinkProps) {
  const { pathname } = useLocation();
  const isActive = pathname === to;

  return (
    <Link
      to={to}
      className={`relative flex flex-col items-center gap-[5px] transition-opacity cursor-none text-white ${
        isActive ? "opacity-100" : "opacity-70 hover:opacity-100"
      }`}
    >
      {children}
      <div className="h-[3px] w-[3px] flex items-center justify-center">
        {isActive && (
          <motion.span
            layoutId="nav-dot"
            className="block w-[3px] h-[3px] rounded-full bg-white"
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          />
        )}
      </div>
    </Link>
  );
}

export function Nav() {
  const { lang, toggle } = useLang();
  const tr = t[lang].nav;

  return (
    <div className="flex items-center justify-between text-white text-[14px] tracking-[0.96px] w-full whitespace-nowrap">
      <div className="flex gap-[32px] items-center">
        <NavLink to="/">{tr.work}</NavLink>
        <NavLink to="/about">{tr.about}</NavLink>
      </div>
      <button
        onClick={toggle}
        className="cursor-none opacity-70 hover:opacity-100 transition-opacity"
      >
        {tr.lang}
      </button>
    </div>
  );
}
