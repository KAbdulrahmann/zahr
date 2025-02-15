import Settings from "../../models/Settings.js";


export const getSettings = async (req, res) => {
    try {
        const settings = await Settings.findOne(); // Fetches the first document
    
        if (!settings) {
            return res.status(404).json({ message: "Settings not found" });
        }

        res.status(200).json(settings.toObject()); // Converts Mongoose document to plain object
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


    export const setSettings = async (req, res) => {
        const updatedSettings = await Settings.findOneAndUpdate(
            {}, // Empty filter to always update the first document
            { $set: req.body }, // Updates only the provided fields
            { new: true, upsert: true } // Creates the doc if it doesn't exist
          );
        try {
    await updatedSettings.save();
    res.status(201).json(updatedSettings);
        } catch (error) {
    res.status(409).json({ message: error.message });
        }
    }