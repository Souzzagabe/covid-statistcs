import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { BsFillRocketFill } from "react-icons/bs";
import { CardData } from "../components/types/types";
import Card from "../utils/Card";
import {
  fetchBrStatistics,
  fetchWorldStatistics,
} from "../services/fetchCovidService";
import { CircularProgress } from "@mui/material";

function Home() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [data, setData] = useState<CardData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [locale, setLocale] = useState<string>("br");
  const [searchInfo, setSearchInfo] = useState<string>("searchInfo2");

  useEffect(() => {
    const fetchData = async (locale: string) => {
      setIsLoading(true);
      setIsError(false);
      try {
        const response = locale === "br" ? await fetchBrStatistics() : await fetchWorldStatistics();
        setData(response);
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
      setSearchInfo(locale === "br" ? "searchInfo2" : "searchInfo");
    };
  
    fetchData(locale);
  }, [locale]);
  

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-1 md:p-20 relative">
      <div className="max-w-4xl w-full md:w-90 px-8 pt-20 md:px-20 bg-gray-100 rounded-t-lg pb-0">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-900 md:hidden">
          {t("header")}
        </h1>
        <div className="flex justify-center mb-8">
          <input
            type="text"
            placeholder={t("searchPlaceholder")}
            className="border border-gray-300 rounded-md p-4 focus:outline-none focus:ring focus:border-blue-300 w-full md:w-[500px] shadow-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <p className="text-sm italic text-gray-600 mb-4 text-center">
          {t(searchInfo)}
        </p>
        <div className="flex justify-center space-x-4 mb-8">
          <button
            onClick={() => setLocale("br")}
            className={`${
              locale === "br" ? "bg-blue-500" : "bg-gray-300"
            } text-white px-8 py-4 rounded-md flex-grow text-lg font-medium focus:outline-none focus:ring focus:border-blue-300 shadow-lg transition-colors duration-300 hover:bg-blue-600`}
          >
            {t("states")}
          </button>
          <button
            onClick={() => setLocale("world")}
            className={`${
              locale === "world" ? "bg-blue-500" : "bg-gray-300"
            } text-white px-8 py-4 rounded-md flex-grow text-lg font-medium focus:outline-none focus:ring focus:border-blue-300 shadow transition-colors duration-300 hover:bg-blue-600`}
          >
            {t("country")}
          </button>
        </div>
      </div>

      <div className="max-w-4xl w-full md:w-90 bg-gray-100 rounded-b-lg p-8 md:p-20">
        {isLoading ? (
          <div className="flex justify-center items-center h-[400px]">
            <CircularProgress />
          </div>
        ) : isError ? (
          <p className="font-bold text-center text-red-600">{t("error")}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {data.map((item) => (
              <div className="mt-0" key={item.country}>
                <Card data={item} />
              </div>
            ))}
          </div>
        )}
      </div>
      <button
        className="fixed bottom-4 right-4 bg-blue-500 text-white p-3 rounded-full shadow-lg focus:outline-none focus:ring focus:border-blue-300 duration-300 hover:scale-110 flex"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <BsFillRocketFill size={24} />
      </button>
    </div>
  );
}

export default Home;