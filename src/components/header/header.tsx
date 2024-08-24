import { Menu } from "lucide-react";

export const Header = () => {
  return (
    <header className="flex flex-row gap-2 mt-2 items-center justify-between  w-full">
      <div className="flex flex-row gap-2">
        <h1 className="text-white text-4xl pt-5 pb-2 font-extralight">
          Coin<span className="text-[#d5ff58] font-medium">search</span>
        </h1>
        <div className="group h-6 mt-8 w-[70%] relative grid overflow-hidden rounded-full px-3 py-1 shadow-[0_1000px_0_0_hsl(0_0%_20%)_inset] transition-colors duration-200">
          <span>
            <span className="spark mask-gradient animate-flip before:animate-rotate absolute inset-0 h-[100%] w-[100%] overflow-hidden rounded-full [mask:linear-gradient(white,_transparent_50%)] before:absolute before:aspect-square before:w-[200%] before:rotate-[-90deg] before:bg-[conic-gradient(from_0deg,transparent_0_340deg,white_360deg)] before:content-[''] before:[inset:0_auto_auto_50%] before:[translate:-50%_-15%]" />
          </span>
          <span className="backdrop absolute inset-px rounded-full bg-neutral-950 transition-colors duration-200" />
          <span className="z-10 text-neutral-400 text-xs font-medium">
            Versão beta
          </span>
        </div>
      </div>
      <div>
        <Menu size={24} strokeWidth={2} color="white" className="mt-5" />
      </div>
    </header>
  );
};
