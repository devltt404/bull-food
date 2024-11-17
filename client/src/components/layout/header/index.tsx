import { Link } from "react-router-dom";
import Logo from "../../../assets/logo.webp";
import CampusSelect from "../../campus-select";

const Header = () => {
  return (
    <header className="border-b-2 bg-white py-4">
      <div className="container flex items-center justify-between">
        <Link className="flex items-center gap-2" to="/">
          <img src={Logo} alt="BullFood logo" />
          <p className="gradient-text invisible bg-primary-gradient text-2xl font-medium sm:visible">
            Bull<span className="font-semibold text-primary">Food.</span>
          </p>
          <span className="sr-only">BullFood homepage</span>
        </Link>

        <CampusSelect />
      </div>
    </header>
  );
};

export default Header;
