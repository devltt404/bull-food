import { Link } from "react-router-dom";
import Logo from "../../../assets/logo.png";
import { Button } from "../../ui/button";
import { Separator } from "../../ui/separator";
import CampusSelect from "./CampusSelect";

const Header = () => {
  return (
    <header className="bg-primary/10 py-4">
      <div className="flex items-center justify-between px-20">
        {/* Logo */}
        <Link className="flex items-center gap-2" to="/">
          <img src={Logo} className="w-10" />
          <p className="text-2xl font-medium tracking-wide">
            Bull<span className="font-semibold text-primary">Food.</span>
          </p>
        </Link>

        <div className="flex items-center">
          <nav className="self-stretch">
            <ul className="flex h-full font-semibold">
              <li>
                <Link
                  to="/events"
                  className="inline-flex h-full items-center px-4 transition-colors hover:text-primary"
                >
                  Events
                </Link>
              </li>

              <li>
                <Link
                  to="/about"
                  className="inline-flex h-full items-center px-4 transition-colors hover:text-primary"
                >
                  About
                </Link>
              </li>
            </ul>
          </nav>

          <Separator orientation="vertical" className="mr-8 ms-4 h-8" />

          <CampusSelect />

          <Separator orientation="vertical" className="mx-8 h-8" />

          <Button size="lg">Sign Up</Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
