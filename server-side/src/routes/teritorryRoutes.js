const express = require("express");
const router = express.Router();
const controller = require("../controllers/territoryController");

router.get("/provinsi", controller.getProvince);

router.get("/kabupaten/:kode_pro", controller.getcity);

module.exports = router;
