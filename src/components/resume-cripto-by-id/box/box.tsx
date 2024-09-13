import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
interface PropsBox {
  name: string;
  tag: string;
  image?: string;
  price: number;
  variant: string;
  index: number;
  percentage: string;
  onRemove: (index: number) => void;
}

export const Box = ({ name = "", image, variant, price, tag }: PropsBox) => {
  const isPositive = variant && parseFloat(variant.replace(",", ".")) > 0;
  const truncatedPrice = price.toFixed(6).slice(0, 6);
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 6,
  }).format(Number(truncatedPrice));

  const truncatedName = name.length > 16 ? `${name.slice(0, 16)}...` : name;
  const formattedVariant = parseFloat(variant).toFixed(2).replace(".", ",");
  const variantColor = isPositive ? "text-green-400" : "text-red-400";

  return (
    <div className="flex items-center justify-between  text-white hover:bg-white/5 p-2 rounded-lg w-full gap-2 mb-1.5">
      <section className="flex items-center gap-2">
        <img src={image} alt={name} className="rounded-full w-10 h-10" />
        <div className="flex flex-col">
          <h1 className="text-md font-medium uppercase">{tag}</h1>
          <h1 className="text-md  text-[12px] text-white/75 font-normal">
            {truncatedName}
          </h1>
        </div>
      </section>


      <div className="flex flex-col items-end">
        <div className="flex-1 flex justify-center">
          <span className="text-[16px] font-medium text-white">
            {formattedPrice}
          </span>
        </div>
        <div className={`flex items-center gap-1 ${variantColor}`}>
          {isPositive ? <IoMdArrowDropup size={15} /> : <IoMdArrowDropdown size={15} />}
          <span className="text-[12px] font-semibold flex items-baseline">
            {formattedVariant}%
          </span>
        </div>
      </div>
    </div>
  );
};
