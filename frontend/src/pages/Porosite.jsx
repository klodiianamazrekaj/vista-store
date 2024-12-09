/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react"
import { ShopContext } from "../context/ShopContext"
import Titulli from "../components/Titulli";
import axios from "axios";

const Porosite = () => {
    const { backendUrl, token, valuta } = useContext(ShopContext);

    const [teDhenatPorosise, setTeDhenatPorosise] = useState([]);

    const shfaqTeDhenatPorosise = async () => {
        try {
            if (!token) {
                return null;
            }

            const response = await axios.post(backendUrl + "/api/porosia/porosite_perdoruesit", {}, { headers: { token } });
            if (response.data.success) {
                const teGjithaPorosite = [];
                response.data.porosite.map((porosia) => {
                    porosia.produktet.map((produkti) => {
                        produkti['statusi'] = porosia.statusi;
                        produkti['pagesa'] = porosia.pagesa;
                        produkti['metodaPageses'] = porosia.metodaPageses;
                        produkti['data'] = porosia.data;

                        teGjithaPorosite.push(produkti);
                    })
                })
                setTeDhenatPorosise(teGjithaPorosite.reverse());
            }
        } catch (error) {
            //
        }
    }

    useEffect(() => {
        shfaqTeDhenatPorosise();
    }, [token])

    return (
        <div className="border-t pt-16">
            <div className="text-2xl">
                <Titulli tekst1={'POROSITË E'} tekst2={'MIA'} />
            </div>

            <div className="">
                {
                    teDhenatPorosise.map((item, index) => (
                        <div key={index} className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div className="flex items-start gap-6 text-sm">
                                <img src={item.foto[0]} className="w-16 sm:w-20" alt="" />
                                <div>
                                    <p className="sm:text-base font-medium">{item.emri}</p>
                                    <div className="flex items-center gap-3 mt-2 text-base text-gray-700">
                                        <p>{valuta}{item.cmimi}</p>
                                        <p>Sasia: {item.sasia}</p>
                                        <p>Madhësia: {item.madhesia}</p>
                                    </div>
                                    <p className="mt-1">Data: <span className="text-gray-400">{new Date(item.data).toDateString()}</span></p>
                                    <p className="mt-1">Pagesa: <span className="text-gray-400">{item.metodaPageses}</span></p>
                                </div>
                            </div>

                            <div className="md:w-1/2 flex justify-between">
                                <div className="flex items-center gap-2">
                                    <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                                    <p className="text-sm md:text-base">{item.statusi}</p>
                                </div>
                                <button onClick={shfaqTeDhenatPorosise} className="border px-4 py-2 text-sm font-medium rounded-sm">SHIKO STATUSIN E POROSISË</button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Porosite