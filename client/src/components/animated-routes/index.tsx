import { AnimatePresence } from "framer-motion";
import React, { Suspense } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import RootLayout from "../wrapper/root-layout";

const IndexPage = React.lazy(() => import("@/pages/main/index-page"));
const EventsPage = React.lazy(() => import("@/pages/main/events-page"));
const UnsubscribePage = React.lazy(
  () => import("@/pages/main/unsubscribe-page"),
);
const NotFoundPage = React.lazy(() => import("@/pages/not-found-page"));

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <Suspense>
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
    </Suspense>
  );
};

export default AnimatedRoutes;
