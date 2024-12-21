import axios from 'axios';

const baseURL = "https://de1.api.radio-browser.info/json/stations/search?limit=10"

export async function getRadios(page){
    return new Promise((resolve, reject) => {
        const list = [];
        axios.get(baseURL+"&offset="+page).then((radios) => {
            resolve(radios.data);
        }).catch(e => reject(e));
    
        return list;
    })
}