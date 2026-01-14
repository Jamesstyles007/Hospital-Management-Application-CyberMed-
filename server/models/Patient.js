import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema({
    // We can allow custom IDs if we want to migrate data easily, or let MongoDB handle _id
    // For simplicity in migration, we can keep using standard _id but map the frontend 'id' to it or add a virtual.
    // However, the frontend uses numerical IDs currently. To minimize frontend breakage, we might just store a custom 'id' or let the frontend adapt.
    // Let's stick to MongoDB _id and update frontend if needed, OR add a numerical id field.
    // For this prototype, let's use a simple counter or just Date.now() style ID if we want to mimic the old behavior,
    // OR just use standard MongoDB ObjectId and map it.
    // Let's try to stick to the existing data shape as much as possible.
    name: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    condition: { type: String, required: true },
    admitted: { type: String, required: true }, // Keeping as string YYYY-MM-DD for consistency
    createdAt: { type: Date, default: Date.now }
});

// Helper to rename _id to id for frontend compatibility
patientSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});

export default mongoose.model('Patient', patientSchema);
