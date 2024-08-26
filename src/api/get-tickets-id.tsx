import axios from 'axios';
import { CryptoAPIResponse } from '../@types/crypto-data';
import { CryptoAPIDatailsResponse } from '../@types/resume-crypto';

const BASE_URL = "http://localhost:5000/api";

export const getCryptoData = async (symbols: string | string[]): Promise<CryptoAPIResponse> => {
  try {
    const symbolQuery = Array.isArray(symbols) ? symbols.join(',') : symbols;
    const response = await axios.get<CryptoAPIResponse>(`${BASE_URL}/crypto?symbol=${symbolQuery}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar os dados da criptomoeda:", error);
    throw error;
  }
};

// Função para buscar detalhes das criptomoedas, aceitando os símbolos como parâmetro
export const getCryptoDetails = async (symbols: string[]): Promise<CryptoAPIDatailsResponse> => {
  try {
    const symbolQuery = symbols.join(','); // Concatena os símbolos em uma string separada por vírgulas
    const response = await axios.get<CryptoAPIDatailsResponse>(`${BASE_URL}/cryptoinfo?symbol=${symbolQuery}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar os detalhes da criptomoeda:", error);
    throw error;
  }
};
