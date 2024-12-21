"use client";

import Image from "next/image";;
import MenuIMG from "../../assets/icons/menu.svg";
import FavoriteList from "./components/FavoriteList";
import {getRadios} from "../services/API"
import { Radio } from "./models/Radio";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [showMenu, setShowMenu] = useState(true);
  const [radios, setRadios] = useState<Radio[]>([]);
  const [page, setPage] = useState<number>(0);
  const [currRadio, setCurrRadio] = useState<Radio>({
    stationuuid: "",
    name: "",
    url: "",
    country: "",
    state: "",
    favorite: false
  });
  
  const audio = useRef<HTMLAudioElement>(null);
  const [favorites, setFavorites] = useState<Radio[]>([]);
  const [favsBackup, setFavsBackup] = useState<Radio[]>([]);
  
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
    if(audio.current){
      audio.current.src = radio.url;           
    }

    setShowMenu(false);
  }

  const loadMore = () => {
    console.log('# loading more...');
    setPage(page+1);
  }

  const getFavorites = () => {        
    const favs = localStorage.getItem("favorites")
    if (favs) {
      const list: Radio[] = JSON.parse(favs)
      console.log('# favorites list ', list);
      setFavorites(list);
      setFavsBackup(list);
    }
    return favs;
  }

  function removeDuplicates(arr: Radio[], key: CallableFunction) {
    return [
      ...new Map(
        arr.map(x => [key(x), x])
      ).values()
    ];
  }

  const handleMenu = () => {
    setShowMenu(!showMenu)
  }

  return (
    <>
      <audio ref={audio} src=""/>                     
      <div className="flex h-100">    
        <aside>
          <button className="fixed z-40 left-4 top-4" onClick={() => handleMenu()}>
            <Image src={MenuIMG} alt={"favorite"}/>             
          </button>      
          <div id="logo-sidebar" className={`top-0 left-0  w-64 h-screen pt-4 pr-4 bg-black border-r border-gray-200 ${showMenu ? 'block' : 'hidden'} fixed sm:relative overflow-auto`} aria-label="Sidebar">
            <div className="flex flex-col items-center gap-4 h-90 px-3 pb-4">
              <ul className="space-y-2 mt-10 font-medium">
                {
                  radios.length > 0 && radios.map((radio: Radio) => (
                    <li key={radio.stationuuid} onClick={() => changeRadio(radio)}>
                        <a href="#" className="flex items-center p-2 text-white rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">                  
                          <span className="ms-3">{radio.name}</span>
                        </a>
                    </li>
                  ))
                }                                    
              </ul>
              <button className="bg-lime-600 p-2" onClick={() => loadMore()}>Load more...</button>
            </div>        
          </div>
        </aside>
        <main className="flex flex-col justify-start p-8 w-full h-100 bg-gray-300">
          <h1 className="text-2xl pt-3">Radio Browser</h1>        
          {
            radios.length > 0 && 
              <FavoriteList currentRadio={currRadio} favorites={favorites} setFavorites={setFavorites} getFavorites={getFavorites} audio={audio} changeRadio={changeRadio} favsBackup={favsBackup}/>          
          }
        </main>
      </div>      
    </>
  );
}
