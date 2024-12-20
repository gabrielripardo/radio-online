import Image from "next/image";
import SearchbarIMG from "../../../assets/icons/searchbar.svg";
import EditIMG from "../../../assets/icons/edit.svg";
import DeleteIMG from "../../../assets/icons/delete.svg";
import StopIMG from "../../../assets/icons/stop.svg";
import PlayIMG from "../../../assets/icons/play.svg";
import FavoriteIMG from "../../../assets/icons/favorite.svg"
import UnFavoriteIMG from "../../../assets/icons/unfavorite.svg"
import { Radio } from "../models/Radio";
import { ChangeEvent, useEffect, useState } from "react";

interface WrapperProps {
  currentRadio: Radio;
  favorites: Radio[];
  setFavorites: Function;
  audio: HTMLAudioElement;  
  changeRadio: Function;
  favsBackup: Radio[];
}

export default function FavoriteList({currentRadio, favorites, setFavorites, audio, changeRadio, favsBackup}: WrapperProps) {          
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [statusAudio, setStatusAudio] = useState<string>("");  
  const [searchKey, setSearchKey] = useState("");      
  
  const handleSearchFav = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchKey(event.target.value)    
    const filtered = favsBackup.filter((f: Radio) => f.name.toLowerCase().includes(event.target.value.toLowerCase()))     
    setFavorites(filtered)
  }

  const addFavorite = () => {
    currentRadio.favorite = true;
    const curList = [...favorites, currentRadio]
    setFavorites(curList);
    localStorage.setItem('favorites', JSON.stringify(curList));
    alert("Favorito adionado")
  }

  const removeFavorite = (curRadio=currentRadio) => {
    currentRadio.favorite = false;
    const curList = [...favorites.filter((f: Radio) => f.stationuuid != curRadio.stationuuid)];
    setFavorites(curList);
    localStorage.setItem('favorites', JSON.stringify(curList));    
    alert("Favorito removido");
  }

  const playFavoriteRadio = (radio: Radio) => {    
    changeRadio(radio);    
  }

  const verifyAudio = () => {
    if(currentRadio.url != ""){      
      setStatusAudio("loading...")     

      audio.onerror = function (error) {
        console.log('# error audio ', error);
        setStatusAudio("Offline radio")   
        setIsPlaying(true);         
      };    

      audio.oncanplay = () => {
        playAudio();      
      }
    }   
  }

  const playAudio = () => {       
    audio.play();  
    setIsPlaying(true);
    setStatusAudio("");              
  }
  
  const stopAudio = () => {
    console.log('# pause');
    audio.pause()
    setIsPlaying(false);
    setStatusAudio("");                
  }

  useEffect(() => {    
    console.log('# currentRadio ', currentRadio);  
    verifyAudio();     
  }, [currentRadio])

    return (
        <div>   
          <div className="my-4 w-full text-sm text-left rtl:text-right p-2 text-black">            
          { /* Current Radio */
              currentRadio.url != "" && (
                <li className="flex justify-between p-4 text-xl border-b bg-blue-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">               
                  <div className="flex gap-3">
                    {
                      isPlaying ?
                        <button className="flex justify-center items-center rounded-full bg-gray-400 w-14 h-14" onClick={() => stopAudio()} disabled={statusAudio == "Offline radio"}><Image src={StopIMG} alt="Stop radio" /></button>                   
                      : 
                        <button className="flex justify-center items-center rounded-full bg-gray-400 w-14 h-14" onClick={() => playAudio()}><Image className="ml-1" src={PlayIMG} alt="Play radio"/></button>       
                    }
                    <span className="flex flex-col ">
                      <span className="font-semibold"><span>{currentRadio.name}</span></span> 
                      {
                        isPlaying ?
                          <small className="text-sm">Playing</small> 
                        :
                          <small className="text-sm">Stoped</small> 
                      }
                      {
                        statusAudio != "" && (
                          <small className="text-sm"> - {statusAudio}</small> 
                        )
                      }
                    </span>
                  </div>
                  <div className="flex gap-4">
                    {
                      !currentRadio.favorite ? (
                        <button title="add favorite" onClick={() => addFavorite()}>
                          <Image src={UnFavoriteIMG} width={42}  alt="add Favorite"  />                  
                        </button>      
                      ) : (
                        <button title="remove favorite" onClick={() => removeFavorite()}>
                          <Image src={FavoriteIMG} width={42} alt="remove Favorite" />                  
                        </button>                   
                      )
                    }
                  </div>
                </li>
              )
            }   
          </div>
          <header className="flex justify-between items-end w-full">
            <h2>Favorite Radios</h2>  
            <form>              
              <div className="flex">
                <span className="text-white inline-flex items-center px-3 text-sm text-gray-900 bg-gray-400 border border-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                  <Image src={SearchbarIMG} alt="Edit Favorite" />                  
                </span>
                <input type="text" id="website-admin" className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search stations" onChange={handleSearchFav} value={searchKey}/>
              </div>
            </form>
          </header>
          <ol className="my-4 w-full text-sm text-left rtl:text-right bg-gray-200 p-2 text-black">                        
            {/* Favorite Radios */}
            {
              favorites.length > 0 && favorites.map(fav => 
                (
                  <li key={fav.stationuuid} className="text-xl flex justify-between p-4 border-b bg-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 my-2">
                    <div className="flex gap-4">
                    {
                      fav.stationuuid == currentRadio.stationuuid && isPlaying ?
                        <button className="flex justify-center items-center rounded-full bg-gray-400 w-14 h-14" onClick={() => stopAudio()} disabled={statusAudio == "Offline radio"}><Image src={StopIMG} alt="Stop radio" /></button>                   
                      : 
                        <button className="flex justify-center items-center rounded-full bg-gray-400 w-14 h-14" onClick={() => playFavoriteRadio(fav)}><Image className="ml-1" src={PlayIMG} alt="Play radio"/></button>       
                    }                      
                      <span className="flex flex-col ">
                        <span className="font-semibold">{fav.name}</span> 
                        <small className="text-sm">{fav.state} - {fav.country}</small> 
                      </span>
                    </div>
                    <div className="flex gap-4">
                      <button title="edit favorite">
                        <Image src={EditIMG} alt="Edit Favorite" />                  
                      </button>
                      <button title="delete favorite" onClick={() => removeFavorite(fav)}>
                        <Image src={DeleteIMG} alt="Delete Favorite" />                
                      </button>
                    </div>
                  </li>                
                )                
              )                            
            }
          </ol>
        </div>
    );    
}