

const mongoose = require('mongoose');

var userSchema= mongoose.Schema({
    urlimages:String,
    imagesname:{
        type:String,
        unique:true,
        required:true,
    },
    address:String,
    contents:String,
})
module.exports=mongoose.model('user',userSchema);