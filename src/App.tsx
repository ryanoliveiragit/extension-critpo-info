import { Component } from "react";
import Home from "./page/home";
import CriptoInfo from "./page/criptoinfo";
import { Menu, ChevronLeft } from "lucide-react";
import { Button } from "./components/ui/button";
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
      <div className="bg-[#121212] w-[350px] h-[590px] p-[12px] z-100">
        
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
           ) : <h1 className="text-sm font-medium inline-flex animate-shine bg-[linear-gradient(110deg,#939393,45%,#1e2631,55%,#939393)] bg-[length:200%_100%] text-transparent bg-clip-text">
           v1
         </h1>}
         </div>
         <h1 className="text-white text-3xl font-extralight">
             coin<span className="text-[#d5ff58] font-medium">search</span>
           </h1>
         <div>
         <Menu size={24} strokeWidth={2} color="white"  />
         </div>
       </header>
       }
        {page}
        {this.state.page === "home" && (
          <Button
            onClick={() => this.setPage("search")}
            className="w-full bg-[#d5ff58] text-black"
          >
            Adicionar criptomoeda
          </Button>
        )}
    
      </div>
    );
  }
}

export default App;
