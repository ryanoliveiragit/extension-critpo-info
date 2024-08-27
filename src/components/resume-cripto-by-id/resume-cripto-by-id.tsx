import { useState, useEffect } from "react";
import { Box } from "./box/box";
import { Star } from "lucide-react";
import { getCryptoData } from "@/api/get-tickets-id";
import { CriptoResponseAPI } from "@/@types/cripto-data";
interface localStorageType {
  tag: string;
}

function CryptoComponent() {
  const [cryptoList, setCryptoList] = useState<CriptoResponseAPI[]>([]);
  const [symbols, setSymbols] = useState<string[]>([]); 

  const loadSavedCryptos = () => {
    const savedCryptos = localStorage.getItem("favoritedCoins");
    if (savedCryptos) {
      const parsedCryptos: localStorageType[] = JSON.parse(savedCryptos);
      const symbolsOnly = parsedCryptos.map((crypto) => crypto.tag);
      setSymbols(symbolsOnly);
    }
  };

  const handleRemove = (index: number) => {
    const updatedList = cryptoList.filter((_, i) => i !== index);
    setCryptoList(updatedList);
    const updatedSymbols = updatedList.map((crypto) => ({ tag: crypto.symbol }));
    localStorage.setItem("favoritedCoins", JSON.stringify(updatedSymbols));
    window.dispatchEvent(new Event("cryptoListUpdated"));
  };

  useEffect(() => {
    loadSavedCryptos();
  }, []);

  useEffect(() => {
    const fetchCryptoData = async () => {
      if (symbols.length > 0) { 
        try {
          const tags = symbols.join(",");
          const response = await getCryptoData(tags);
          setCryptoList(response);
        } catch (error) {
          console.error("Erro ao buscar os dados das criptos:", error);
        }
      }
    };

    fetchCryptoData();
  }, [symbols]); // Reexecuta a busca se os símbolos mudarem

  return (
    <div className="text-white text-[12px] mt-2">
      <div className="py-2 flex flex-row items-center justify-between">
        <div className="flex flex-row gap-1 items-center">
          <Star
            fill="true"
            className="fill-yellow-500 mr-1"
            color="#fbbf24"
            size={16}
            strokeWidth={1}
          />
          <span className="mt-[2px]">Meus favoritos</span>
        </div>
        <div className="flex flex-row gap-2">
          <span className="bg-[#d5ff58] py-1.5 px-2.5 text-md text-black rounded-md">1d</span>
          <span className="bg-[#252525] py-1.5 px-2.5 text-md rounded-md">7d</span>
          <span className="bg-[#252525] py-1.5 px-2.5 text-md rounded-md">30d</span>
        </div>
      </div>
      <div className="max-h-[26rem] min-h-[26rem] overflow-auto">
        {cryptoList.length > 0 ? (
          cryptoList.map((crypto, index) => (
            <section key={index}>
              <Box
                index={index}
                image={crypto.image}
                name={crypto.name}
                tag={crypto.symbol}
                price={crypto.price_usd}
                variant={crypto.percent_change_24h.toString()}
                onRemove={handleRemove}
              />
            </section>
          ))
        ) : (
          <div className="flex flex-row h-[4rem] w-full bg-[#252525] items-center justify-between p-4 rounded-md mb-3 cursor-pointer">
            <span className="text-white/55 text-[14px]">
              Nenhuma criptomoeda foi encontrada
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default CryptoComponent;
