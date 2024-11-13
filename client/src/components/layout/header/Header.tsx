import { Link } from "react-router-dom";
import Logo from "../../../assets/logo.png";
import CampusSelect from "./CampusSelect";

const Header = () => {
  return (
    <header className="border-b-2 bg-white py-4">
      <div className="container flex items-center justify-between">
        <Link className="flex items-center gap-2" to="/">
          <img src={Logo} className="w-10" />
          <p className="gradient-text bg-primary-gradient invisible text-2xl font-medium sm:visible">
            Bull<span className="font-semibold text-primary">Food.</span>
          </p>
        </Link>

        <CampusSelect />
      </div>
    </header>
  );
};

export default Header;
