import Titulli from '../components/Titulli';
import KutiaNewsletter from '../components/KutiaNewsletter';
import { assets } from '../assets/assets';
const RrethNesh = () => {
    return (
        <div>
            <div className="text-2xl text-center pt-8 border-t">
                <Titulli tekst1={'RRETH'} tekst2={'NESH'} />
            </div>

            <div className='my-10 flex flex-col md:flex-row gap-16'>
                <img src={assets.about_img} className='w-full md:max-w-[450px]' alt="" />
                <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
                    <p>Te Forever, ne besojmë se stili është një shprehje unike e vetes. Me koleksionin tonë të pasur të rrobave të modës, ju mund të krijoni pamjen që reflekton personalitetin dhe shijen tuaj. Pavarësisht nëse kërkoni veshje për përditshmëri, evente të veçanta apo për të rifreskuar garderobën tuaj, ne kemi gjithçka që ju nevojitet.</p>
                    <b className='text-gray-800'>Misioni Ynë</b>
                    <p>Ne jemi të përkushtuar të ofrojmë cilësi të lartë, çmime të arsyeshme dhe një eksperiencë blerjeje të shpejtë dhe të sigurt. Me një gamë të gjerë produktesh të përzgjedhura me kujdes, ju mund të bëni shopping online lehtësisht dhe të gjeni gjithmonë diçka që i përshtatet stilit tuaj unik.</p>
                </div>
            </div>

            <div className='text-xl py-4'>
                <Titulli tekst1={'PSE'} tekst2={'TË NA ZGJIDHNI NE'} />
            </div>

            <div className='flex flex-col md:flex-row text-md mb-20'>
                <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
                    <b>Sigurimi i Cilësisë:</b>
                    <p className='text-gray-600'>Në Forever, ne sigurojmë cilësinë më të lartë për çdo produkt. Çdo artikull kalon kontroll të rreptë për të garantuar qëndrueshmëri dhe përsosmëri. Besoni në cilësinë tonë për një eksperiencë të shkëlqyer!</p>
                </div>

                <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
                    <b>Komoditeti:</b>
                    <p className='text-gray-600'>Në Forever, ne ofrojmë një eksperiencë blerjeje të thjeshtë dhe të rehatshme. Me mundësinë e shopping-ut online dhe shërbim të shpejtë, ju mund të gjeshni dhe të merrni produktet që dëshironi, pa ndonjë shqetësim.</p>
                </div>

                <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
                    <b>Shërbim i Jashtëzakonshëm Ndaj Klientit:</b>
                    <p className='text-gray-600'>Në Forever, ne i kushtojmë rëndësi të veçantë nevojave të klientëve tanë. Ekipi ynë i dedikuar është gjithmonë i gatshëm të ofrojë ndihmën më të mirë dhe të sigurojë një përvojë blerjeje të paharrueshme. Për ne, çdo klient është i rëndësishëm, dhe shërbimi i shkëlqyer është pjesë e misionit tonë!</p>
                </div>
            </div>

            <KutiaNewsletter />
        </div>
    )
}

export default RrethNesh