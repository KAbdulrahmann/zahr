import mongoose from "mongoose"; // ✅ Correct for ES modules


const settingsSchema = new mongoose.Schema({
    logolink: String,
    bannerlink: String,
    customersFeedback: [{
        id: Number,
        name: String,
        feedback: String
    }],
    socialLinks: {
        facebook: String,
        instagram: String,
        youtube: String,
        snapchat: String,
        twitter: String,
        tiktok: String,
        whatsapp: String,
    }},
    {timestamps:true,}

);



const Settings = mongoose.model('Settings', settingsSchema);

export default Settings;