import { v2 as cloudinary } from "cloudinary";
import produktModel from "../models/produktModel.js";

// funksion per shtimin e produkteve
const shtoProdukte = async (req, res) => {
    try {
        const { emri, pershkrimi, cmimi, kategoria, nenkategoria, madhesia, bestseller } = req.body;

        const foto1 = req.files.foto1 && req.files.foto1[0];
        const foto2 = req.files.foto2 && req.files.foto2[0];
        const foto3 = req.files.foto3 && req.files.foto3[0];
        const foto4 = req.files.foto4 && req.files.foto4[0];

        const fotot = [foto1, foto2, foto3, foto4].filter((item) => item !== undefined);

        const fototUrl = await Promise.all(
            fotot.map(async (item) => {
                let rezultati = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
                return rezultati.secure_url;
            })
        );

        const teDhenatProduktit = {
            emri,
            pershkrimi,
            cmimi: Number(cmimi),
            kategoria,
            nenkategoria,
            madhesia: JSON.parse(madhesia),
            bestseller: bestseller === "true" ? true : false,
            foto: fototUrl,
            data: Date.now(),
        };

        console.log(teDhenatProduktit);

        const produkt = new produktModel(teDhenatProduktit);
        await produkt.save();

        res.json({ success: true, message: "Produkti është shtuar me sukses" });

    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message })
    }
}

// funksion per listen e proukteve
const listaProdukteve = async (req, res) => {
    try {
        const produktet = await produktModel.find({});
        res.json({ success: true, produktet });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message })
    }
}

// funksion per fshirjen e produkteve
const fshijProduktin = async (req, res) => {
    try {
        await produktModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Produkti është fshirë me sukses" });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message })
    }
}

// funksion per informacionin e nje produkti te vetem
const infoProduktIVetem = async (req, res) => {
    try {
        const { produktId } = req.body;
        const produkti = await produktModel.findById(produktId);
        res.json({ success: true, produkti });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message })
    }
}

export { shtoProdukte, listaProdukteve, fshijProduktin, infoProduktIVetem };

