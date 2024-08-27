import { useState, useEffect } from "react";
import { ChevronUp, ChevronDown, TrendingUp, TrendingDown, Star } from "lucide-react";

interface ListingProps {
  name: string;
  tag: string;
  image?: string;
  price: number;
  variant: string;
}

export const Listing = ({ name, tag, price, image, variant }: ListingProps) => {
  const [isFavorited, setIsFavorited] = useState(false);

  const truncatedPrice = price.toFixed(6).slice(0, 6);

  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 6
  }).format(Number(truncatedPrice));

  const formattedVariant = parseFloat(variant).toFixed(2).replace(".", ",");

  const isNegative = parseFloat(variant) < 0;
  const truncatedName = name.length > 20 ? `${name.slice(0, 7)}...` : name;

  useEffect(() => {
    const favoritedCoins = JSON.parse(localStorage.getItem("favoritedCoins") || "[]");
    const isCoinFavorited = favoritedCoins.some((coin: { tag: string }) => coin.tag === tag);
    setIsFavorited(isCoinFavorited);
  }, [tag]);

  const handleFavoriteClick = () => {
    const favoritedCoins = JSON.parse(localStorage.getItem("favoritedCoins") || "[]");
    if (isFavorited) {
      const updatedCoins = favoritedCoins.filter((coin: { tag: string }) => coin.tag !== tag);
      localStorage.setItem("favoritedCoins", JSON.stringify(updatedCoins));
    } else {
      favoritedCoins.push({ name, tag, price, image, variant });
      localStorage.setItem("favoritedCoins", JSON.stringify(favoritedCoins));
    }

    setIsFavorited((prev) => !prev);

    const event = new Event("cryptoListUpdated");
    window.dispatchEvent(event);
  };

  return (
    <section
      onClick={handleFavoriteClick}
      className={`${
        isFavorited ? "bg-[#333333]" : ""
      } flex flex-row w-full bg-[#252525] items-center justify-between p-2 rounded-md mb-3 cursor-pointer`}
    >
      <div className="flex flex-row gap-2 w-[8rem] items-center">
        <img src={image} alt={name} className="w-8 rounded-full" />
        <div className="flex flex-col">
          <p className="text-sm font-bold -mb-1">{tag}</p>
          <h1 className="text-[14px] text-white/65 font-normal">
            {truncatedName}
          </h1>
        </div>
      </div>

      <div>
        {isNegative ? (
          <TrendingDown className="text-[#ea3943]" />
        ) : (
          <TrendingUp className="text-[#16c784]" />
        )}
      </div>

      <div className="flex flex-col gap-1 justify-end items-end">
        <span className="font-semibold">{formattedPrice}</span>
        <div className="flex flex-row gap-0 items-center">
          {isNegative ? (
            <ChevronDown className="mb-.5 text-[#ea3943]" height={15} />
          ) : (
            <ChevronUp className="mb-.5 text-[#16c784]" height={15} />
          )}
          <span
            className={`text-sm flex flex-row items-baseline ${
              isNegative ? "text-[#ea3943]" : "text-[#16c784]"
            }`}
          >
            <span className="font-normal"> {formattedVariant}</span>
            <span className="align-bottom text-sm">
              % <span className="text-md">(1h)</span>
            </span>
          </span>
        </div>
      </div>
      <span className="flex flex-col mr-2 mt-1 gap-1 justify-end items-end cursor-pointer">
        <Star
          fill={isFavorited ? "true" : "false"}
          className={isFavorited ? "fill-yellow-500" : "fill-[#979797]"}
          color={isFavorited ? "#fbbf24" : "#979797"}
          size={16}
          strokeWidth={1}
        />
      </span>
    </section>
  );
};
