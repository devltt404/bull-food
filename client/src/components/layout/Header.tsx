import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header
      style={{ viewTransitionName: "site-header" }}
      className="border-b-2 bg-white py-3"
    >
      <div className="container flex items-center justify-between">
        <Link viewTransition className="flex items-center gap-2" to="/">
          <img src="/logo.webp" className="h-10 w-10" alt="BullFood logo" />
          <p className="font-display text-xl font-bold  text-primary">
            BullFood
          </p>
          <span className="sr-only">BullFood homepage</span>
        </Link>
      </div>
    </header>
  );
};

export default Header;
