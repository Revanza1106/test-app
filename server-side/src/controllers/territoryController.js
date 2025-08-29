const wilayahModel = require("../models/territoryModal");

async function getProvince(req, res) {
    try {
        const provinsi = await wilayahModel.getAllProvinsi();
        res.json(provinsi);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function getcity(req, res) {
    try {
        const { kode_pro } = req.params; 
        const kabupaten = await wilayahModel.getKabupatenByProvinsi(kode_pro);
        res.json(kabupaten);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { getProvince, getcity };
