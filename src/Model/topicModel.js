const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId


const topicSchema = new mongoose.Schema({
    topictitle: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    userId: {
        type: ObjectId,
        ref: 'usersdatas',
        required: true,
        trim: true
    },


    
    category: {
        type: String,
        required: true,
        trim: true

    },

    
    ranking: {
        type: Number,
        required: true,
        min: 0,
        max: 100,
        trim: true
    },
    

    deletedAt: {
        type: Date,
    },

    isDeleted: {
        type: Boolean,
        default: false
    },

   

}, { timestamps: true })

module.exports = mongoose.model("topic", topicSchema)
