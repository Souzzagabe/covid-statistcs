import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { fetchBrStatistics, fetchWorldStatistics } from "../services/fetchCovidService";
import { CardData } from "../components/types/types";

interface Props {
  locale: string;
  onDataFound: (data: CardData[]) => void;
}

const Search: React.FC<Props> = ({ locale, onDataFound }) => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(false);

  const handleSearch = async () => {
    setError(false);
    try {
      let response;
      if (locale === "br") {
        response = await fetchBrStatistics();
      } else if (locale === "world") {
        response = await fetchWorldStatistics();
      }

      const filteredData = response.filter((item: CardData) =>
        item.country.toLowerCase().includes(searchTerm.toLowerCase())
      );

      if (filteredData.length === 0) {
        setError(true);
      } else {
        onDataFound(filteredData);
      }
    } catch (error) {
      setError(true);
    }
  };

  return (
    <div className="flex justify-center mb-8">
      <input
        type="text"
        placeholder={t("searchPlaceholder")}
        className="border border-gray-300 rounded-md p-4 focus:outline-none focus:ring focus:border-blue-300 w-full md:w-[500px] shadow-md"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button
        onClick={handleSearch}
        className="ml-4 bg-blue-500 text-white px-8 py-4 rounded-md text-lg font-medium focus:outline-none focus:ring focus:border-blue-300 shadow-lg transition-colors duration-300 hover:bg-blue-600"
      >
        {t("search")}
      </button>
      {error && <p className="text-red-600 ml-4">{t("noResults")}</p>}
    </div>
  );
};

export default Search;
