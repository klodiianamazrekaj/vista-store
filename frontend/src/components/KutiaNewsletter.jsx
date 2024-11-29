const KutiaNewsletter = () => {

    const onSubmitHandler = (e) => {
        e.preventDefault();
    }

    return (
        <div className="text-center">
            <p className="text-2xl font-medium text-gray-800">Abonohuni Tani & Merrni 20% Zbritje</p>
            <p className="text-gray-400 mt-3">
                Abonohuni tani dhe shfrytëzoni mundësinë për të marrë 20% zbritje në blerjen e ardhshme!
            </p>

            <form onSubmit={onSubmitHandler} className="w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3">
                <input className="w-full sm:flex-1 outline-none" type="email" placeholder="Shkruani email-in tuaj" required />
                <button className="bg-black text-white text-xs px-10 py-4" type="submit">ABONOHU</button>
            </form>
        </div>
    )
}

export default KutiaNewsletter