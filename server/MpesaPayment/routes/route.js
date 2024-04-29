const express = require('express')
const router = express.Router()
const getAcessToken = require('../middleware/accessToken')
const MpesaController = require('../controllers/mpesaController')

router.post('/stkpush', getAcessToken, MpesaController.stkPush)
router.post('/callback', MpesaController.stkCallback)

module.exports = router