import { Outlet } from "react-router-dom";
import Header from "../layout/header/Header";

const MainWrapper = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default MainWrapper;
