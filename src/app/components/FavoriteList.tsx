import Image from "next/image";
import SearchbarIMG from "../../../assets/icons/searchbar.svg";
import EditIMG from "../../../assets/icons/edit.svg";
import DeleteIMG from "../../../assets/icons/delete.svg";
import StopIMG from "../../../assets/icons/stop.svg";
import PlayIMG from "../../../assets/icons/play.svg";
import { Radio } from "../models/Radio";

interface WrapperProps {
  currentRadio: Radio;
  favoriteRadios: Radio[];
}

export default function FavoriteList({currentRadio, favoriteRadios}: WrapperProps) {
  console.log('# currentRadio ', currentRadio);

    return (
        <div>   
          <header className="flex justify-between items-end w-full">
            <h2>Favorite Radios</h2>  
            <form>              
              <div className="flex">
                <span className="text-white inline-flex items-center px-3 text-sm text-gray-900 bg-gray-400 border border-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                  <Image src={SearchbarIMG} alt="Edit Favorite" />                  
                </span>
                <input type="text" id="website-admin" className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search stations"/>
              </div>
            </form>
          </header>
          <ol className="my-4 w-full text-sm text-left rtl:text-right bg-gray-200 p-2 text-black">
            <li className="flex gap-3 p-4 text-xl border-b bg-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <button className="flex justify-center items-center rounded-full bg-gray-400 w-14 h-14"><Image src={StopIMG} alt="Stop radio" /></button> 
                <span>{currentRadio.name}</span>
            </li>
            <li className="text-xl flex justify-between p-4 border-b bg-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 my-2">
              <div className="flex gap-4">
                <button className="flex justify-center items-center rounded-full bg-gray-400 w-14 h-14"><Image className="ml-1" src={PlayIMG} alt="Play radio" /></button> 
                <span>
                  <span className="flex flex-col font-semibold">CNR-R</span> 
                  <small className="text-sm">China, news</small> 
                </span>
              </div>
              <div className="flex gap-4">
                <button title="edit favorite">
                  <Image src={EditIMG} alt="Edit Favorite" />                  
                </button>
                <button title="delete favorite">
                  <Image src={DeleteIMG} alt="Delete Favorite" />                
                </button>
              </div>
            </li>
          </ol>
        </div>
    );    
}