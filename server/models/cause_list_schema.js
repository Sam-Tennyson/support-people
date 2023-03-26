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
})

const CauseSchema=  mongoose.model('CauseListSchema', CauseListSchema)

module.exports = {CauseSchema}