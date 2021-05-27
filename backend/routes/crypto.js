const express = require('express');
const { indexAssetNames , showAsset , showAssetMarketData} = require('../controllers/cryptoController');

const router = express.Router();

router.get('/assets' , indexAssetNames)
router.get('/assets/:symbol', showAsset)
router.get('/assets/market/:symbol' , showAssetMarketData)


module.exports = router