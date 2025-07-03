// Logo.jsx
import logoImag from "/logo.webp";
import { NavLink } from "react-router-dom";

const Logo = () => {
  return (
    <NavLink to="/" className="flex items-center">
      <img
        src={logoImag}
        className="h-14 w-auto max-w-[12rem] object-contain"
        alt="Logo"
      />
    </NavLink>
  );
};

export default Logo;
