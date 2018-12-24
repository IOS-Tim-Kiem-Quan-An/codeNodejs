

const mongoose = require('mongoose');

var userSchema= mongoose.Schema({
    uid:String,
    SaveStore: [{
        idStore:String,
        urlImage:String,
        ImgName:{
            type:String,
            unique:true,
            required:true,
        },
        address:String,
        kinhdo:String,
        vido:String,
        contents:String,
    }]
})
module.exports=mongoose.model('userr',userSchema);