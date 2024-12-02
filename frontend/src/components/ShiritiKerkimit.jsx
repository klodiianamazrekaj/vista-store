/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";

const ShiritiKerkimit = () => {

    const { kerko, setKerko, shfaqKerkimin, setShfaqKerkimin } = useContext(ShopContext);
    const [eDukshme, setEDukshme] = useState(false);
    const lokacioni = useLocation();

    useEffect(() => {
        if (lokacioni.pathname.includes('koleksioni')) {
            setEDukshme(true);
        }
        else {
            setEDukshme(false);
        }
    }, [lokacioni])

    return shfaqKerkimin && eDukshme ? (
        <div className="border bg-gray-50 text-center">
            <div className="inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2">
                <input value={kerko} onChange={(e) => setKerko(e.target.value)} type="text" placeholder="Kërko" className="flex-1 outline-none bg-inherit text-sm" />
                <img className="w-4" src={assets.search_icon} alt="" />
            </div>

            <img onClick={() => setShfaqKerkimin(false)} className="inline w-3 cursor-pointer" src={assets.cross_icon} alt="" />
        </div>
    ) : null
}

export default ShiritiKerkimit