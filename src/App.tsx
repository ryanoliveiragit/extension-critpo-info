import { Header } from "./components/header/header";
import CryptoComponent from "./components/resume-cripto-by-id/resume-cripto-by-id";
import { SearchCripto } from "./components/search-cripto/search-cripto";

function App() {
  return (
    <section className="bg-[#121212] w-[350px] h-[590px]  p-[12px]">
      <section className="flex flex-row gap-4 items-center -mt-4">
        <Header />
      </section>
      <CryptoComponent />
      <section>
        <h1 className="text-white text-md mt-4 -mb-2 font-semibold">
          Buscar criptomoeda
        </h1>
      </section>
      <SearchCripto />
    </section>
  );
}

export default App;
