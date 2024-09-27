import { Outlet } from "react-router-dom";
import Header from "../layout/header/Header";

const RootLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default RootLayout;
