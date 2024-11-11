import EventsPage from "@/pages/main/EventsPage";
import IndexPage from "@/pages/main/IndexPage";
import UnsubscribePage from "@/pages/main/UnsubscribePage";
import NotFoundPage from "@/pages/NotFoundPage";
import { AnimatePresence } from "framer-motion";
import { Route, Routes, useLocation } from "react-router-dom";
import RootLayout from "./wrappers/RootLayout";

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
