/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, valuta } from "../App";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const Porosite = ({ token }) => {

    const [porosite, setPorosite] = useState([]);

    const merrTeGjithaPorosite = async () => {
        if (!token) {
            return null;
        }

        try {
            const response = await axios.post(backendUrl + "/api/porosia/lista_porosive", {}, { headers: { token } });
            if (response.data.success) {
                setPorosite(response.data.porosite.reverse());
            }
            else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    const statusHandler = async (e, porosiaId) => {
        try {
            const response = await axios.post(backendUrl + "/api/porosia/statusi", { porosiaId, statusi: e.target.value }, { headers: { token } });
            if (response.data.success) {
                await merrTeGjithaPorosite();
            }
        } catch (error) {
            console.log(error);
            toast.error(response.data.message);
        }
    }

    useEffect(() => {
        merrTeGjithaPorosite();
    }, [token])

    return (
        <div>
            <h3>Faqja e Porosive</h3>

            <div>
                {
                    porosite.map((porosia, index) => (
                        <div key={index} className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700">
                            <img className="w-12" src={assets.parcel_icon} alt="" />

                            <div>
                                <div>
                                    {
                                        porosia.produktet.map((produkti, index) => {
                                            if (index === porosia.produktet.length - 1) {
                                                return <p className="py-0.5" key={index}>{produkti.emri} x {produkti.sasia}
                                                    <span>{produkti.madhesia}</span>
                                                </p>
                                            }
                                            else {
                                                return <p className="py-0.5" key={index}>{produkti.emri} x {produkti.sasia}
                                                    <span>{produkti.madhesia}</span> ,
                                                </p>
                                            }
                                        })
                                    }
                                </div>

                                <p className="mt-3 mb-2 font-medium">{porosia.adresa.emriPerdoruesit + " " + porosia.adresa.mbiemriPerdoruesit}</p>

                                <div>
                                    <p>{porosia.adresa.adresa + ","}</p>
                                    <p>{porosia.adresa.qyteti + ", " + porosia.adresa.regjioni + " | " + porosia.adresa.shteti + ", " + porosia.adresa.zipkodi}</p>
                                </div>
                                <p>{porosia.adresa.telefoni}</p>
                            </div>

                            <div>
                                <p className="text-sm sm:text-[15px]">Produktet: {porosia.produktet.length}</p>
                                <p className="mt-3">Metoda e Pagesës: {porosia.metodaPageses}</p>
                                <p>Pagesa: {porosia.pagesa ? 'Përfunduar' : 'Në Pritje'}</p>
                                <p>Data: {new Date(porosia.data).toLocaleDateString()}</p>
                            </div>

                            <p className="text-sm sm:text-[15px]">{valuta}{porosia.shuma}</p>

                            <select onChange={(e) => statusHandler(e, porosia._id)} value={porosia.statusi} className="p-2 font-semibold">
                                <option value="Porosia e Vendosur">Porosia e Vendosur</option>
                                <option value="Duke u Paketuar">Duke u Paketuar</option>
                                <option value="Dërguar">Dërguar</option>
                                <option value="Në Dorëzim">Në Dorëzim</option>
                                <option value="Dorëzuar">Dorëzuar</option>
                            </select>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Porosite