import { assets } from "../assets/assets"

const Politikat = () => {
    return (
        <div className="flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-xs md:text-base text-gray-700">

            <div>
                <img src={assets.exchange_icon} className="w-12 m-auto mb-5" alt="" />
                <p className="font-semibold">Politikë e Lehtë Ndërrimi</p>
                <p className="text-gray-400">Ne ofrojmë një politikë ndërrimi pa komplikime.</p>
            </div>

            <div>
                <img src={assets.quality_icon} className="w-12 m-auto mb-5" alt="" />
                <p className="font-semibold">Politikë Kthimi Brenda 7 Ditëve</p>
                <p className="text-gray-400">Ne ofrojmë një politikë kthimi falas brenda 7 ditëve.</p>
            </div>

            <div>
                <img src={assets.support_img} className="w-12 m-auto mb-5" alt="" />
                <p className="font-semibold">Shërbimi Ndaj Klientit</p>
                <p className="text-gray-400">Ne ofrojmë shërbim ndaj klientit 24/7.</p>
            </div>

        </div>
    )
}

export default Politikat