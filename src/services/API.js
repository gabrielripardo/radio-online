import axios from 'axios';

const baseURL = "https://de1.api.radio-browser.info/json/stations/search?limit=10"

export async function getRadios(){
    return new Promise((resolve, reject) => {
        const list = [];
        axios.get(baseURL).then((radios) => {
            resolve(radios.data);
        });
    
        return list;
    })
}