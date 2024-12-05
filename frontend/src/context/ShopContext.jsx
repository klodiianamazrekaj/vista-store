/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {

    const valuta = '€';
    const tarifa_dorezimit = 10;
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [kerko, setKerko] = useState('');
    const [shfaqKerkimin, setShfaqKerkimin] = useState(false);
    const [artikujtNeKarroce, setArtikujtNeKarroce] = useState({});
    const [produktet, setProduktet] = useState([]);
    const [token, setToken] = useState('');
    const navigo = useNavigate();

    const shtoNeKarroce = async (itemId, madhesia) => {

        if (!madhesia) {
            toast.error('Ju lutem zgjidhni madhësinë e produktit');
            return;
        }

        let teDhenatEKarroces = structuredClone(artikujtNeKarroce);

        if (teDhenatEKarroces[itemId]) {
            if (teDhenatEKarroces[itemId][madhesia]) {
                teDhenatEKarroces[itemId][madhesia] += 1;
            }
            else {
                teDhenatEKarroces[itemId][madhesia] = 1;
            }
        } else {
            teDhenatEKarroces[itemId] = {};
            teDhenatEKarroces[itemId][madhesia] = 1;
        }
        setArtikujtNeKarroce(teDhenatEKarroces);

        // toast.success('Produkti është shtuar me sukses në karrocë');
    }

    const merrNumrinArtikujveNeKarroce = () => {
        let numriTotal = 0;
        for (const items in artikujtNeKarroce) {
            for (const item in artikujtNeKarroce[items]) {
                try {
                    if (artikujtNeKarroce[items][item] > 0) {
                        numriTotal += artikujtNeKarroce[items][item];
                    }
                } catch (error) {
                    //
                }
            }
        }
        return numriTotal;
    }

    useEffect(() => {
        console.log(artikujtNeKarroce);
    }, [artikujtNeKarroce]);

    const perditesoTotalinProdukteve = async (itemId, madhesia, sasia) => {
        let teDhenatEKarroces = structuredClone(artikujtNeKarroce);

        teDhenatEKarroces[itemId][madhesia] = sasia;

        setArtikujtNeKarroce(teDhenatEKarroces);
    }

    const merrShumenKarroces = () => {
        let shumaKarroces = 0;

        for (const items in artikujtNeKarroce) {
            let infoArtikullit = produktet.find(produkti => produkti._id === items);
            for (const item in artikujtNeKarroce[items]) {
                try {
                    if (artikujtNeKarroce[items][item] > 0) {
                        shumaKarroces += infoArtikullit.cmimi * artikujtNeKarroce[items][item];
                    }
                } catch (error) {
                    //
                }
            }
        }
        return shumaKarroces;
    }

    const merrTeDhenatEProduktit = async () => {
        try {
            const response = await axios.get(backendUrl + "/api/produkti/lista_produkteve");
            console.log(response.data);
            if (response.data.success) {
                setProduktet(response.data.produktet);
            }
            else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    useEffect(() => {
        merrTeDhenatEProduktit();
    }, []);

    const value = {
        produktet, valuta, tarifa_dorezimit,
        kerko, setKerko, shfaqKerkimin, setShfaqKerkimin,
        artikujtNeKarroce, setArtikujtNeKarroce, shtoNeKarroce,
        merrNumrinArtikujveNeKarroce, perditesoTotalinProdukteve,
        merrShumenKarroces, navigo, backendUrl,
        setToken, token,

    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;