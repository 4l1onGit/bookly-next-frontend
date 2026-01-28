import NavAuth from "./nav-auth.component";
import NavBody from "./nav-body.component";
import NavLogo from "./nav-logo.component";
import NavMobileMenu from "./nav-mobile-menu.component";

const Nav = () => {
  return (
    <nav className="flex justify-between h-16 items-center border-b mb-8">
      <NavLogo />
      <NavBody />
      <NavAuth />
      <NavMobileMenu />
    </nav>
  );
};

export default Nav;
