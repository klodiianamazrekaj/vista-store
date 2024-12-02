import validator from "validator";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import perdoruesiModel from "../models/perdoruesiModel.js";

const krijoToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}

// route per kycjen e perdoruesit
const kycjaPerdoruesit = async (req, res) => {
    try {
        const { email, password } = req.body;

        const perdoruesi = await perdoruesiModel.findOne({ email });

        if (!perdoruesi) {
            return res.json({ success: false, message: "Përdoruesi nuk ekziston" });
        }

        const perputhet = await bcrypt.compare(password, perdoruesi.password);

        if (perputhet) {
            const token = krijoToken(perdoruesi._id);
            res.json({ success: true, token })
        }
        else {
            res.json({ success: false, message: "Të dhënat nuk janë valide" })
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// route per regjistrimin e perdoruesit
const regjistrimiPerdoruesit = async (req, res) => {
    try {
        const { emri, email, password } = req.body;

        // shikon nese perdoruesi ekziston ose nuk ekziston
        const ekziston = await perdoruesiModel.findOne({ email });
        if (ekziston) {
            return res.json({ success: false, message: "Përdoruesi Ekziston" });
        }

        // shikon nese email-i eshte valid dhe nese password-i eshte i forte
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Ju lutem shkruani një email valid" });
        }
        if (password.length < 8) {
            return res.json({ success: false, message: "Fjalëkalimi juaj duhet të ketë më shumë se 8 karaktere" });
        }

        // hashimi i fjalekalimit
        const salt = await bcrypt.genSalt(10);
        const fjalekalimiHashuar = await bcrypt.hash(password, salt);

        const perdoruesIRi = new perdoruesiModel({
            emri,
            email,
            password: fjalekalimiHashuar
        });

        const perdoruesi = await perdoruesIRi.save();

        const token = krijoToken(perdoruesi._id);

        res.json({ success: true, message: token });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// route per kycjen e adminit
const kycjaAdminit = async (req, res) => {

}

export { kycjaPerdoruesit, regjistrimiPerdoruesit, kycjaAdminit };