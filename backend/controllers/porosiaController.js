import porosiaModel from "../models/porosiaModel.js";
import perdoruesiModel from "../models/perdoruesiModel.js";
import Stripe from 'stripe'


// variablat globale
const valuta = 'eur';
const tarifaDorezimit = 10;

// gateway initialize
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// berja e pageses me para ne dore ne dorezim
const bejPorosi = async (req, res) => {
    try {
        const { perdoruesiId, produktet, shuma, adresa } = req.body;

        const teDhenatPorosise = {
            perdoruesiId,
            produktet,
            shuma,
            adresa,
            metodaPageses: "PND",
            pagesa: false,
            data: Date.now(),
        }

        const porosiERe = new porosiaModel(teDhenatPorosise);
        await porosiERe.save();

        await perdoruesiModel.findByIdAndUpdate(perdoruesiId, { teDhenatNeKarroce: {} });

        res.json({ success: true, message: "Porosia u krye me sukses" });

    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
}

// berja e pageses me stripe
const bejPorosiMeStripe = async (req, res) => {
    try {
        const { perdoruesiId, produktet, shuma, adresa } = req.body;
        const { origin } = req.headers;

        const teDhenatPorosise = {
            perdoruesiId,
            produktet,
            shuma,
            adresa,
            metodaPageses: "Stripe",
            pagesa: false,
            data: Date.now(),
        }

        const porosiERe = new porosiaModel(teDhenatPorosise);
        await porosiERe.save();

        const line_items = produktet.map((produkti) => ({
            price_data: {
                currency: valuta,
                product_data: {
                    name: produkti.emri,
                },
                unit_amount: produkti.cmimi * 100
            },
            quantity: produkti.sasia
        }))

        line_items.push({
            price_data: {
                currency: valuta,
                product_data: {
                    name: 'Tarifa e Dorëzimit',
                },
                unit_amount: tarifaDorezimit * 100
            },
            quantity: 1,
        })

        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&porosiaId=${porosiERe._id}`,
            cancel_url: `${origin}/verify?success=false&porosiaId=${porosiERe._id}`,
            line_items,
            mode: 'payment',
        });

        res.json({ success: true, session_url: session.url })
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
}

// verifiko stripe
const verifikoStripe = async (req, res) => {
    const { porosiaId, success, perdoruesiId } = req.body;

    try {
        if (success === "true") {
            await porosiaModel.findByIdAndUpdate(porosiaId, { pagesa: true });
            await perdoruesiModel.findByIdAndUpdate(perdoruesiId, { teDhenatNeKarroce: {} });
            res.json({ success: true, message: "Pagesa u krye me sukses" });
        }
        else {
            await porosiaModel.findByIdAndDelete(porosiaId);
            res.json({ success: true, message: "Pagesa u anulua" });
        }
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
}
// shfaqi te gjitha porosite ne panelin e adminit
const teGjithaPorosite = async (req, res) => {
    try {
        const porosite = await porosiaModel.find({});
        res.json({ success: true, porosite });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
}

// te dhenat e porosise se perdoruesit per frontend
const porositePerdoruesit = async (req, res) => {
    try {
        const { perdoruesiId } = req.body;

        const porosite = await porosiaModel.find({ perdoruesiId });
        res.json({ success: true, porosite });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
}

// perditeso statusin e porosise nga paneli i adminit - vetem admini mundet me e perditesu statusin
const perditesoStatusinPorosise = async (req, res) => {
    try {
        const { porosiaId, statusi } = req.body;

        await porosiaModel.findByIdAndUpdate(porosiaId, { statusi });
        res.json({ success: true, message: "Statusi është përditësuar me sukses" });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
}

export { bejPorosi, bejPorosiMeStripe, teGjithaPorosite, porositePerdoruesit, perditesoStatusinPorosise, verifikoStripe };


// =============================================================================================================

// berja e pageses me para ne dore ne dorezim - kjo nuk implementohet ne projekt per arsye se razorpay suportohet vetem ne indi
// const bejPorosiMeRazorpay = async (req, res) => {

// }


