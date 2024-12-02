/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import { products } from "../assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

export const ShopContext = createContext();

const ShopContextProvider = (props) => {

    const valuta = '€';
    const tarifa_dorezimit = 10;
    const [kerko, setKerko] = useState('');
    const [shfaqKerkimin, setShfaqKerkimin] = useState(false);
    const [artikujtNeKarroce, setArtikujtNeKarroce] = useState({});
    const navigo = useNavigate();

    const shtoNeKarroce = async (itemId, size) => {

        if (!size) {
            toast.error('Ju lutem zgjidhni madhësinë e produktit');
            return;
        }

        let teDhenatEKarroces = structuredClone(artikujtNeKarroce);

        if (teDhenatEKarroces[itemId]) {
            if (teDhenatEKarroces[itemId][size]) {
                teDhenatEKarroces[itemId][size] += 1;
            }
            else {
                teDhenatEKarroces[itemId][size] = 1;
            }
        } else {
            teDhenatEKarroces[itemId] = {};
            teDhenatEKarroces[itemId][size] = 1;
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

    const perditesoTotalinProdukteve = async (itemId, size, quantity) => {
        let teDhenatEKarroces = structuredClone(artikujtNeKarroce);

        teDhenatEKarroces[itemId][size] = quantity;

        setArtikujtNeKarroce(teDhenatEKarroces);
    }

    const merrShumenKarroces = () => {
        let shumaKarroces = 0;

        for (const items in artikujtNeKarroce) {
            let infoArtikullit = products.find(produkti => produkti._id === items);
            for (const item in artikujtNeKarroce[items]) {
                try {
                    if (artikujtNeKarroce[items][item] > 0) {
                        shumaKarroces += infoArtikullit.price * artikujtNeKarroce[items][item];
                    }
                } catch (error) {
                    //
                }
            }
        }
        return shumaKarroces;
    }

    const value = {
        products, valuta, tarifa_dorezimit,
        kerko, setKerko, shfaqKerkimin, setShfaqKerkimin,
        artikujtNeKarroce, shtoNeKarroce,
        merrNumrinArtikujveNeKarroce, perditesoTotalinProdukteve,
        merrShumenKarroces, navigo

    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;