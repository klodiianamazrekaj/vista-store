/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react"
import axios from "axios";
import { backendUrl, valuta } from "../App";
import { toast } from "react-toastify";

const Lista = ({ token }) => {

    const [lista, setLista] = useState([]);

    // funksion per marrjen e listes se produkteve te shtuara
    const merrListen = async () => {
        try {
            const response = await axios.get(backendUrl + "/api/produkti/lista_produkteve");
            if (response.data.success) {
                setLista(response.data.produktet);
            }
            else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    const fshijProduktin = async (id) => {
        try {
            const response = await axios.post(backendUrl + "/api/produkti/fshij_produktin", { id }, { headers: { token } });

            if (response.data.success) {
                toast.success(response.data.message);

                await merrListen();
            }
            else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    useEffect(() => {
        merrListen();
    }, [])

    return (
        <>
            <p className="mb-2">Lista e Të Gjitha Produkteve</p>

            <div className="flex flex-col gap-2">

                {/* titulli i tabeles se listes */}

                <div className="hidden md:!grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm">
                    <b>Foto</b>
                    <b>Emri</b>
                    <b>Kategoria</b>
                    <b>Çmimi</b>
                    <b className="text-center">Aksion</b>
                </div>

                {/* lista e produkteve */}

                {
                    lista.map((item, index) => (
                        <div className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm" key={index}>
                            <img className="w-12" src={item.foto[0]} />
                            <p>{item.emri}</p>
                            <p>{item.kategoria}</p>
                            <p>{valuta}{item.cmimi}</p>
                            <p onClick={() => fshijProduktin(item._id)} className="text-right md:text-center cursor-pointer text-lg">X</p>
                        </div>
                    ))
                }

            </div>
        </>
    )
}

export default Lista