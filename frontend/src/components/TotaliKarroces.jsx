/* eslint-disable no-unused-vars */
import { useContext } from "react"
import { ShopContext } from "../context/ShopContext"
import Titulli from "./Titulli"

const TotaliKarroces = () => {
    const { valuta, tarifa_dorezimit, merrShumenKarroces } = useContext(ShopContext);

    return (
        <div className="w-full">
            <div className="text-2xl">
                <Titulli tekst1={"TOTALI I"} tekst2={"PRODUKTEVE"} />
            </div>

            <div className="flex flex-col gap-2 mt-2 text-sm">
                <div className="flex justify-between">
                    <p>Nëntotali</p>
                    <p>{valuta} {merrShumenKarroces()}.00</p>
                </div>
                <hr />
                <div className="flex justify-between">
                    <p>Tarifa e dorëzimit</p>
                    <p>{valuta} {tarifa_dorezimit}.00</p>
                </div>
                <hr />
                <div className="flex justify-between">
                    <b>Totali</b>
                    <b>{valuta} {merrShumenKarroces() === 0 ? 0 : merrShumenKarroces() + tarifa_dorezimit}.00</b>
                </div>
            </div>
        </div>
    )
}

export default TotaliKarroces