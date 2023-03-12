const  mongoose  = require("mongoose");

const causeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
})

const CauseList=  mongoose.model('CauseList', causeSchema)

module.exports = CauseList