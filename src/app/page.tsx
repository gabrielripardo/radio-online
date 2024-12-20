"use client";

import Image from "next/image";;
import MenuIMG from "../../assets/icons/menu.svg";
import FavoriteList from "./components/FavoriteList";
import CheckIMG from "../../assets/icons/check.svg";
import {getRadios} from "../services/API"
import { Radio } from "./models/Radio";
import { useEffect, useState } from "react";

export default function Home() {
  const [radios, setRadios] = useState<Radio[]>([]);
  const [page, setPage] = useState<number>(0);
  const [currRadio, setCurrRadio] = useState<Radio>({
    stationuuid: "",
    name: "",
    url: "",
    country: "",
    state: "",
  });
  const [audio, setAudio] = useState<HTMLAudioElement>(new Audio(currRadio.url));  
  const [favorites, setFavorites] = useState<Radio[]>([]);

  useEffect(() => {    
    getRadios(page).then((list: Radio[]) => {      
      const curList = removeDuplicates(
        [...radios, ...list], 
        (radio: Radio) => radio.stationuuid
      )
      setRadios(curList)
      getFavorites();
      console.log('# list ', list);
    })
  }, [page]);

  const changeRadio = (radio: Radio) => {
    setCurrRadio(radio);        
    audio.src = radio.url;        
  }

  const loadMore = () => {
    console.log('# loading more...');
    setPage(page+1);
  }

  const getFavorites = () => {        
    let favs = localStorage.getItem("favorites")
    if (favs) {
      const list: Radio[] = JSON.parse(favs)
      console.log('# favorites list ', list);
      setFavorites(list);
    }
  }

  function removeDuplicates(arr: Radio[], key: CallableFunction) {
    return [
      ...new Map(
        arr.map(x => [key(x), x])
      ).values()
    ];
}

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
            {
              radios.length > 0 && radios.map((radio: Radio) => (
                <li key={radio.stationuuid} onClick={() => changeRadio(radio)}>
                    <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">                  
                      <span className="ms-3">{radio.name}</span>
                    </a>
                </li>
              ))
            }                        
            <li>
                <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">                  
                  <span className="flex-1 ms-3 whitespace-nowrap">Rádio FM</span>                  
                  <Image src={CheckIMG} alt={"favorite"}/>   
                </a>
            </li>           
          </ul>
          <button className="bg-blue-600 p-2" onClick={() => loadMore()}>Exibir mais...</button>
        </div>        
      </aside>
      <main className="flex flex-col justify-start p-8 w-full bg-gray-300">
        <h1 className="text-center text-2xl">Radio Browser</h1>        
        {
           radios.length > 0 && 
            <FavoriteList currentRadio={currRadio} favorites={favorites} setFavorites={setFavorites} audio={audio}/>          
        }
      </main>
    </div>
  );
}
