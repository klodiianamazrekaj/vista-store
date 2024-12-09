import mongoose from 'mongoose';

const porosiaSchema = new mongoose.Schema({
    perdoruesiId: { type: String, required: true },
    produktet: { type: Array, required: true },
    shuma: { type: Number, required: true },
    adresa: { type: Object, required: true },
    statusi: { type: String, required: true, default: 'Porosia u Vendos' },
    metodaPageses: { type: String, required: true },
    pagesa: { type: Boolean, required: true, default: false },
    data: { type: Number, required: true }
}, { collection: 'porosite' });

const porosiaModel = mongoose.models.porosia || mongoose.model("porosia", porosiaSchema);

export default porosiaModel;
