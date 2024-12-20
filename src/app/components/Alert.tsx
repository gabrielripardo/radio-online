import { Toast } from "flowbite-react";
import { HiCheck, HiX } from "react-icons/hi";
import { useEffect } from "react";

interface WrapperProps {
    // title: string;
    message: string;
    type: string;
    setShowAlert: Function;
}

export default function Alert({message, type, setShowAlert}: WrapperProps) {

    const autoClose = () => {
        setTimeout(() => {
            setShowAlert(false);
        }, 5000);
    }

    const close = () => {
        setShowAlert(false)
    }

    useEffect(() => {
        autoClose();
    }, [])

    return (        
        <Toast className="fixed right-3 top-3">
                {
                    type == "success" ? (
                        <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-100 text-cyan-500 dark:bg-cyan-800 dark:text-cyan-200">
                            <HiCheck className="h-5 w-5" />                
                        </div>
                    )
                    : type == "error" && (
                        <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
                            <HiX className="h-5 w-5" />
                        </div>
                    )
                }
            <div className="ml-3 text-sm font-normal">{message}</div>
            <Toast.Toggle onClick={() => close()} />
        </Toast>            
    )
}