const mongoose=require('mongoose');
var adminSchema=new mongoose.Schema({
    name:{
        type:String
    },
    organisation:{
        type:String
    },
    email:{
        type:String,
        unique:true
    },
    password:{
        type:String,
        
    },
    verification_token:{
        type:String
    },
    verified:{
        type:String
    }
});
mongoose.model('admin',adminSchema);