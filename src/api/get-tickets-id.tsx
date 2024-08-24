import axios from 'axios';
import { CryptoAPIResponse } from '../@types/crypto-data';
import { CryptoAPIDatailsResponse } from '../@types/resume-crypto';

const BASE_URL = "http://localhost:5000/api";

export const getCryptoData = async (): Promise<CryptoAPIResponse> => {
  try {
    const response = await axios.get<CryptoAPIResponse>(`${BASE_URL}/crypto?symbol=DOG,SOL,WIF`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar os dados da criptomoeda:", error);
    throw error;
  }
};

export const getCryptoDetails = async (): Promise<CryptoAPIDatailsResponse> => {
  try {
    const response = await axios.get<CryptoAPIDatailsResponse>(`${BASE_URL}/cryptoinfo?symbol=DOG,SOL,WIF`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar os detalhes da criptomoeda:", error);
    throw error;
  }
};

