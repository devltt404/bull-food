import React, { Suspense } from "react";
import { Route, Routes as ReactRouterRoutes } from "react-router-dom";
import RootLayout from "./layout/RootLayout";

const LazyIndexPage = React.lazy(() => import("@/pages/index/IndexPage"));
const LazyEventsPage = React.lazy(() => import("@/pages/events/EventsPage"));
const LazyUnsubscribePage = React.lazy(() => import("@/pages/UnsubscribePage"));
const LazyNotFoundPage = React.lazy(() => import("@/pages/NotFoundPage"));

const Routes = () => (
  <Suspense>
    <ReactRouterRoutes>
      <Route element={<RootLayout />}>
        <Route index element={<LazyIndexPage />} />
        <Route path="/events" element={<LazyEventsPage />} />
        <Route path="/unsubscribe/:token" element={<LazyUnsubscribePage />} />
        <Route path="*" element={<LazyNotFoundPage />} />
      </Route>
    </ReactRouterRoutes>
  </Suspense>
);

export default Routes;
