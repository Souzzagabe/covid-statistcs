export interface StatisticsData {
  country: string;
  cases: {
    active: number;
    critical: number | null;
    recovered: number;
    total: number;
  };
  deaths: {
    new: string | null;
    total: number;
  };
  tests: {
    total: number;
  };
  day: string;
  time: string;
}

export interface CardData {
  country: string;
  totalCases: number;
  totalDeaths: number;
  totalRecovered: number;
  totalActiveCases: number | null;
  totalCriticalCases: number | null; 
  totalTests: number;
  state: string;
  deaths: number;
  suspects: number;
  day: number;
  cases: number;
  refuses: number;
}


export interface SearchInputProps {
  locale: string;
  onDataFound: (data: CardData[]) => void;
}
