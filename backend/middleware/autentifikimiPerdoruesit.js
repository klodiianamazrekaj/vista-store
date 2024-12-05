import jwt from 'jsonwebtoken';

const autentifikimiPerdoruesit = async (req, res, next) => {
    const { token } = req.headers;

    if (!token) {
        return res.json({ success: false, message: "Nuk jeni i autorizuar, kyçuni përsëri." });
    }

    try {
        const dekodo_token = jwt.verify(token, process.env.JWT_SECRET);
        req.body.perdoruesiId = dekodo_token.id;
        next();
    } catch (error) {
        console.error(error);
        return res.json({ success: false, message: error.message });
    }
}

export default autentifikimiPerdoruesit;