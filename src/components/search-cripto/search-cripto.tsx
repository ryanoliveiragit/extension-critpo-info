import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { AnimatedTabs } from "../animated-tabs/animated-tabs";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import axiosInstance from "@/api/instance";
import { Listing } from "../resume-cripto-by-id/listing/listing";
import { Skeleton } from "../ui/skeleton";
import { CriptoResponseAPI } from "@/@types/cripto-data";

// Atualizando a tipagem para lidar com um array de criptomoedas
type CriptoResponseArray = CriptoResponseAPI[];

export const SearchCripto = () => {
  const [selectCripto, setSelectCripto] = useState("BTC");
  const [cryptoData, setCryptoData] = useState<CriptoResponseArray | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchCooldown, setSearchCooldown] = useState(0);

  async function handleSearchCripto() {
    if (isSearching || searchCooldown > 0) return;

    setIsSearching(true);
    setSearchCooldown(3);

    try {
      console.log("Iniciando busca de criptomoedas...");
      const response = await axiosInstance.get<CriptoResponseArray>("/consulta-cripto", {
        params: {
          symbol: selectCripto, // Pode enviar múltiplos símbolos separados por vírgula: "BTC,ETH,DOGE"
        },
      });
      console.log("Resposta da lista de criptomoedas:", response.data);
      setCryptoData(response.data);
    } catch (error) {
      console.error("Erro ao buscar a criptomoeda:", error);
    } finally {
      setIsSearching(false);
    }
  }

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (searchCooldown > 0) {
      timer = setInterval(() => {
        setSearchCooldown((prev) => Math.max(prev - 1, 0));
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [searchCooldown]);

  const isButtonDisabled = isSearching || searchCooldown > 0;

  return (
    <div>
      <section className="flex mt-4 flex-row gap-2 items-center justify-start">
        <div className="flex flex-row gap-2">
          <Input
            placeholder="BTC, ETH, DOGE..."
            value={selectCripto}
            onChange={(e) => setSelectCripto(e.target.value.toUpperCase())}
            className="bg-[#252525] w-[110px] border-none placeholder:text-gray-400 text-white focus:text-white"
          />
          <Button
            disabled={isButtonDisabled || selectCripto === ""}
            onClick={handleSearchCripto}
            className="bg-[#d5ff58] text-black"
          >
            {searchCooldown ? searchCooldown : <Search width={18} />}
          </Button>
        </div>
        <AnimatedTabs />
      </section>
      <hr className="h-[1px] bg-white/10 border-0 my-2" />
      <div className="text-white mt-1">
        {isSearching ? (
          <div className="flex flex-col gap-2 justify-center items-center">
            <Skeleton className="h-[70px] w-full rounded-md bg-[#252525]" />
            <Skeleton className="h-[70px] w-full rounded-md bg-[#252525]" />
            <Skeleton className="h-[70px] w-full rounded-md bg-[#252525]" />
            <Skeleton className="h-[70px] w-full rounded-md bg-[#252525]" />
            <Skeleton className="h-[70px] w-full rounded-md bg-[#252525]" />
            <Skeleton className="h-[70px] w-full rounded-md bg-[#252525]" />
          </div>
        ) : (
          <div className="max-h-[27rem] overflow-auto">
            {cryptoData && cryptoData.length > 0 ? (
              cryptoData.map((crypto) => (
                <Listing
                  key={crypto.symbol}
                  variant={crypto.percent_change_24h.toString()}
                  image={crypto.image}
                  name={crypto.name}
                  price={crypto.price_usd}
                  tag={crypto.symbol}
                />
              ))
            ) : (
              <div className="flex flex-row h-[4rem] w-full bg-[#252525] items-center justify-between p-4 rounded-md mb-3 cursor-pointer">
                <span className="text-white/55 text-[14px]">Nenhuma criptomoeda foi encontrada</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
