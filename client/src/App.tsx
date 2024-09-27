import AnimatedRoutes from "./components/AnimatedRoutes";
import ScrollToTop from "./components/wrappers/ScrollToTop";

function App() {
  return (
    <ScrollToTop>
      <AnimatedRoutes />
    </ScrollToTop>
  );
}

export default App;
