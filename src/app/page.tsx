import Image from "next/image";;
import MenuIMG from "../../assets/icons/menu.svg";
import FavoriteList from "./components/FavoriteList";
import CheckIMG from "../../assets/icons/check.svg";

export default function Home() {
  return (
    <div className="flex font-">            
      <aside id="logo-sidebar" className="top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700" aria-label="Sidebar">
        <div className="text-center">
          <button>
          <Image src={MenuIMG} alt={"favorite"}/>             
          </button>
        </div>
        <div className="h-full px-3 pb-4 bg-white dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <li>
                <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">                  
                  <span className="ms-3">MPB</span>
                </a>
            </li>
            <li>
                <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">                  
                  <span className="flex-1 ms-3 whitespace-nowrap">Sertanejo Brasil</span>
                  <Image src={CheckIMG} alt={"favorite"}/>   
                </a>
            </li>
            <li>
                <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">                  
                  <span className="flex-1 ms-3 whitespace-nowrap">Rádio FM</span>                  
                </a>
            </li>
            <li>
                <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">                  
                  <span className="flex-1 ms-3 whitespace-nowrap">Rádio Sertanejo Só Modão</span>
                </a>
            </li>
            <li>
                <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">                  
                  <span className="flex-1 ms-3 whitespace-nowrap">Bossa Nova Brasil</span>
                </a>
            </li>
            <li>
                <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">                  
                  <span className="flex-1 ms-3 whitespace-nowrap">Gaúcha</span>
                </a>
            </li>
            <li>
                <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">                  
                  <span className="flex-1 ms-3 whitespace-nowrap">Sertanejo Brasil</span>
                </a>
            </li>
            <li>
                <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">                  
                  <span className="flex-1 ms-3 whitespace-nowrap">Rádio Jovem Pan</span>
                </a>
            </li>
            <li>
                <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">                  
                  <span className="flex-1 ms-3 whitespace-nowrap">Novo Tempo</span>
                </a>  
            </li>
          </ul>
        </div>
      </aside>
      <main className="flex flex-col justify-start p-8 w-full bg-gray-300">
        <h1 className="text-center text-2xl">Radio Browser</h1>        
        <FavoriteList />          
      </main>
    </div>
  );
}
