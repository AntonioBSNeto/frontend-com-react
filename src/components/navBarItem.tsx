import { Link } from "react-router-dom";

interface NavbarItemProps {
  isSelected?: boolean;
  href?: string;
  children: string;
  onClick?: () => void;
}

export const NavbarItem = ({ isSelected, children, href }: NavbarItemProps) => {
  return (
    <Link to={href || ''}>
      <ul>
        <li
          className={
            "h-full px-4 py-2" +
            (isSelected
              ? " font-semibold text-blue-regular border-b-primary border-b-2 border-blue-regular"
              : " font-medium text-lead-regular")
          }
        >
          {children}
        </li>
      </ul>
    </Link>
  );
};
