import { useContext, useEffect, useState } from "react"
import { ShopContext } from '../context/ShopContext'
import Titulli from './Titulli'
import ArtikullProdukti from "./ArtikullProdukti";

const BestSeller = () => {

    const { products } = useContext(ShopContext);
    const [bestSeller, setBestSeller] = useState([]);

    useEffect(() => {
        const produktiMeIMire = products.filter((item) => (
            item.bestseller
        ));
        setBestSeller(produktiMeIMire.slice(0, 5));
    }, [])

    return (
        <div className="my-10">
            <div className="text-center text-3xl py-8">
                <Titulli tekst1={'PRODUKTET MË TË'} tekst2={'SHITURA'} />
                <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
                    Eksploroni koleksionin tonë të bestseller-ave!
                    Këto produkte janë zgjedhjet më të preferuara nga klientët tanë, të cilat kombinojnë cilësinë, stilin dhe vlerën më të mirë.
                </p>
            </div>

            {/* shfaqja e produkteve bestseller */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
                {
                    bestSeller.map((item, index) => (
                        <ArtikullProdukti key={index} id={item._id} foto={item.foto} emri={item.emri} cmimi={item.cmimi} />
                    ))
                }
            </div>
        </div>
    )
}

export default BestSeller