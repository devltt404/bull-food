import Routes from "./components/Routes";
import ScrollToTop from "./components/wrappers/ScrollToTop";

function App() {
  return (
    <ScrollToTop>
      <Routes />
    </ScrollToTop>
  );
}

export default App;
