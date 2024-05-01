// App.tsx
import { Route, Routes } from "react-router-dom";
import Statistics from "./pages/Statistics";
import Header from "./components/header/Header";
import { useAppContext } from "./contexts/useAppContext";
import Footer from "./components/footer/Footer";
import BrStatistics from "./pages/BrStatitics";

function App() {
  const { theme } = useAppContext();

  return (
    <div
      className={`app ${
        theme === "dark"
          ? "bg-gray-900 text-gray-900"
          : " bg-white text-gray-900"
      }`}
    >
      <Header />
      <Routes>
        <Route path="/" element={<Statistics />} />
        <Route path="/br" element={<BrStatistics />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
