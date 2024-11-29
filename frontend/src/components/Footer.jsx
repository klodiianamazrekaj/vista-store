import { assets } from "../assets/assets"

const Footer = () => {
    return (

        <div>

            <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
                <div>
                    <img className="mb-5 w-32" src={assets.logo} alt="" />
                    <p className="w-full md:w-2/3 text-gray-600">
                        Krijoni stilin tuaj unik me koleksionin tonë të rrobave të modës! Eksploroni një gamë të gjerë produktesh për çdo shije dhe ngjarje.
                        Ofrojmë cilësi të lartë, çmime të arsyeshme dhe shërbim të shpejtë.
                        Bëni shopping online dhe merrni atë që i përshtatet stilit tuaj!
                    </p>
                </div>

                <div>
                    <p className="text-xl font-medium mb-5">KOMPANIA</p>
                    <ul className="flex flex-col gap-1 text-gray-600">
                        <li>BALLINA</li>
                        <li>RRETH NESH</li>
                        <li>DËRGESA</li>
                        <li>POLITIKA E PRIVATËSISË</li>
                    </ul>
                </div>

                <div>
                    <p className="text-xl font-medium mb-5">KONTAKTONI ME NE</p>
                    <ul className="flex flex-col gap-1 text-gray-600">
                        <li>+ 383 49 888 999</li>
                        <li>contact@forever.com</li>
                    </ul>
                </div>
            </div>

            <div>
                <hr />
                <p className="py-5 text-sm text-center">Copyright 2024@ forever.com - All Rights Reserved</p>
            </div>

        </div>
    )
}

export default Footer