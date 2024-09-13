"use client";

import { useState, useEffect } from "react";
import { Box } from "./box/box";
import { getCryptoData } from "@/api/get-tickets-id";
import { CriptoResponseAPI } from "@/@types/cripto-data";
import DrawerInfo from "../ui/drawer-info";
import { AnimatedTabs } from "../animated-tabs/animated-tabs";

interface LocalStorageType {
  tag: string;
}

type PercentChangeType =
  | "percent_change_1h"
  | "percent_change_24h"
  | "percent_change_7d";

function CryptoComponent() {
  const [cryptoList, setCryptoList] = useState<CriptoResponseAPI[]>([]);
  const [symbols, setSymbols] = useState<string[]>([]);
  const [percentChange, setPercentChange] = useState<PercentChangeType>(
    "percent_change_24h"
  );
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [selectedCrypto, setSelectedCrypto] = useState<CriptoResponseAPI | null>(null);

  useEffect(() => {
    const loadSavedCryptos = () => {
      const savedCryptos = localStorage.getItem("favoritedCoins");
      if (savedCryptos) {
        const parsedCryptos: LocalStorageType[] = JSON.parse(savedCryptos);
        const symbolsOnly = parsedCryptos.map((crypto) => crypto.tag);
        setSymbols(symbolsOnly);
      }
    };
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
  }, [symbols]);

  const handleRemove = (index: number) => {
    const updatedList = cryptoList.filter((_, i) => i !== index);
    setCryptoList(updatedList);

    const updatedSymbols = updatedList.map((crypto) => ({ tag: crypto.symbol }));
    localStorage.setItem("favoritedCoins", JSON.stringify(updatedSymbols));
    window.dispatchEvent(new Event("cryptoListUpdated"));
  };

  const openDrawer = (crypto: CriptoResponseAPI) => {
    setSelectedCrypto(crypto);
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedCrypto(null);
  };

  const handleTabChange = (index: number) => {
    const percentChangeMapping: PercentChangeType[] = [
      "percent_change_1h",
      "percent_change_24h",
      "percent_change_7d",
    ];
    setPercentChange(percentChangeMapping[index]);
  };

  return (
    <div>
      <header className="py-2 flex flex-row items-center justify-between mt-1 p-2 mb-1">
        <div className="flex flex-row gap-1 items-center">
          <span className="mt-[2px] text-[1rem] text-white font-medium">Tokens</span>
        </div>
        <AnimatedTabs onChange={handleTabChange} />
      </header>

      <div className="max-h-[24rem] min-h-[24rem] overflow-auto">
        {cryptoList.length > 0 ? (
          cryptoList.map((crypto, index) => (
            <div key={index} onClick={() => openDrawer(crypto)} className="cursor-pointer">
              <Box
                index={index}
                image={crypto.image}
                name={crypto.name}
                tag={crypto.symbol}
                percentage={percentChange}
                price={crypto.price_usd}
                variant={crypto[percentChange as keyof CriptoResponseAPI]?.toString() || "N/A"}
                onRemove={handleRemove}
              />
            </div>
          ))
        ) : (
          <div className="flex items-center justify-between p-4 h-[4rem] w-full bg-[#252525] rounded-md mb-3 cursor-pointer">
            <span className="text-white/55 text-[14px]">Nenhuma criptomoeda foi encontrada</span>
          </div>
        )}
      </div>

      {isDrawerOpen && selectedCrypto && (
        <DrawerInfo
        
          link={selectedCrypto.link}
          max_supply={selectedCrypto.max_supply}
          total_supply={selectedCrypto.total_supply}
          name={selectedCrypto.name}
          index={cryptoList.indexOf(selectedCrypto)}
          image={selectedCrypto.image}
          tag={selectedCrypto.symbol}
          percentage_1h={selectedCrypto.percent_change_1h?.toString() || "N/A"}
          percentage_24h={selectedCrypto.percent_change_24h?.toString() || "N/A"}
          percentage_7d={selectedCrypto.percent_change_7d?.toString() || "N/A"}
          price={selectedCrypto.price_usd}
          onClose={closeDrawer}
          variant={selectedCrypto[percentChange as keyof CriptoResponseAPI]?.toString() || "N/A"}
        />
      )}
    </div>
  );
}

export default CryptoComponent;
