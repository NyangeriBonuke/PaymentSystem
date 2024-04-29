const Mpesa = require('../models/mpesaModel')

class MpesaUsecase{
    async saveCallbackData(stkData){
        try{
            const mpesaTranscation = new Mpesa({
                Amount: stkData.CallbackMetadata.Item.find(item => item.Name === "Amount").value,
                MpesaReceiptNumber: stkData.CallbackMetadata.Item.find(item => item.Name === "MpesaReceiptNumber").value,
                TransactionDate: stkData.CallbackMetadata.Item.find(item => item.Name === "TransactionDate").value,
                PhoneNumber: stkData.CallbackMetadata.Item.find(item => item.Name === "PhoneNumber").value
            })
            await mpesaTranscation.save()
            return 'Mpesa transaction saved successfully'
        }
        catch(error){
            return res.status(200).json(`Usecase error ${error}`)
        }
    }
}

module.exports = new MpesaUsecase