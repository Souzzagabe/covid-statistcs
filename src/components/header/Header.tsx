import { useTranslation } from "react-i18next";
import { useAppContext } from "../../contexts/useAppContext";
import { FaLightbulb } from "react-icons/fa";
import { BsLightbulbOffFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { FaVirusCovid } from "react-icons/fa6";
import LanguageSwitcher from "../../components/LanguageSwitcher";

const Header = () => {
  const { toggleTheme, theme } = useAppContext();
  const { t } = useTranslation();

  return (
    <div className="max-w-[1100px] mx-auto">
      <div className="flex justify-between items-center p-16 align-center">
        <div className="flex items-center">
          <Link
            to="/"
            className="text-red-500 text-4xl cursor-pointer transform transition duration-300 hover:scale-110 flex"
          >
            <FaVirusCovid />
          </Link>
          <h1
            className={`font-bold text-[32px] ml-4 hidden md:block ${
              theme === "dark" ? "text-white" : "text-black"
            }`}
          >
            {t("header")}
          </h1>
        </div>
        <div className="flex items-center">
          <LanguageSwitcher />
          <button className="ml-4" onClick={toggleTheme}>
            {theme === "dark" ? (
              <FaLightbulb
                size={32}
                className="text-lg transition duration-300 hover:scale-110 shadow-sm text-yellow-400"
              />
            ) : (
              <BsLightbulbOffFill
                size={32}
                className="text-yellow-400 text-lg transition duration-300 hover:scale-110"
              />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
