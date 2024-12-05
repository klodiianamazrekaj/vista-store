import { useContext, useEffect, useState } from "react"
import { ShopContext } from "../context/ShopContext"
import Titulli from "./Titulli";
import ArtikullProdukti from "../components/ArtikullProdukti";

const KoleksioniFundit = () => {

    const { produktet } = useContext(ShopContext);
    const [produktetFundit, setProduktetFundit] = useState([]);

    useEffect(() => {
        setProduktetFundit(produktet.slice(0, 10));
    }, [produktet]);

    return (
        <div className="my-10">
            <div className="text-center py-8 text-3xl">
                <Titulli tekst1={'KOLEKSIONI I'} tekst2={'FUNDIT'} />
                <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
                    Zbuloni risitë më të fundit dhe freskoni gardërobën tuaj me elegancë dhe klas!
                </p>
            </div>

            {/* shfaqja e produkteve */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
                {
                    produktetFundit.map((item, index) => (
                        <ArtikullProdukti key={index} id={item._id} foto={item.foto} emri={item.emri} cmimi={item.cmimi} />
                    ))
                }
            </div>
        </div>
    )
}

export default KoleksioniFundit