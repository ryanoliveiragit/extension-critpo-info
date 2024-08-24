import { Search } from "lucide-react";
import { AnimatedTabs } from "../animated-tabs/animated-tabs";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState } from "react";

import axiosInstance from "@/api/instance";
import { Data } from "@/@types/resume-crypto";
import { Listing } from "../resume-cripto-by-id/listing/listing";

export const SearchCripto = () => {
  const [selectCripto, setSelectCripto] = useState("");
  const [cryptoData, setCryptoData] = useState<Data[]>([]);

  async function handleSearchCripto() {
    try {
      console.log("Iniciando busca de criptomoedas...");
      const listResponse = await axiosInstance.get<Data[]>("/cryptoall", {
        params: {
          symbol: selectCripto,
        },
      });
      console.log("Resposta da lista de criptomoedas:", listResponse.data);

      const cryptoList = listResponse.data;

      console.log("Iniciando busca de logos...");
      const enrichedData = await Promise.all(
        cryptoList.map(async (crypto) => {
          try {
            console.log(`Buscando info para ${crypto.symbol}...`);
            const infoResponse = await axiosInstance.get(`/cryptoinfo`, {
              params: { symbol: crypto.symbol },
            });
            console.log(
              `Resposta da info para ${crypto.symbol}:`,
              infoResponse.data
            );

            const cryptoInfo = infoResponse.data.data[crypto.symbol];
            console.log("cryptoInfo", cryptoInfo);
            if (!cryptoInfo) {
              console.warn(`Informações não encontradas para ${crypto.symbol}`);
              return { ...crypto, logo: "" };
            }

            const logo = cryptoInfo.logo || "";
            return { ...crypto, logo };
          } catch (error) {
            console.error(`Erro ao buscar info para ${crypto.symbol}:`, error);
            return { ...crypto, logo: "" };
          }
        })
      );

      console.log("Dados enriquecidos com logos:", enrichedData);
      setCryptoData(enrichedData);
    } catch (error) {
      console.error("Erro ao buscar a criptomoeda:", error);
    }
  }
  return (
    <div>
      <section className="flex mt-4 flex-row gap-2 items-center justify-start">
        <div className="flex flex-row gap-2 ">
          <Input
            placeholder="DOG..."
            value={selectCripto}
            onChange={(e) => setSelectCripto(e.target.value.toUpperCase())}
            className="bg-[#252525] w-[113px] border-none placeholder:text-gray-400 text-white focus:text-white"
          />
          <Button onClick={handleSearchCripto}>
            <Search width={18} />
          </Button>
        </div>
        <AnimatedTabs />
      </section>
      <hr className=" h-[1px] bg-white/10 border-0 my-2" />
      <ul className="text-white mt-1 max-h-[16rem] overflow-auto">
        {cryptoData.length > 0
          ? cryptoData.map((crypto, index) => (
              <li key={index}>
                <Listing
                  variant={crypto?.quote?.USD?.percent_change_24h?.toFixed(2)}
                  image={crypto.logo}
                  name={crypto.name}
                  price={crypto.quote.USD.price}
                  tag={crypto.symbol}
                />
              </li>
            ))
          : "Nenhuma criptomoeda encontrada"}
      </ul>
    </div>
  );
};
