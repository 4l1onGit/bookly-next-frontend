import NavBody from "./nav-body.component";
import NavLogo from "./nav-logo.component";

const Nav = () => {
  return (
    <nav className="flex justify-between h-16 items-center border-b mb-8">
      <NavLogo />
      <NavBody />
      <div className="w-1/4"></div>
    </nav>
  );
};

export default Nav;
