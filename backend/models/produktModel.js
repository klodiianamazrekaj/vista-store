import mongoose from "mongoose";

// schema - eshte strukture qe e definon organizimin e databazes
const produktSchema = new mongoose.Schema({
    emri: { type: String, required: true },
    pershkrimi: { type: String, required: true },
    cmimi: { type: Number, required: true },
    foto: { type: Array, required: true },
    kategoria: { type: String, required: true },
    nenkategoria: { type: String, required: true },
    madhesia: { type: Array, required: true },
    bestseller: { type: Boolean },
    data: { type: Number, required: true },
}, { collection: 'produktet' });

const produktModel = mongoose.models.produkt || mongoose.model("produkt", produktSchema);

export default produktModel;