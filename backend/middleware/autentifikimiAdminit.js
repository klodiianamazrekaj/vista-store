import jwt from 'jsonwebtoken';

// funksioni autentifikimiAdminit kontrollon nese nje perdorues eshte i autorizuar per tu kyqur ne aplikacion
const autentifikimiAdminit = async (req, res, next) => {
    try {
        const { token } = req.headers;
        if (!token) {
            return res.json({ success: false, message: "Nuk jeni i autorizuar, kyçuni përsëri." });
        }

        const dekodo_token = jwt.verify(token, process.env.JWT_SECRET);
        if (dekodo_token !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            return res.json({ success: false, message: "Nuk jeni i autorizuar, kyçuni përsëri." });
        }
        // thirret funksioni next() nese tokeni perputhet me email dhe password
        // dhe nese perputhet atehere mundet me vazhdu me funksione te tjera, si psh shfaqja e faqes per administratorin
        next();
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

export default autentifikimiAdminit;