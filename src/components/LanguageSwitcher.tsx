import { useState } from "react";
import { useTranslation } from "react-i18next";
import brazilFlag from "../assets/brasil.png";
import usaFlag from "../assets/eua.png";

const LanguageSwitcher = () => {
  const {
    i18n: { changeLanguage, language },
  } = useTranslation();
  
  const [lang, setLang] = useState(language);

  const handleChangeLanguage = () => {
    const newLanguage = lang === "en" ? "pt" : "en";
    changeLanguage(newLanguage);
    setLang(newLanguage);
  };

  return (
    <button onClick={handleChangeLanguage}>
      {lang === "en" ? (
        <img src={brazilFlag} alt="Brazil Flag" className="w-8 h-8 hover:scale-110" />
      ) : (
        <img src={usaFlag} alt="USA Flag" className="w-8 h-8 hover:scale-110" />
      )}
    </button>
  );
};

export default LanguageSwitcher;
