import { motion } from "motion/react";
import { Link, useLocation } from "react-router";

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
      className={`relative flex flex-col items-center gap-[5px] transition-colors cursor-none ${
        isActive ? "text-black" : "hover:text-black"
      }`}
    >
      {children}
      {/* Placeholder mantém altura constante; dot animado com layoutId */}
      <div className="h-[3px] w-[3px] flex items-center justify-center">
        {isActive && (
          <motion.span
            layoutId="nav-dot"
            className="block w-[3px] h-[3px] rounded-full bg-black"
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          />
        )}
      </div>
    </Link>
  );
}

export function Nav() {
  return (
    <div className="capitalize flex items-center justify-between text-[#565656] text-[14px] tracking-[0.96px] w-full whitespace-nowrap">
      <div className="flex gap-[32px] items-center">
        <NavLink to="/">Meu trabalho</NavLink>
        <NavLink to="/about">Sobre o Vitor</NavLink>
        {/* <a href="https://1drv.ms/b/c/f371275e835eed50/IQCHdKYOzbHGQImj6c6bh2IhAdRqBQvD9ZRAznrUv9IhHtE?e=sbhKse" className="pb-[8px] hover:text-black transition-colors cursor-none" target="_blank" rel="noopener noreferrer">
          Resume
        </a> */}
      </div>
      <p>english</p>
    </div>
  );
}
