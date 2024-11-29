/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext } from "react";
import { products } from "../assets/assets";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {

    const valuta = '€';
    const tarifa_dorezimit = 10;

    const value = {
        products, valuta, tarifa_dorezimit
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;