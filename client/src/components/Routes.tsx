import EventsPage from "@/pages/events/EventsPage";
import IndexPage from "@/pages/index/IndexPage";
import React, { Suspense } from "react";
import { Route, Routes as ReactRouterRoutes } from "react-router-dom";
import RootLayout from "./layout/RootLayout";

const LazyUnsubscribePage = React.lazy(() => import("@/pages/UnsubscribePage"));
const LazyNotFoundPage = React.lazy(() => import("@/pages/NotFoundPage"));

const Routes = () => (
  <Suspense>
    <ReactRouterRoutes>
      <Route element={<RootLayout />}>
        <Route index element={<IndexPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/unsubscribe/:token" element={<LazyUnsubscribePage />} />
        <Route path="*" element={<LazyNotFoundPage />} />
      </Route>
    </ReactRouterRoutes>
  </Suspense>
);

export default Routes;
