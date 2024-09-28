import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import Logo from "../../../assets/logo.png";
import CampusSelect from "./CampusSelect";

const Header = () => {
  const { pathname } = useLocation();
  const isIndexPage = pathname === "/";

  return (
    <header
      className={cn(
        "py-4 transition",
        isIndexPage ? "bg-primary/10" : "border-b bg-white shadow-sm",
      )}
    >
      <div className="container flex items-center justify-between">
        {/* Logo */}
        <Link className="flex items-center gap-2" to="/">
          <img src={Logo} className="w-10" />
          <p className="invisible text-2xl font-medium tracking-wide sm:visible">
            Bull<span className="font-semibold text-primary">Food.</span>
          </p>
        </Link>

        <div className="flex items-center">
          {/* TODO: Implement nav */}
          {/* <nav className="self-stretch">
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
          </nav> */}

          {/* <Separator orientation="vertical" className="mr-8 ms-4 h-8" /> */}

          <CampusSelect />

          {/* <Separator orientation="vertical" className="mx-8 h-8" />
          <Button size="lg">Subscribe</Button> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
