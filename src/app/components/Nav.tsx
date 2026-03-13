import { Link, useLocation } from "react-router";

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

function NavLink({ to, children, onMouseEnter, onMouseLeave }: NavLinkProps) {
  const { pathname } = useLocation();
  const isActive = pathname === to;

  return (
    <Link
      to={to}
      className={`relative flex flex-col items-center gap-[5px] transition-colors cursor-none ${
        isActive ? "text-black" : "hover:text-black"
      }`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
      <span
        className={`w-[3px] h-[3px] rounded-full bg-black transition-opacity duration-200 ${
          isActive ? "opacity-100" : "opacity-0"
        }`}
      />
    </Link>
  );
}

interface NavProps {
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export function Nav({ onMouseEnter, onMouseLeave }: NavProps) {
  return (
    <div className="capitalize flex items-center justify-between text-[#565656] text-[14px] tracking-[0.96px] w-full whitespace-nowrap">
      <div className="flex gap-[32px] items-center">
        <NavLink to="/" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
          Index
        </NavLink>
        <NavLink to="/about" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
          About
        </NavLink>
        <a
          href="#"
          className="pb-[8px] hover:text-black transition-colors cursor-none"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          Resume
        </a>
      </div>
      <p>english</p>
    </div>
  );
}
