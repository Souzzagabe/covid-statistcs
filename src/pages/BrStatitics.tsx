import { useQuery } from "react-query";
import axios from "axios";
import { useState } from "react";
import { BsFillRocketFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export type StateData = {
  uid: number;
  uf: string;
  state: string;
  cases: number;
  deaths: number;
  suspects: number;
  refuses: number;
  broadcast: boolean;
  comments: string;
  datetime: string;
};

function BrStatistics() {
  const { t } = useTranslation(["translation", "brStatistics"]); // Adicionando o namespace "brStatistics"
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { data, isLoading, isError } = useQuery<StateData[]>(
    "stateData",
    async () => {
      try {
        const response = await axios.get<any>(
          "https://covid19-brazil-api.now.sh/api/report/v1"
        );
        return response.data?.data || [];
      } catch (error) {
        console.error("Error fetching data:", error);
        return [];
      }
    },
    {
      staleTime: 60000,
    }
  );

  const filteredData = data?.filter((state) =>
    state.state.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-2 md:p-20 flex-col relative">
      <div className="max-w-4xl w-full md:w-90 bg-white rounded shadow-2xl p-8 md:p-20 border-2 border-gray-400">
        <div className="md:hidden">
          <h1 className="text-lg font-bold mb-8 text-center text-gray-900">
            {t("brStatistics.header")}
          </h1>
        </div>
        <div className="flex justify-center mb-4">
          <input
            type="text"
            placeholder={t("searchPlaceholder2")}
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300 w-[500px] shadow-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <p className="text-sm italic text-gray-400 mb-4 text-center">
          {t("searchInfo")}
        </p>
        <Link to="/">
          <p className="text-sm italic text-gray-400 mb-4 text-center underline font-semibold">
            {t("brStatisticsLink2")}
          </p>
        </Link>
        {isLoading && <p className="font-bold text-center">{t("brStatistics.loading")}</p>}
        {isError && (
          <p className="font-bold text-center text-red-600">{t("brStatistics.error")}</p>
        )}
        {filteredData && filteredData.length === 0 && (
          <p className="font-bold text-center text-red-600">
            {t("brStatistics.noResults", { searchTerm })}
          </p>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredData?.map((state) => (
            <div
              key={state.uf}
              className="border border-gray-300 rounded-lg p-4 flex flex-col shadow-md"
            >
              <h2 className="text-xl font-bold mt-4 mb-2 text-center">
                {state.uf} - {state.state}
              </h2>
              <p className="text-gray-600 font-bold text-center">
                {t("totalCases")}: {state.cases}
              </p>
              <p className="text-black font-bold text-center">
                {t("totalDeaths")}: {state.deaths}
              </p>
              <p className="text-red-500 font-bold text-center">
                {t("totalCriticalCases")}: {state.suspects}
              </p>
              <p className="text-blue-500 font-bold text-center">
                {t("totalRecovered")}: {state.refuses}
              </p>
            </div>
          ))}
        </div>
      </div>
      <button
        className="fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg"
        onClick={scrollToTop}
      >
        <BsFillRocketFill size={24} />
      </button>
    </div>
  );
}

export default BrStatistics;
