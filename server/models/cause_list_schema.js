const  mongoose  = require("mongoose");

const CauseListSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "RegisterSchema"
    },
    createdAt: { type: Date, default: Date.now }
})

const CauseSchema=  mongoose.model('CauseListSchema', CauseListSchema)

module.exports = {CauseSchema}