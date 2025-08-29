const pool = require("../config/db");

async function getAllProvince() {
    const [rows] = await pool.query(
        "SELECT * FROM wilayah WHERE tingkat_label = 'provinsi'"
    );
    return rows;
}

async function getCityByProvince(kode_pro) {
    const [rows] = await pool.query(
        "SELECT * FROM wilayah WHERE tingkat_label = 'kabupaten' AND kode_pro = ?",
        [kode_pro]
    );
    return rows;
}

module.exports = { getAllProvince, getCityByProvince };
