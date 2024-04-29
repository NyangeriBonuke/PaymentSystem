const axios = require('axios')
require('dotenv').config()
const MpesaUsecase = require('../usecases/mpesaUseCase')

class MpesaController{
    async stkPush(req, res){
        try{
            const {phone, amount} = req.body
            const PhoneNumber = phone.substring(1)
            const timestamp = new Date().toISOString().replace(/[-T:]/g,"").split(".")[0]
            const password = new Buffer.from(process.env.BUSINESS_SHORT_CODE + process.env.PASSKEY + timestamp).toString("base64")
            const token = req.access_token

            const data = {    
                BusinessShortCode: process.env.BUSINESS_SHORT_CODE,    
                Password: password,    
                Timestamp: timestamp,    
                TransactionType: "CustomerPayBillOnline",    
                Amount: amount,    
                PartyA:`254${PhoneNumber}`,    
                PartyB: process.env.BUSINESS_SHORT_CODE,    
                PhoneNumber:`254${PhoneNumber}`,    
                CallBackURL: "https://d763-41-90-188-155.ngrok-free.app/api/callback",    
                AccountReference: `254${PhoneNumber}`,    
                TransactionDesc: "Test"
             }

             const response = await axios.post(process.env.URL, data, {
                headers: {Authorization: `Bearer ${token}`}
             })
             res.status(200).json(response.data.CustomerMessage)
        }
        catch(error){
            res.status(500).json(`Stkpush error ${error}`)
        }
    } 

    async stkCallback(req, res){
        try{
            const stkData = req.body.Body.stkCallback;
                const mpesaMsg = await MpesaUsecase.saveCallbackData(stkData)
                console.log(mpesaMsg)
                res.status(200).json({ message: mpesaMsg });
        }
        catch(error){
            res.status(500).json(`Stk callback error ${error}`)
        }
    }
}

module.exports = new MpesaController