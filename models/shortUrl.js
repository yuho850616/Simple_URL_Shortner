var mongoose = require('mongoose')
var shortId = require('shortid')

var shortUrlSchema  = new mongoose.Schema({
    full:{
        type:String,
        required:true
    },
    short:{
        type:String,
        required:true,
        default: shortId.generate
    }
})
module.exports = mongoose.model('shorten_url',shortUrlSchema)