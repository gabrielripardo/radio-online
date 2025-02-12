"use client";

import Image from "next/image";
import SearchbarIMG from "../../../assets/icons/searchbar.svg";
import EditIMG from "../../../assets/icons/edit.svg";
import DeleteIMG from "../../../assets/icons/delete.svg";
import StopIMG from "../../../assets/icons/stop.svg";
import PlayIMG from "../../../assets/icons/play.svg";
import FavoriteIMG from "../../../assets/icons/favorite.svg"
import UnFavoriteIMG from "../../../assets/icons/unfavorite.svg"
import { Radio } from "../models/Radio";
import AlertModel from "../models/AlertModel"
import { ChangeEvent, Dispatch, RefObject, SetStateAction, useEffect, useState } from "react";
import Alert from "./Alert"
import EditFavorite from "./EditFavorite";

interface WrapperProps {
  currentRadio: Radio;
  favorites: Radio[];
  setFavorites: Dispatch<SetStateAction<Radio[]>>;
  audio: RefObject<HTMLAudioElement | null>;  
  changeRadio: CallableFunction;
  favsBackup: Radio[];
  getFavorites: CallableFunction;
}

export default function FavoriteList({currentRadio, favorites, setFavorites, audio, changeRadio, favsBackup, getFavorites}: WrapperProps) {          
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [statusAudio, setStatusAudio] = useState<string>("");  
  const [searchKey, setSearchKey] = useState("");      
  const [showAlert, setShowAlert] = useState(false);
  const [dataAlert, setDataAlert] = useState<AlertModel>({
    message: "",
    type: ""
  });
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [favEdit, setFavEdit] = useState<Radio>(currentRadio);
  
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
    setShowAlert(true);
    setDataAlert({message: "Favorite saved successfully!", type: "success"})
  }

  const removeFavorite = (curRadio=currentRadio) => {
    currentRadio.favorite = false;
    const curList = [...favorites.filter((f: Radio) => f.stationuuid != curRadio.stationuuid)];
    setFavorites(curList);
    localStorage.setItem('favorites', JSON.stringify(curList));    
    setShowAlert(true);
    setDataAlert({message: "Favorite has been deleted!", type: "error"})
  }

  const editFavorite = (radio: Radio) => {
    setFavEdit(radio);
    setOpenModal(true);
  }

  const playFavoriteRadio = (radio: Radio) => {    
    changeRadio(radio);    
  }

  const verifyAudio = () => {
    if(currentRadio.url != ""){      
      setStatusAudio("loading...")     

      if(audio.current){
        audio.current.onerror = function (error) {          
          setStatusAudio("Offline radio")   
          setIsPlaying(true);         
        };    
  
        audio.current.oncanplay = () => {
          playAudio();      
        }
      }
    }   
  }

  const playAudio = () => {       
    if(audio.current){
      audio.current.play();  
      setIsPlaying(true);
      setStatusAudio("");              
    }
  }
  
  const stopAudio = () => {
    if(audio.current){      
      audio.current.pause()
      setIsPlaying(false);
      setStatusAudio("");                
    }
  }

  useEffect(() => {        
    verifyAudio();     
  }, [currentRadio])

    return (
        <div>   
          { showAlert && 
            <Alert message={dataAlert.message} type={dataAlert.type} setShowAlert={setShowAlert} />
          }
          { openModal &&
            <EditFavorite openModal={openModal} setOpenModal={setOpenModal} setFavorites={setFavorites} getFavorites={getFavorites} favEdit={favEdit}/>
          }
          <div className="my-4 w-full text-sm text-left rtl:text-right p-2 text-black">            
          { /* Current Radio */
              currentRadio.url != "" && (
                <li className="flex justify-between p-4 text-xl border-b bg-lime-300 hover:bg-gray-50">               
                  <div className="flex gap-3">
                    {
                      isPlaying ?
                        <button className="flex justify-center items-center rounded-full bg-gray-400 w-14 h-14" onClick={() => stopAudio()} disabled={statusAudio == "Offline radio"}><Image src={StopIMG} alt="Stop radio" /></button>                   
                      : 
                        <button className="flex justify-center items-center rounded-full bg-gray-400 w-14 h-14" onClick={() => playAudio()}><Image className="ml-1" src={PlayIMG} alt="Play radio"/></button>       
                    }
                    <span className="flex flex-col w-30 sm:w-100">
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
              favorites.length > 0 ? favorites.map(fav => 
                (
                  <li key={fav.stationuuid} className="text-xl flex justify-between p-4 border-b  bg-lime-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 my-2">
                    <div className="flex gap-4">
                    {
                      fav.stationuuid == currentRadio.stationuuid && isPlaying ?
                        <button className="flex justify-center items-center rounded-full bg-gray-400 w-14 h-14" onClick={() => stopAudio()} disabled={statusAudio == "Offline radio"}><Image src={StopIMG} alt="Stop radio" /></button>                   
                      : 
                        <button className="flex justify-center items-center rounded-full bg-gray-400 w-14 h-14" onClick={() => playFavoriteRadio(fav)}><Image className="ml-1" src={PlayIMG} alt="Play radio"/></button>       
                    }                      
                      <span className="flex flex-col w-30 sm:w-70">
                        <span className="font-semibold">{fav.name}</span> 
                        <small className="text-sm">{fav.state} - {fav.country}</small> 
                      </span>
                    </div>
                    <div className="flex gap-4 flex-col sm:flex-row items-center justify-center">
                      <button title="edit favorite">
                        <Image src={EditIMG} alt="Edit Favorite" onClick={() => editFavorite(fav)}/>                  
                      </button>
                      <button title="delete favorite" onClick={() => removeFavorite(fav)}>
                        <Image src={DeleteIMG} alt="Delete Favorite" />                
                      </button>
                    </div>
                  </li>                
                )                
              ) : (
                <p className="text-white tex">No favorites found</p>
              )                            
            }
          </ol>
        </div>
    );    
}