/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react"
import { ShopContext } from "../context/ShopContext"
import Titulli from "./Titulli";
import ArtikullProdukti from "./ArtikullProdukti";

const ProduktetNgjashme = ({ kategoria, nenkategoria }) => {

    const { products } = useContext(ShopContext);
    const [teNgjashme, setTeNgjashme] = useState([]);

    useEffect(() => {
        if (products.length > 0) {
            let kopjoProduktet = products.slice();

            kopjoProduktet = kopjoProduktet.filter((item) => kategoria === item.kategoria);
            kopjoProduktet = kopjoProduktet.filter((item) => nenkategoria === item.nenkategoria);

            setTeNgjashme(kopjoProduktet.slice(0, 5));
        }
    }, [products])

    return (
        <div className="my-24">
            <div className="text-center text-3xl py-2">
                <Titulli tekst1={'PRODUKTE TË '} tekst2={'NGJASHME'} />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
                {teNgjashme.map((item, index) => (
                    <ArtikullProdukti key={index} id={item._id} emri={item.emri} cmimi={item.cmimi} foto={item.foto} />
                ))}
            </div>
        </div>
    )
}

export default ProduktetNgjashme