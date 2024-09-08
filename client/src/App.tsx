import { Route, Routes } from "react-router-dom";
import MainWrapper from "./components/wrappers/MainWrapper";
import IndexPage from "./pages/main/IndexPage";

function App() {
  return (
    <Routes>
      <Route element={<MainWrapper />}>
        <Route index element={<IndexPage />} />
      </Route>
    </Routes>
  );
}

export default App;
