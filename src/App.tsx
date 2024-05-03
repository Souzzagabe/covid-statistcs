// App.tsx
import Header from "./components/header/Header";
import { useAppContext } from "./contexts/useAppContext";
import Footer from "./components/footer/Footer";
import Home from "./pages/Home";

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
        <Home/>
      <Footer />
    </div>
  );
}

export default App;
