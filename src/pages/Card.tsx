import React from 'react';
import { CardData, StatisticsData } from '../components/types/types';

interface CardProps {
  data: CardData | StatisticsData;
}

const Card: React.FC<CardProps> = ({ data }) => {

  if ('cases' in data && 'country' in data) {

    const countryData = data as StatisticsData;
    return (
      <div className="border border-gray-300 rounded-lg p-4 flex flex-col shadow-md">
        <h2 className="text-xl font-bold mt-4 mb-2 text-center">{countryData.country}</h2>
        <p className="text-gray-600 font-bold text-center">Total de Casos: {countryData.cases.total}</p>
        <p className="text-green-500 font-bold text-center">Total Recuperados: {countryData.cases.recovered}</p>
        <p className="text-red-500 font-bold text-center">Total de Mortes: {countryData.deaths.total}</p>
        <p className="text-blue-500 font-bold text-center">Total de Testes: {countryData.tests.total}</p>
      </div>
    );
  } else {
    const stateData = data as CardData;
    return (
      <div className="border border-gray-300 rounded-lg p-4 flex flex-col shadow-md">
        <h2 className="text-xl font-bold mt-4 mb-2 text-center">{stateData.state}</h2>
        <p className="text-gray-600 font-bold text-center">Total de Casos: {stateData.cases}</p>
        <p className="text-red-500 font-bold text-center">Total de Mortes: {stateData.deaths}</p>
        <p className="text-orange-500 font-bold text-center">Total de Suspeitas: {stateData.suspects}</p>
        <p className="text-green-500 font-bold text-center">Total Recuperados: {stateData.refuses}</p>
      </div>
    );
  }
};

export default Card;
