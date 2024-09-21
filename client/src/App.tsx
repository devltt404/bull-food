import { Route, Routes } from "react-router-dom";
import MainWrapper from "./components/wrappers/MainWrapper";
import EventsPage from "./pages/main/EventsPage";
import IndexPage from "./pages/main/IndexPage";

function App() {
  return (
    <Routes>
      <Route element={<MainWrapper />}>
        <Route index element={<IndexPage />} />
        <Route path="/events" element={<EventsPage />} />
      </Route>
    </Routes>
  );
}

export default App;
