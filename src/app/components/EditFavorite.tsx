import { Button, Label, Modal, TextInput } from "flowbite-react";
import { Radio } from "../models/Radio";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";

interface WrapperProps {
    openModal: boolean;
    setOpenModal: Dispatch<SetStateAction<boolean>>;
    favEdit: Radio;
    setFavorites: Dispatch<SetStateAction<Radio[]>>;
    getFavorites: CallableFunction;
}

export default function EditFavorite({openModal, setOpenModal, favEdit, setFavorites, getFavorites}: WrapperProps) {
    const [name, setName] = useState<string>(favEdit.name.trim());

    const save = () => {
        const favs: Radio[] = JSON.parse(getFavorites());
        console.log('# favs favorites ', favs);
        const filtered = favs.map((favorite: Radio) => {
            if(favorite.stationuuid == favEdit.stationuuid){
                return ({
                    ...favorite,
                    name
                })
            }        
            return favorite;    
        })

        console.log('# filtered ', filtered);
        localStorage.setItem('favorites', JSON.stringify(filtered));   
        setFavorites(filtered);
        setOpenModal(false);
    }

    const handleName = (event: ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value)
    }
    return (
        <Modal show={openModal} onClose={() => setOpenModal(false)}>
            <Modal.Header>Favorite Edit</Modal.Header>
            <Modal.Body>
                <div className="space-y-6">
                    <div className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                        <form className="flex max-w-md flex-col gap-4" action={() => save()}>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="name" value="Radio Name" />
                                </div>
                                <TextInput id="name" type="text" value={name} onChange={handleName}/>
                            </div>                                                    
                        </form>                        
                    </div>               
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => save()}>Save</Button>
                <Button color="gray" onClick={() => setOpenModal(false)}>Cancel</Button>
            </Modal.Footer>
        </Modal>
    )
}