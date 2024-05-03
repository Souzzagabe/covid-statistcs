import axios from "axios";

export async function fetchBrStatistics() {
  try {
    const response = await axios.get<any>(
      "https://covid19-brazil-api.now.sh/api/report/v1"
    );
    return response.data?.data || [];
  } catch (error) {
    console.error("Erro ao buscar estatísticas do Brasil:", error);
    throw new Error("Erro ao buscar estatísticas do Brasil");
  }
}

export async function fetchWorldStatistics() {
  try {
    const response = await axios.get<any>(
      "https://covid-193.p.rapidapi.com/statistics",
      {
        headers: {
          "X-RapidAPI-Key":
            "b6dd79e9d5mshc707ff0663af2c5p16bf19jsn77c478110c19",
          "X-RapidAPI-Host": "covid-193.p.rapidapi.com",
        },
      }
    );
    return response.data?.response || [];
  } catch (error) {
    console.error("Erro ao buscar estatísticas mundiais:", error);
    throw new Error("Erro ao buscar estatísticas mundiais");
  }
}
