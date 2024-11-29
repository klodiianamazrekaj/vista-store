import { NavLink } from "react-router-dom"
import { assets } from "../assets/assets"

const Hero = () => {
    return (
        <div className="flex flex-col sm:flex-row border border-gray-400">
            {/* pjesa e majte e hero section */}
            <div className="w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0">
                <div className="text-[#414141]">
                    <div className="flex items-center gap-2">
                        <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
                        <p className="font-medium text-sm md:text-base">PRODUKTI MË I SHITUR</p>
                    </div>
                    <h1 className="prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed">Arritjet e Fundit</h1>
                    <div className="flex items-center gap-2">
                        <NavLink to='/koleksioni'>
                            <p className="font-semibold text-sm md:text-base">POROSIT TANI</p>
                        </NavLink>
                        <p className="w-8 md:w-11 h-[1px] bg-[#414141]"></p>
                    </div>
                </div>
            </div>

            {/* pjesa e djathte e hero section */}
            <img src={assets.hero_img} className="w-full sm:w-1/2" alt="" />
        </div>
    )
}

export default Hero