import { AnimatePresence } from "framer-motion";
import React, { Suspense } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import RootLayout from "../wrapper/root-layout";

import EventsPage from "@/pages/main/events-page";
import IndexPage from "@/pages/main/index-page";
const LazyUnsubscribePage = React.lazy(
  () => import("@/pages/main/unsubscribe-page"),
);
const LazyNotFoundPage = React.lazy(() => import("@/pages/not-found-page"));

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <Suspense>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route element={<RootLayout />}>
            <Route index element={<IndexPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route
              path="/unsubscribe/:token"
              element={<LazyUnsubscribePage />}
            />
            <Route path="*" element={<LazyNotFoundPage />} />
          </Route>
        </Routes>
      </AnimatePresence>
    </Suspense>
  );
};

export default AnimatedRoutes;
