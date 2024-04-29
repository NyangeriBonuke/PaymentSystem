const mongoose = require('mongoose')

const MpesaSchema = new mongoose.Schema({
    Amount: {
        type: Number,
        required: true
    },
    MpesaReceiptNumber: {
        type: String,
        required: true
    },
    TransactionDate: {
        type: Date,
        require: true
    },
    PhoneNumber: {
        type: String,
        required: true
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('Mpesa', MpesaSchema)