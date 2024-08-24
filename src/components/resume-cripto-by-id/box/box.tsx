import { ChevronUp, ChevronDown } from "lucide-react";

interface PropsBox {
  name?: string;
  image?: string;
  variant?: string;
  price?: string;
  index: number;
}

export const Box = ({ name, image, variant, price, index }: PropsBox) => {
  const isPositive = variant && parseFloat(variant.replace(',', '.')) > 0;
  const formattedVariant = variant?.replace('.', ',');


  const cardBackground = index === 0 ? 'bg-[#C9EF52]' : 'bg-[#252525]';
  const textColor = index === 0 ? 'text-black' : 'text-white';
  const variantColor = index === 0 ? (isPositive ? 'text-black' : 'text-red-500') : (isPositive ? 'text-green-500' : 'text-red-500');

  return (
    <div className={`${cardBackground} ${textColor} w-[220px] h-[125px] p-4 rounded-3xl`}>
      <section className="flex flex-row gap-2 w-full items-center">
        <img src={image} alt={name} className="rounded-full w-8" />
        <div className="flex flex-col">
          <h1 className="text-[16px] font-medium uppercase">{name}</h1>
        </div>
      </section>
      <span className="text-[32px]">
        <strong>${price}</strong>
      </span>
      <div className={`flex flex-row gap-0 items-center ${variantColor}`}>
        {isPositive ? (
          <ChevronUp className="mb-0.5" height={15} />
        ) : (
          <ChevronDown className="mb-0.5" height={15} />
        )}
        <span className="text-md font-semibold flex flex-row items-baseline">
          {formattedVariant}
          <span className="align-bottom text-md font-semibold">
            % <span className="text-md">(1d)</span>
          </span>
        </span>
      </div>
    </div>
  );
};
