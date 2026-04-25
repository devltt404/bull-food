import ChatWidget from "@/components/chat/ChatWidget.tsx";
import { Outlet } from "react-router-dom";
import Header from "./Header.tsx";

const RootLayout = () => {
  return (
    <>
      <Header />
      <main className="bg-background">
        <Outlet />
      </main>
      <ChatWidget />
    </>
  );
};

export default RootLayout;
