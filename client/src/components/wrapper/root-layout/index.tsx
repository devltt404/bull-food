import { Outlet } from "react-router-dom";
import Header from "../../layout/header/index.tsx";

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
