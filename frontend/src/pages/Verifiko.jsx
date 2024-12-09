/* eslint-disable no-unused-vars */
import { useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Verifiko = () => {

    const { navigo, token, setArtikujtNeKarroce, backendUrl } = useContext(ShopContext);
    const [searchParams, setSearchParams] = useSearchParams();

    const success = searchParams.get('success');
    const porosiaId = searchParams.get('porosiaId');

    const verifikoPagesen = async () => {
        try {
            if (!token) {
                return null;
            }
            const response = await axios.post(backendUrl + "/api/porosia/verifiko_stripe", { success, porosiaId }, { headers: { token } });
            if (response.data.success) {
                setArtikujtNeKarroce({});
                navigo('/porosite');
            }
            else {
                navigo('/ballina');
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    useEffect(() => {
        verifikoPagesen();
    }, [token])

    return (
        <div>Verifiko</div>
    )
}

export default Verifiko