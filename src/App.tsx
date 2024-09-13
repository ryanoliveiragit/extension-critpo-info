import { Component } from "react";
import Home from "./page/home";
import CriptoInfo from "./page/criptoinfo";
import { ChevronLeft } from "lucide-react";
import { Button } from "./components/ui/button";
import { FaLinkedin } from "react-icons/fa";
interface AppState {
  page: string;
  history: string[];
}

class App extends Component<object, AppState> {
  constructor(props: object) {
    super(props);
    this.state = {
      page: "home",
      history: [] 
    };
  }

  setPage = (page: string) => {
    this.setState((prevState) => ({
      page,
      history: [...prevState.history, prevState.page]
    }));
  };

  goBack = () => {
    this.setState((prevState) => {
      const newHistory = [...prevState.history];
      const previousPage = newHistory.pop(); 
      return {
        page: previousPage || "home", 
        history: newHistory
      };
    });
  };

  render() {
    let page: JSX.Element | null = null;
    switch (this.state.page) {
      case "home":
        page = <Home />;
        break;
      case "search":
        page = <CriptoInfo />;
        break;
      default:
        page = <Home />;
        break;
    }

    return (
      <div className="relative z-100 w-[350px] h-[590px] bg-cover bg-center bg-black/95 p-4 ">
        
        
       {this.state.page === "search"} {
         <header className="z flex flex-row gap-2 items-center justify-between px-2 py-2  w-full">
         <div className="flex flex-row gap-2 items-center">
           {this.state.page !== "home" ? (
             <ChevronLeft
               strokeWidth={2}
               color="white"
               className="cursor-pointer mt-1 -ml-1"
               onClick={this.goBack}
             />
           ) : <h1 className="text-sm font-medium inline-flex animate-shine bg-gradient-to-r from-white via-[#1e2631] to-[#939393] bg-[length:200%_100%] text-transparent bg-clip-text">
           1.02
         </h1>}
         </div>
         
            <div>

            <span className="text-[#ffffffe0] text-2xl">coin</span>
<span className="text-2xl bg-gradient-to-r from-[#FF86D4] to-[#FFAD80] bg-clip-text text-transparent">search</span>

            </div>
         
         <div>
         <h1 className="text-2xl text-white">
         <FaLinkedin />
         </h1>
         </div>
       </header>
       }
        {page}
        {this.state.page === "home" && (
          <Button
            onClick={() => this.setPage("search")}
          className="bg-[#fcfcfc] hover:bg-[#3d3d3d] items-center text-md w-full py-3 font-medium mt-4  flex flex-row gap-1"
          >
         <span className="text-[#0a0a0a] hover:text-white text-sm">Adicionar tokens</span>
          </Button>
        )}
      </div>
    );
  }
}

export default App;
