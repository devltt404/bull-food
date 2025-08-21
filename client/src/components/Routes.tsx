import EventsPage from "@/pages/events/EventsPage";
import IndexPage from "@/pages/index/IndexPage";
import { AnimatePresence } from "framer-motion";
import React, { Suspense } from "react";
import {
  Routes as ReactRouterRoutes,
  Route,
  useLocation,
} from "react-router-dom";
import RootLayout from "./layout/RootLayout";

const LazyUnsubscribePage = React.lazy(() => import("@/pages/UnsubscribePage"));
const LazyNotFoundPage = React.lazy(() => import("@/pages/NotFoundPage"));

const Routes = () => {
  const location = useLocation();

  return (
    <Suspense>
      <AnimatePresence mode="wait">
        <ReactRouterRoutes location={location} key={location.pathname}>
          <Route element={<RootLayout />}>
            <Route index element={<IndexPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route
              path="/unsubscribe/:token"
              element={<LazyUnsubscribePage />}
            />
            <Route path="*" element={<LazyNotFoundPage />} />
          </Route>
        </ReactRouterRoutes>
      </AnimatePresence>
    </Suspense>
  );
};

export default Routes;
