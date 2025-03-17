import { Link } from "react-router-dom";
import { ReactNode } from "react";

interface NavbarItemProps {
  isSelected?: boolean;
  href?: string;
  children: ReactNode;
  onClick?: () => void;
}

export const NavbarItem = ({ isSelected, children, href }: NavbarItemProps) => {
  return (
    <Link to={href || ''}>
      <ul>
        <li
          className={
            "h-full px-4 py-2 transform active:scale-95 transition-transform duration-100" +
            (isSelected
              ? " font-semibold text-blue-regular border-b-primary border-b-2 border-blue-regular"
              : " font-medium text-lead-regular hover:text-blue-600")
          }
        >
          {children}
        </li>
      </ul>
    </Link>
  );
};
