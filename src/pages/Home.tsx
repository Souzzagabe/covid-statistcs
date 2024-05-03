// Home.tsx
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { BsFillRocketFill } from "react-icons/bs";
import { CardData } from "../components/types/types";
import Card from "./Card";
import {
  fetchBrStatistics,
  fetchWorldStatistics,
} from "../services/fetchCovidService";

function Home() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [data, setData] = useState<CardData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const fetchData = async (type: "br" | "world") => {
    setIsLoading(true);
    setIsError(false);
    try {
      let response;
      if (type === "br") {
        response = await fetchBrStatistics();
      } else if (type === "world") {
        response = await fetchWorldStatistics();
      }
      console.log("Data received:", response);
      setData(response);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsError(true);
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-2 md:p-20 flex-col relative">
      <div className="max-w-4xl w-full md:w-90 bg-white rounded shadow-2xl p-8 md:p-20 border-2 border-gray-400">
        <div className="md:hidden">
          <h1 className="text-lg font-bold mb-8 text-center text-gray-900">
            {t("header")}
          </h1>
        </div>

        <div className="flex justify-center mb-4">
          <input
            type="text"
            placeholder={t("searchPlaceholder")}
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300 w-[500px] shadow-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <p className="text-sm italic text-gray-400 mb-4 text-center">
          {t("searchInfo")}
        </p>
        <button
          onClick={() => fetchData("br")}
          className="bg-blue-500 text-white px-4 py-2 rounded-md mb-2 mr-2"
        >
          {t("estados")}
        </button>
        <button
          onClick={() => fetchData("world")}
          className="bg-blue-500 text-white px-4 py-2 rounded-md mb-2"
        >
          {t("país")}
        </button>
        {isLoading && <p className="font-bold text-center">{t("loading")}</p>}
        {isError && (
          <p className="font-bold text-center text-red-600">{t("error")}</p>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data?.map((item) => {
            console.log("Country data:", item);
            return <Card key={item.country} data={item} />;
          })}
        </div>
      </div>
      <button
        className="fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <BsFillRocketFill size={24} />
      </button>
    </div>
  );
}

export default Home;
