import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { fetchBrStatistics, fetchWorldStatistics } from "../services/fetchCovidService";
import { CardData } from "../components/types/types";
import { SearchInputProps } from "../components/types/types";

const Search: React.FC<SearchInputProps> = ({ locale, onDataFound }) => {
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
        locale === "br"
          ? item.state.toLowerCase().includes(searchTerm.toLowerCase())
          : item.country.toLowerCase().includes(searchTerm.toLowerCase()) 
      );

      if (filteredData.length === 0) {
        setError(true);
      } else {
        onDataFound(filteredData);
        setSearchTerm("");
      }
    } catch (error) {
      setError(true);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };
  return (
    <div className="flex flex-col items-center mb-8">
      <div className="flex justify-center mb-4">
        <input
          type="text"
          placeholder={t("searchPlaceholder")}
          className="border border-gray-300 rounded-md p-4 focus:outline-none focus:ring focus:border-blue-300 w-full md:w-[500px] shadow-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button
          onClick={handleSearch}
          className="ml-4 bg-blue-500 text-white px-8 py-4 rounded-md text-lg font-medium focus:outline-none focus:ring focus:border-blue-300 shadow-lg transition-colors duration-300 hover:bg-blue-600"
        >
          {t("search")}
        </button>
      </div>
      {error && <p className="text-red-600">{t("Nenhum resultado encontrado!")}</p>}
    </div>
  );
  

};

export default Search;
