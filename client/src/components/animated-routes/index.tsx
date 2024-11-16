import EventsPage from "@/pages/main/events-page";
import IndexPage from "@/pages/main/index-page";
import UnsubscribePage from "@/pages/main/unsubscribe-page";
import NotFoundPage from "@/pages/not-found-page";
import { AnimatePresence } from "framer-motion";
import { Route, Routes, useLocation } from "react-router-dom";
import RootLayout from "../wrapper/root-layout";

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route element={<RootLayout />}>
          <Route index element={<IndexPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/unsubscribe/:token" element={<UnsubscribePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
