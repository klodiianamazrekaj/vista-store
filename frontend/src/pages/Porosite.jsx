/* eslint-disable no-unused-vars */
import { useContext } from "react"
import { ShopContext } from "../context/ShopContext"
import Titulli from "../components/Titulli";

const Porosite = () => {
    const { products, valuta } = useContext(ShopContext);
    return (
        <div className="border-t pt-16">
            <div className="text-2xl">
                <Titulli tekst1={'POROSITË E'} tekst2={'MIA'} />
            </div>

            <div className="">
                {
                    products.slice(1, 4).map((item, index) => (
                        <div key={index} className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div className="flex items-start gap-6 text-sm">
                                <img src={item.image[0]} className="w-16 sm:w-20" alt="" />
                                <div>
                                    <p className="sm:text-base font-medium">{item.name}</p>
                                    <div className="flex items-center gap-3 mt-2 text-base text-gray-700">
                                        <p className="text-lg">{valuta}{item.price}</p>
                                        <p>Sasia: 1</p>
                                        <p>Madhësia: M</p>
                                    </div>
                                    <p className="mt-2">Data: <span className="text-gray-400">25 Tetor 2024</span></p>
                                </div>
                            </div>

                            <div className="md:w-1/2 flex justify-between">
                                <div className="flex items-center gap-2">
                                    <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                                    <p className="text-sm md:text-base">GATI PËR DORËZIM</p>
                                </div>
                                <button className="border px-4 py-2 text-sm font-medium rounded-sm">SHIKO STATUSIN E POROSISË</button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Porosite