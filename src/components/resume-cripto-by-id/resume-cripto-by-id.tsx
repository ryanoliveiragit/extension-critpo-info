import { useState, useEffect } from "react";
import { Box } from "./box/box";
import { Star } from "lucide-react";
import { getCryptoData } from "@/api/get-tickets-id";

interface FavoritedCryptos {
  name: string;
  image: string;
  price: number;
  variant: string;
  tag: string;
}

function CryptoComponent() {
  const [cryptoList, setCryptoList] = useState<FavoritedCryptos[]>([]);

  const loadSavedCryptos = () => {
    const savedCryptos = localStorage.getItem("favoritedCoins");
    if (savedCryptos) {
      return JSON.parse(savedCryptos) as FavoritedCryptos[];
    }
    return [];
  };

  const handleRemove = (index: number) => {
    const updatedList = cryptoList.filter((_, i) => i !== index);
    setCryptoList(updatedList);
    localStorage.setItem("favoritedCoins", JSON.stringify(updatedList));
    window.dispatchEvent(new Event("cryptoListUpdated"));
  };

  useEffect(() => {
    const fetchCryptoData = async () => {
      const savedCryptos = loadSavedCryptos();

      if (savedCryptos.length > 0) {
        try {
          const tags = savedCryptos.map((crypto) => crypto.tag).join(",");
          const response = await getCryptoData(tags);

          const updatedList = savedCryptos.map((crypto) => {
            const apiData = response.data[crypto.tag];

            return {
              ...crypto,
              price: apiData?.quote?.USD.price ?? crypto.price,
              variant: apiData?.quote?.USD.percent_change_24h.toFixed(2) ?? crypto.variant,
            };
          });

          setCryptoList(updatedList);
        } catch (error) {
          console.error("Erro ao buscar os dados das criptos:", error);
        }
      }
    };

    fetchCryptoData();
  }, []);

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
                price={crypto.price.toFixed(5)}
                variant={crypto.variant}
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
