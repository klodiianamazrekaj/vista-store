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

        let teDhenatNeKarroce = structuredClone(artikujtNeKarroce);

        if (teDhenatNeKarroce[itemId]) {
            if (teDhenatNeKarroce[itemId][madhesia]) {
                teDhenatNeKarroce[itemId][madhesia] += 1;
            }
            else {
                teDhenatNeKarroce[itemId][madhesia] = 1;
            }
        } else {
            teDhenatNeKarroce[itemId] = {};
            teDhenatNeKarroce[itemId][madhesia] = 1;
        }
        setArtikujtNeKarroce(teDhenatNeKarroce);

        if (token) {
            try {
                await axios.post(backendUrl + '/api/karroca/shto_ne_karroce', { itemId, madhesia }, { headers: { token } });
            } catch (error) {
                console.log(error);
                toast.error(error.message);
            }
        }
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
        let teDhenatNeKarroce = structuredClone(artikujtNeKarroce);

        teDhenatNeKarroce[itemId][madhesia] = sasia;

        setArtikujtNeKarroce(teDhenatNeKarroce);

        if (token) {
            try {
                await axios.post(backendUrl + '/api/karroca/perditeso_karrocen', { itemId, madhesia, sasia }, { headers: { token } });
            } catch (error) {
                console.log(error);
                toast.error(error.message);
            }
        }
    }

    const merrShumenKarroces = () => {
        let shumaKarroces = 0;

        for (const items in artikujtNeKarroce) {
            let infoArtikullit = produktet.find(produkt => produkt._id === items);
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

    const merrKarrocenPerdoruesit = async (token) => {
        try {
            const response = await axios.post(backendUrl + '/api/karroca/merr_karrocen_perdoruesit', {}, { headers: { token } });

            if (response.data.success) {
                setArtikujtNeKarroce(response.data.teDhenatNeKarroce);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    useEffect(() => {
        merrTeDhenatEProduktit();
    }, []);

    useEffect(() => {
        if (!token && localStorage.getItem('token')) {
            setToken(localStorage.getItem('token'))
            merrKarrocenPerdoruesit(localStorage.getItem('token'));
        }
    }, [])

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