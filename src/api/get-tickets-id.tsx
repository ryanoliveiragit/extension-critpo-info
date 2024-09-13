import axios from 'axios';
import { CryptoAPIDatailsResponse } from '../@types/resume-crypto';
import { CriptoResponseAPI } from '@/@types/cripto-data';

const BASE_URL = "http://localhost:5000";

export const getCryptoData = async (symbols: string | string[]): Promise<CriptoResponseAPI[]> => {
  try {
    const symbolQuery = Array.isArray(symbols) ? symbols.join(',') : symbols;
    const response = await axios.get<CriptoResponseAPI[]>(`${BASE_URL}/consulta-cripto?symbol=${symbolQuery}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar os dados da criptomoeda:", error);
    throw error;
  }
};
export const getCryptoDetails = async (symbols: string[]): Promise<CryptoAPIDatailsResponse[]> => {
  try {
    const symbolQuery = symbols.join(',');
    const response = await axios.get<CryptoAPIDatailsResponse[]>(`${BASE_URL}/consulta-cripto?symbol=${symbolQuery}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar os detalhes da criptomoeda:", error);
    throw error;
  }
};
