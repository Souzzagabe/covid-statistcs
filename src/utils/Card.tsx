import React from 'react';
import { CardData, StatisticsData } from '../components/types/types';
import { useTranslation } from 'react-i18next';

interface CardProps {
  data: CardData | StatisticsData;
}

const Card: React.FC<CardProps> = ({ data }) => {
  const { t } = useTranslation();

  if ('cases' in data && 'country' in data) {

    const countryData = data as StatisticsData;
    return (
      <div className="border border-gray-300 rounded-lg p-4 flex flex-col shadow-md">
        <h2 className="text-xl font-bold mt-4 mb-2 text-center">{countryData.country}</h2>
        <p className="text-gray-600 font-bold text-center">{t('totalCases')}: {countryData.cases.total}</p>
        <p className="text-green-500 font-bold text-center">{t('totalRecovered')}: {countryData.cases.recovered}</p>
        <p className="text-red-500 font-bold text-center">{t('totalDeaths')}: {countryData.deaths.total}</p>
        <p className="text-blue-500 font-bold text-center">{t('totalTests')}: {countryData.tests.total}</p>
      </div>
    );
  } else {
    const stateData = data as CardData;
    return (
      <div>
        <div className="border border-gray-300 rounded-lg p-4 flex flex-col shadow-md">
          <h2 className="text-xl font-bold mt-4 mb-2 text-center">{stateData.state}</h2>
          <p className="text-gray-600 font-bold text-center">{t('totalCases')}: {stateData.cases}</p>
          <p className="text-red-500 font-bold text-center">{t('totalDeaths')}: {stateData.deaths}</p>
          <p className="text-orange-500 font-bold text-center">{t('totalSuspects')}: {stateData.suspects}</p>
          <p className="text-green-500 font-bold text-center">{t('totalRecovered')}: {stateData.refuses}</p>
        </div>
      </div>
    );
  }
};

export default Card;
