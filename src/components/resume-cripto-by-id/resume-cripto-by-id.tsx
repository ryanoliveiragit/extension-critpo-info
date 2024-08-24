import { useState, useEffect } from "react";
import { Carousel, CarouselContent } from "@/components/ui/carousel";
import { Box } from "./box/box";
import { Star } from "lucide-react";

interface FavoritedCryptos {
  name: string;
  image: string;
  price: number;
  variant: string;
}

function CryptoComponent() {
  const [cryptoList, setCryptoList] = useState<FavoritedCryptos[]>([]);

  // Função para carregar as criptos salvas
  const loadSavedCryptos = () => {
    const savedCryptos = localStorage.getItem("favoritedCoins");
    if (savedCryptos) {
      setCryptoList(JSON.parse(savedCryptos));
    }
  };

  useEffect(() => {
    // Carregar as criptos ao montar o componente
    loadSavedCryptos();

    // Adicionar um listener para atualizar as criptos quando o evento for emitido
    const handleStorageUpdate = () => {
      loadSavedCryptos();
    };

    window.addEventListener("cryptoListUpdated", handleStorageUpdate);

    // Remover o listener ao desmontar o componente
    return () => {
      window.removeEventListener("cryptoListUpdated", handleStorageUpdate);
    };
  }, []);

  return (
    <div className="text-white text-[12px]">
      <h1 className="py-2 flex flex-row items-center">
        <Star height={16} /> Meus favoritos
      </h1>
      <div>
        <Carousel className="w-full max-w-sm">
          <CarouselContent className="ml-.5 gap-4">
            {cryptoList.length > 0 ? (
              cryptoList.map((crypto, index) => (
                <section key={index}>
                  <Box
                    index={index}
                    image={crypto.image}
                    name={crypto.name}
                    price={crypto.price.toFixed(4)}
                    variant={crypto.variant}
                  />
                </section>
              ))
            ) : (
              <p>Nenhuma criptomoeda favoritada foi encontrada.</p>
            )}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
}

export default CryptoComponent;
