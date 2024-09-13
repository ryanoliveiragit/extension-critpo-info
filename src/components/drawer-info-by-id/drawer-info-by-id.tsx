import * as React from "react";
import { MdOutlineCandlestickChart } from "react-icons/md";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "../ui/input";

interface DrawerType {
  children: React.ReactNode;
  name: string;
  tag: string;
  image?: string;
  price: number;
  variant: string;
  index: number;
  percentage: string;
}

export function DrawerDemo({
  children,
  name,
  tag,
  image,
  variant,
  price,
}: DrawerType) {
  const [value, setValue] = React.useState<string>("");
  const [inputType, setInputType] = React.useState<"money" | "percentage">(
    "money"
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value;

    if (inputType === "money") {
      newValue = newValue.replace(/[^0-9.-]/g, "");
    } else if (inputType === "percentage") {
      newValue = newValue.replace(/[^0-9.-]/g, "");
      if (newValue.split("-").length > 2) {
        newValue = newValue.replace(/^-/, "");
      }
    }

    setValue(newValue);
  };

  const handleTypeChange = (type: "money" | "percentage") => {
    setValue("");
    setInputType(type);
  };

  const formatValue = (val: string, type: "money" | "percentage") => {
    if (type === "money") {
      return `$${val}`;
    } else {
      return `${val}%`;
    }
  };

  const truncatedPrice = price.toFixed(6).slice(0, 6);
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 6,
  }).format(Number(truncatedPrice));
  const formattedVariant = parseFloat(variant).toFixed(2).replace(".", ",");

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button className="bg-transparent w-full p-0 m-0" variant="ghost">
          {children}
        </Button>
      </DrawerTrigger>
      <DrawerContent className="p-4">
        <div className="w-full gap-2">
          <DrawerHeader>
            <div className="flex flex-row items-center gap-2 w-full justify-between">
              <div className="flex flex-row gap-2 items-center">
                <img
                  src={image}
                  alt={name}
                  className="rounded-full w-10 h-10"
                />
                <div className="flex items-start flex-col mt-1 text-white">
                  <div className="flex flex-row gap-2 items-center">
                    <DrawerTitle>{tag}</DrawerTitle>
                    <span className="text-sm text-white">
                      {formattedVariant}%
                    </span>
                  </div>
                  <DrawerDescription className="text-white/60">{name}</DrawerDescription>
                </div>
              </div>
              <div className="flex flex-row gap-2 items-center justify-between">
                <Button className="text-sm bg-[#d8d8d81a] border-none text-white">
                  <MdOutlineCandlestickChart size={20} />
                </Button>
              </div>
            </div>
          </DrawerHeader>
          <div className="p-2 pb-0">
            <div className="flex flex-col items-center justify-center space-x-2">
              <div className="text-7xl font-bold tracking-tighter text-white">
                {formattedPrice}
              </div>
              <div className="text-[0.70rem] uppercase text-white/70">
                ${price}
              </div>
            </div>
            <div className="flex flex-row gap-2 items-center justify-between p-4">
              <Input
                className="bg-transparent border-b border-white text-white placeholder:text-white"
                placeholder={`Defina o valor (${
                  inputType === "money" ? "$" : "%"
                })`}
                value={formatValue(value, inputType)}
                onChange={handleInputChange}
                type="text"
              />
              <div className="flex flex-row gap-1">
                <Button
                  className={`text-sm border-none ${
                    inputType === "money"
                      ? "bg-white text-black"
                      : "bg-[#d8d8d81a] text-white"
                  } hover:bg-white hover:text-black`}
                  onClick={() => handleTypeChange("money")}
                >
                  $
                </Button>
                <Button
                  className={`text-sm border-none ${
                    inputType === "percentage"
                      ? "bg-white text-black"
                      : "bg-[#d8d8d81a] text-white"
                  } hover:bg-white hover:text-black`}
                  onClick={() => handleTypeChange("percentage")}
                >
                  %
                </Button>
              </div>
            </div>
          </div>
          <DrawerFooter>
            <Button className="bg-[#fb58ff]  text-white">Salvar alerta</Button>
            <DrawerClose asChild>
              {/* <Button variant="outline">Voltar</Button> */}
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
