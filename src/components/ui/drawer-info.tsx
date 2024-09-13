import { Button } from "@/components/ui/button";
import { FiTrash2 } from "react-icons/fi";
import { MdOutlineCandlestickChart } from "react-icons/md";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";

interface DrawerType {
  name: string;
  tag: string;
  image?: string;
  price: number;
  variant: string;
  index: number;
  link?: string;
  max_supply?: number;
  total_supply?: number;
  percentage_1h: string;
  percentage_24h: string;
  percentage_7d: string;
  onClose: () => void;
}

export default function DrawerInfo({
  name,
  tag,
  image,
  price,
  max_supply,
  link,
  total_supply,
  percentage_1h,
  onClose,
}: DrawerType) {
  const truncatedPrice = price.toFixed(6).slice(0, 6);
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 6,
  }).format(Number(truncatedPrice));

  // Função para formatar e determinar a cor da variação
  const getPercentageProps = (percentage: string) => {
    const value = parseFloat(percentage.replace(",", "."));
    const isPositive = value > 0;
    const formattedPercentage = value.toFixed(2).replace(".", ",");

    return {
      isPositive,
      formattedPercentage,
      arrow: isPositive ? (
        <IoMdArrowDropup size={15} className="text-green-400" />
      ) : (
        <IoMdArrowDropdown size={15} className="text-red-400" />
      ),
      colorClass: isPositive ? "text-green-400" : "text-red-400",
    };
  };

  const {
    colorClass: colorClass1h,
    formattedPercentage: formattedPercentage1h,
  } = getPercentageProps(percentage_1h);

  const handleRemoveFavorite = () => {
    // Recupera a lista de favoritos do localStorage
    const favoritedCoins = JSON.parse(localStorage.getItem("favoritedCoins") || "[]");

    // Filtra a lista para remover o item com base na tag
    const updatedCoins = favoritedCoins.filter((coin: { tag: string }) => coin.tag !== tag);

    // Atualiza o localStorage com a lista filtrada
    localStorage.setItem("favoritedCoins", JSON.stringify(updatedCoins));

    // Fecha o drawer após a remoção
    onClose();

    // Recarrega a página
    window.location.reload();
  };

  return (
    <div
      className="fixed inset-0 bg-[#0D0E0E] bg-opacity-50 backdrop-blur-md flex justify-end items-end z-50"
      onClick={onClose}
    >
      <div
        className="bg-[#0d0e0ec5] rounded-t-lg shadow-lg w-full h-[325px] p-6 flex flex-col justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <img src={image} alt={name} className="rounded-full w-12 h-12" />
              <div>
                <div className="flex items-center ">
                  <span className="font-semibold text-white">{tag}</span>
                  <div className="flex items-center ">
                    <span
                      className={`text-sm font-semibold ${colorClass1h} ml-2`}
                    >
                      {formattedPercentage1h} (1h)
                    </span>
                  </div>
                </div>
                <span className="text-sm text-white/60">{name}</span>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button
                size="icon"
                className="bg-[#d8d8d81a] text-white hover:bg-[#d8d8d830]"
                asChild
              >
                <a
                  href={link ? link : "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MdOutlineCandlestickChart className="h-5 w-5" />
                </a>
              </Button>
              <Button
                size="icon"
                className="bg-[#d8d8d81a] text-white hover:bg-[#d8d8d830]"
                onClick={handleRemoveFavorite}
              >
                <FiTrash2 className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="text-center">
            <div className="text-5xl font-bold tracking-tighter text-white">
              {formattedPrice}
            </div>
            <div className="text-sm text-white/70 mt-1">
              <span className="text-green-400">$</span>{price}
            </div>
          </div>

          <div className="flex flex-col justify-center items-center text-sm mt-4">
            <div className="flex flex-col mb-2">
              <div>
                <span className="text-white/70">Max supply:</span>
                <span className="font-semibold text-white ml-1">
                  {max_supply !== undefined && max_supply !== null
                    ? max_supply.toLocaleString()
                    : "N/A"}
                </span>
              </div>
              <div>
                <span className="text-white/70">Total supply:</span>
                <span className="font-semibold text-white ml-1">
                  {total_supply !== undefined && total_supply !== null
                    ? total_supply.toLocaleString()
                    : "N/A"}
                </span>
              </div>
            </div>
          </div>
        </div>

        <Button
          className="w-full bg-[#fdfdfd] text-black hover:bg-[#d8d8d830] mt-4"
          onClick={onClose}
        >
          Voltar
        </Button>
      </div>
    </div>
  );
}
