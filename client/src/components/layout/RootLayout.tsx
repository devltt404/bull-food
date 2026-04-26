import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header.tsx";

const LazyChatWidget = React.lazy(
  () => import("@/components/chat/ChatWidget.tsx"),
);

const RootLayout = () => {
  return (
    <>
      <Header />
      <main className="bg-background">
        <Outlet />
      </main>
      <Suspense>
        <LazyChatWidget />
      </Suspense>
    </>
  );
};

export default RootLayout;
