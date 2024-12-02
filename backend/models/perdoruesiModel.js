import mongoose from "mongoose";

const perdoruesiSchema = new mongoose.Schema({
    emri: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    teDhenatNeKarroce: { type: Object, default: {} },
}, { minimize: false, collection: 'perdoruesi' });

const perdoruesiModel = mongoose.models.perdoruesi || mongoose.model('perdoruesi', perdoruesiSchema);

export default perdoruesiModel;