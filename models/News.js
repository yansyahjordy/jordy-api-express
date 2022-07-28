const mongoose =require("mongoose");

const PostSchema = mongoose.Schema({
    source:Object,
    author:String,
    description:String,
    url:String,
    content:String,
    title:{
        type:String,
        required: true
    },
    image:{
        type:String,
        required: true
    },
    timePosted:{
        type:String,
        required: true
    }
})

module.exports = mongoose.model('news', PostSchema);