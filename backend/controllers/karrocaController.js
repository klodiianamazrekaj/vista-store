import perdoruesiModel from "../models/perdoruesiModel.js";


// shto produkte te karroca e perdoruesit
const shtoNeKarroce = async (req, res) => {
    try {
        const { perdoruesiId, itemId, madhesia } = req.body;

        const teDhenatPerdoruesit = await perdoruesiModel.findById(perdoruesiId);
        let teDhenatNeKarroce = await teDhenatPerdoruesit.teDhenatNeKarroce;

        if (teDhenatNeKarroce[itemId]) {
            if (teDhenatNeKarroce[itemId][madhesia]) {
                teDhenatNeKarroce[itemId][madhesia] += 1;
            }
            else {
                teDhenatNeKarroce[itemId][madhesia] = 1;
            }
        }
        else {
            teDhenatNeKarroce[itemId] = {};
            teDhenatNeKarroce[itemId][madhesia] = 1;
        }

        await perdoruesiModel.findByIdAndUpdate(perdoruesiId, { teDhenatNeKarroce })

        res.json({ success: true, message: "Produkti është shtuar në karrocë" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// perditeso karrocen
const perditesoKarrocen = async (req, res) => {
    try {
        const { perdoruesiId, itemId, madhesia, sasia } = req.body;

        const teDhenatPerdoruesit = await perdoruesiModel.findById(perdoruesiId);
        let teDhenatNeKarroce = await teDhenatPerdoruesit.teDhenatNeKarroce;

        teDhenatNeKarroce[itemId][madhesia] = sasia;

        await perdoruesiModel.findByIdAndUpdate(perdoruesiId, { teDhenatNeKarroce })

        res.json({ success: true, message: "Karroca është përditësuar" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// merr te dhenat qe gjenden ne karroce per perdoruesin aktual
const merrKarrocenPerdoruesit = async (req, res) => {
    try {
        const { perdoruesiId } = req.body;

        const teDhenatPerdoruesit = await perdoruesiModel.findById(perdoruesiId);
        let teDhenatNeKarroce = await teDhenatPerdoruesit.teDhenatNeKarroce;

        res.json({ success: true, teDhenatNeKarroce: teDhenatPerdoruesit.teDhenatNeKarroce });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

export { shtoNeKarroce, perditesoKarrocen, merrKarrocenPerdoruesit };