import mongoose from 'mongoose';

const SportCenterSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true, // no sirve
        trim: true,
    },
    image: {
        type: String,
        required: true, // no sirve?
        unique: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    }
});

export default mongoose.model('SportCenter', SportCenterSchema);