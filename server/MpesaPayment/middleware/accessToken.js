const axios = require('axios')
require('dotenv').config()

const getAcessToken = async(req, res, next) => {
    try{
        const auth = new Buffer.from(`${process.env.CONSUMER_KEY}:${process.env.CONSUMER_SECRET}`).toString('base64')
        const response = await axios.get("https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials", {
            headers: {Authorization: `Basic ${auth}`}
        })
        req.access_token = response.data.access_token
        next()
    }
    catch(error){
        res.status(500).json(`Access token error ${error}`)
    }
}

module.exports = getAcessToken