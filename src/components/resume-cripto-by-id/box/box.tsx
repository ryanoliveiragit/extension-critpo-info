import { ChevronUp, ChevronDown, Trash } from "lucide-react";

interface PropsBox {
  name: string;
  tag: string;
  image?: string;
  price: number;
  variant: string;
  index: number;
  onRemove: (index: number) => void;
}

export const Box = ({ name = "", image, variant, price, tag, index, onRemove }: PropsBox) => {
  const isPositive = variant && parseFloat(variant.replace(",", ".")) > 0;
  const truncatedPrice = price.toFixed(6).slice(0, 6);
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 6
  }).format(Number(truncatedPrice));

  const truncatedName = name.length > 5 ? `${name.slice(0, 5)}...` : name;
  const formattedVariant = parseFloat(variant).toFixed(2).replace(".", ",");
  const cardBackground = index === 0 ? "bg-[#252525]" : "bg-[#252525]";
  const textColor = index === 0 ? "text-white" : "text-white";
  const variantColor =
    index === 0
      ? isPositive
        ? "text-green-500"
        : "text-red-500"
      : isPositive
      ? "text-green-500"
      : "text-red-500";

  return (
    <div
      className={`${cardBackground} ${textColor} w-full p-2 rounded-lg grid grid-cols-[1.2fr_1fr_1fr_auto] gap-2 items-center mb-1.5`}
    >
      <section className="flex items-center gap-2">
        <img src={image} alt={name} className="rounded-full w-8 h-8" />
        <div className="flex flex-col">
          <h1 className="text-md font-medium uppercase">{tag}</h1>
          <h1 className="text-md uppercase text-[10px]  text-white/65 font-normal">{truncatedName}</h1>
        </div>
      </section>
      <div className="flex items-center ml-2">
        <span className="text-md font-bold">{formattedPrice}</span>
      </div>
      <div className={`flex items-center gap-1 ${variantColor}`}>
        {isPositive ? (
          <ChevronUp className="mb-0.5" height={15} />
        ) : (
          <ChevronDown className="mb-0.5" height={15} />
        )}
        <span className="text-md font-semibold flex items-baseline w-[80px]">
          {formattedVariant}% (1d)
        </span>
      </div>
      <div className="flex items-center justify-center w-5 ">
        <span>
          <Trash
            className="text-[10px] p-1.5 text-white/65 cursor-pointer rounded-md hover:text-red-500"
            onClick={() => onRemove(index)} // Chama a função onRemove com o índice
          />
        </span>
      </div>
    </div>
  );
};
