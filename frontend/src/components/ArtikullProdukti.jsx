/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";

const ArtikullProdukti = ({ id, foto, emri, cmimi }) => {

    const { valuta } = useContext(ShopContext);

    return (
        <Link className="text-gray-700 cursor-pointer" to={`/produkti/${id}`}>
            <div className="overflow-hidden">
                <img src={foto[0]} className="hover:scale-110 transition ease-in-out" alt="" />
            </div>
            <p className=" pt-3 pb-1 text-sm">{emri}</p>
            <p className="text-sm font-medium">{valuta}{cmimi}</p>
        </Link>
    )
}

export default ArtikullProdukti